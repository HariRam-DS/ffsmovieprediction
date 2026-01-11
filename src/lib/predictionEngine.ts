import {
  MovieInput,
  PredictionResult,
  FeatureContribution,
  genreSuccessIndex,
  languageMultiplier,
  releaseTimingAdvantage,
  getBudgetRiskRatio,
} from './movieData';

// Simulated XGBoost-style prediction with feature engineering
export function predictMovieSuccess(movie: MovieInput): PredictionResult {
  // Feature Engineering
  const features = engineerFeatures(movie);
  
  // Calculate base probability using weighted features
  const weights = {
    genreSuccessIndex: 0.15,
    actorImpactScore: 0.18,
    directorConsistencyScore: 0.12,
    budgetRiskRatio: 0.10,
    releaseTimingAdvantage: 0.12,
    trailerSentiment: 0.15,
    socialBuzz: 0.10,
    franchiseBonus: 0.05,
    awardCrewBonus: 0.03,
  };

  let successProbability = 
    features.genreSuccessIndex * weights.genreSuccessIndex +
    features.actorImpactScore * weights.actorImpactScore +
    features.directorConsistencyScore * weights.directorConsistencyScore +
    features.budgetRiskRatio * weights.budgetRiskRatio +
    features.releaseTimingAdvantage * weights.releaseTimingAdvantage +
    features.trailerSentimentNormalized * weights.trailerSentiment +
    features.socialBuzzNormalized * weights.socialBuzz +
    features.franchiseBonus * weights.franchiseBonus +
    features.awardCrewBonus * weights.awardCrewBonus;

  // Apply language market adjustment
  successProbability *= (0.5 + 0.5 * features.languageMultiplier);

  // Runtime penalty for extreme lengths
  if (movie.runtime < 80 || movie.runtime > 180) {
    successProbability *= 0.9;
  }

  // Normalize to 0-100 scale
  successProbability = Math.min(Math.max(successProbability * 100, 5), 98);

  // Calculate risk level
  const riskLevel = getRiskLevel(successProbability, movie.budget);

  // Estimate revenue
  const estimatedRevenue = estimateRevenue(successProbability, movie.budget);

  // Calculate feature importance
  const featureImportance = calculateFeatureImportance(movie, features);

  // Generate explanations
  const explanation = generateExplanation(movie, features, successProbability);

  // Generate recommendations
  const recommendations = generateRecommendations(movie, features, successProbability);

  return {
    successProbability: Math.round(successProbability * 10) / 10,
    riskLevel,
    estimatedRevenue,
    revenueAtRisk: calculateRevenueAtRisk(movie.budget, successProbability),
    featureImportance,
    explanation,
    recommendations,
  };
}

interface EngineeredFeatures {
  genreSuccessIndex: number;
  languageMultiplier: number;
  actorImpactScore: number;
  directorConsistencyScore: number;
  budgetRiskRatio: number;
  releaseTimingAdvantage: number;
  trailerSentimentNormalized: number;
  socialBuzzNormalized: number;
  franchiseBonus: number;
  awardCrewBonus: number;
}

function engineerFeatures(movie: MovieInput): EngineeredFeatures {
  return {
    genreSuccessIndex: genreSuccessIndex[movie.genre] || 0.5,
    languageMultiplier: languageMultiplier[movie.language] || 0.5,
    actorImpactScore: movie.leadActorPopularity / 100,
    directorConsistencyScore: movie.directorScore / 100,
    budgetRiskRatio: getBudgetRiskRatio(movie.budget),
    releaseTimingAdvantage: releaseTimingAdvantage[movie.releaseMonth] || 0.5,
    trailerSentimentNormalized: (movie.trailerSentiment + 1) / 2,
    socialBuzzNormalized: movie.socialBuzz / 100,
    franchiseBonus: movie.sequelOrFranchise ? 1 : 0,
    awardCrewBonus: movie.hasAwardWinningCrew ? 1 : 0,
  };
}

function getRiskLevel(probability: number, budget: number): 'Low' | 'Medium' | 'High' {
  // Higher budget = stricter thresholds
  const budgetFactor = Math.min(budget / 100, 1.5);
  const adjustedThresholdHigh = 65 + budgetFactor * 5;
  const adjustedThresholdMedium = 45 + budgetFactor * 5;

  if (probability >= adjustedThresholdHigh) return 'Low';
  if (probability >= adjustedThresholdMedium) return 'Medium';
  return 'High';
}

function estimateRevenue(probability: number, budget: number): { min: number; max: number; expected: number } {
  // Revenue estimation based on probability and budget
  const baseMultiplier = probability / 50; // 50% = break even
  const variance = 0.4; // 40% variance

  const expected = budget * baseMultiplier * 1.2;
  const min = expected * (1 - variance);
  const max = expected * (1 + variance);

  return {
    min: Math.round(min),
    max: Math.round(max),
    expected: Math.round(expected),
  };
}

function calculateRevenueAtRisk(budget: number, probability: number): number {
  const failureProbability = (100 - probability) / 100;
  return Math.round(budget * failureProbability * 0.8); // 80% of budget at risk on failure
}

function calculateFeatureImportance(movie: MovieInput, features: EngineeredFeatures): FeatureContribution[] {
  const contributions: FeatureContribution[] = [
    {
      feature: 'Lead Actor Popularity',
      impact: (features.actorImpactScore - 0.5) * 2,
      description: movie.leadActorPopularity >= 70 
        ? 'Star power drives audience interest'
        : 'Consider casting more recognizable talent',
      isPositive: features.actorImpactScore >= 0.5,
    },
    {
      feature: 'Genre Success Index',
      impact: (features.genreSuccessIndex - 0.5) * 1.5,
      description: `${movie.genre} films have ${features.genreSuccessIndex > 0.6 ? 'strong' : 'moderate'} historical performance`,
      isPositive: features.genreSuccessIndex >= 0.5,
    },
    {
      feature: 'Trailer Sentiment',
      impact: movie.trailerSentiment,
      description: movie.trailerSentiment > 0.5 
        ? 'Trailer is generating positive buzz'
        : 'Trailer reception needs improvement',
      isPositive: movie.trailerSentiment > 0,
    },
    {
      feature: 'Release Timing',
      impact: (features.releaseTimingAdvantage - 0.5) * 1.5,
      description: features.releaseTimingAdvantage >= 0.8 
        ? 'Prime release window maximizes potential'
        : 'Consider adjusting release date',
      isPositive: features.releaseTimingAdvantage >= 0.6,
    },
    {
      feature: 'Social Media Buzz',
      impact: (features.socialBuzzNormalized - 0.5) * 1.5,
      description: movie.socialBuzz >= 70 
        ? 'Strong social media engagement'
        : 'Marketing push recommended',
      isPositive: features.socialBuzzNormalized >= 0.5,
    },
    {
      feature: 'Director Track Record',
      impact: (features.directorConsistencyScore - 0.5) * 1.2,
      description: movie.directorScore >= 70 
        ? 'Proven director with consistent delivery'
        : 'Director reliability is a concern',
      isPositive: features.directorConsistencyScore >= 0.5,
    },
    {
      feature: 'Budget Risk',
      impact: (features.budgetRiskRatio - 0.5) * -1,
      description: movie.budget > 100 
        ? 'High budget increases break-even pressure'
        : 'Manageable budget level',
      isPositive: features.budgetRiskRatio >= 0.5,
    },
    {
      feature: 'Franchise Factor',
      impact: movie.sequelOrFranchise ? 0.4 : -0.1,
      description: movie.sequelOrFranchise 
        ? 'Built-in audience from existing IP'
        : 'Original IP has higher uncertainty',
      isPositive: movie.sequelOrFranchise,
    },
  ];

  // Sort by absolute impact
  return contributions.sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact));
}

function generateExplanation(movie: MovieInput, features: EngineeredFeatures, probability: number): string[] {
  const explanations: string[] = [];

  if (probability >= 70) {
    explanations.push(`Strong success indicators present. The combination of ${movie.genre} genre appeal and lead actor popularity creates solid foundation.`);
  } else if (probability >= 50) {
    explanations.push(`Moderate success probability with mixed signals. Key strengths are partially offset by risk factors.`);
  } else {
    explanations.push(`Elevated risk profile detected. Multiple factors suggest challenging market conditions.`);
  }

  if (features.actorImpactScore >= 0.7) {
    explanations.push(`Star power from lead actor (${movie.leadActorPopularity}% popularity) significantly boosts audience draw.`);
  }

  if (features.releaseTimingAdvantage >= 0.8) {
    explanations.push(`Release in month ${movie.releaseMonth} captures peak moviegoing season.`);
  }

  if (movie.trailerSentiment > 0.6) {
    explanations.push(`Early trailer sentiment (${Math.round(movie.trailerSentiment * 100)}% positive) indicates strong audience anticipation.`);
  }

  if (movie.budget > 150 && probability < 60) {
    explanations.push(`High budget ($${movie.budget}M) requires exceptional performance to break even.`);
  }

  return explanations;
}

function generateRecommendations(movie: MovieInput, features: EngineeredFeatures, probability: number): string[] {
  const recommendations: string[] = [];

  if (features.releaseTimingAdvantage < 0.6) {
    recommendations.push('Consider moving release to summer or holiday window for maximum audience availability.');
  }

  if (movie.socialBuzz < 60) {
    recommendations.push('Increase social media marketing investment to build pre-release awareness.');
  }

  if (movie.trailerSentiment < 0.4) {
    recommendations.push('Review trailer cut - consider A/B testing different versions to improve reception.');
  }

  if (features.actorImpactScore < 0.5 && movie.budget > 80) {
    recommendations.push('For this budget level, consider adding recognizable talent to boost opening weekend.');
  }

  if (probability >= 70 && movie.budget < 100) {
    recommendations.push('Strong indicators suggest potential for additional marketing investment.');
  }

  if (recommendations.length === 0) {
    recommendations.push('Current strategy appears well-aligned with success factors.');
  }

  return recommendations;
}
