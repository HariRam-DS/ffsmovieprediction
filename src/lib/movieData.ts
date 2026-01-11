// Real-world style movie data modeling
export interface MovieInput {
  title: string;
  genre: string;
  language: string;
  budget: number; // in millions
  runtime: number; // in minutes
  releaseMonth: number;
  leadActorPopularity: number; // 0-100
  directorScore: number; // 0-100
  trailerSentiment: number; // -1 to 1
  socialBuzz: number; // 0-100
  sequelOrFranchise: boolean;
  hasAwardWinningCrew: boolean;
}

export interface PredictionResult {
  successProbability: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  estimatedRevenue: {
    min: number;
    max: number;
    expected: number;
  };
  revenueAtRisk: number;
  featureImportance: FeatureContribution[];
  explanation: string[];
  recommendations: string[];
}

export interface FeatureContribution {
  feature: string;
  impact: number; // -1 to 1
  description: string;
  isPositive: boolean;
}

// Genre success indices based on historical box office performance
export const genreSuccessIndex: Record<string, number> = {
  'Action': 0.72,
  'Adventure': 0.68,
  'Animation': 0.75,
  'Comedy': 0.58,
  'Crime': 0.52,
  'Documentary': 0.45,
  'Drama': 0.48,
  'Family': 0.70,
  'Fantasy': 0.65,
  'Horror': 0.62,
  'Mystery': 0.50,
  'Romance': 0.45,
  'Sci-Fi': 0.70,
  'Thriller': 0.55,
  'War': 0.42,
  'Western': 0.35,
};

// Language market size multipliers
export const languageMultiplier: Record<string, number> = {
  'English': 1.0,
  'Spanish': 0.65,
  'French': 0.55,
  'German': 0.45,
  'Japanese': 0.60,
  'Korean': 0.55,
  'Hindi': 0.70,
  'Mandarin': 0.75,
  'Italian': 0.40,
  'Portuguese': 0.45,
};

// Release timing advantage (1-12 months)
export const releaseTimingAdvantage: Record<number, number> = {
  1: 0.50,  // January - dump month
  2: 0.55,  // February
  3: 0.60,  // March
  4: 0.55,  // April
  5: 0.80,  // May - summer kickoff
  6: 0.85,  // June - prime summer
  7: 0.90,  // July - peak summer
  8: 0.70,  // August
  9: 0.55,  // September
  10: 0.60, // October
  11: 0.85, // November - holiday season
  12: 0.95, // December - peak holiday
};

// Budget risk categories
export const getBudgetRiskRatio = (budget: number): number => {
  if (budget < 20) return 0.75; // Low budget, lower risk
  if (budget < 50) return 0.65;
  if (budget < 100) return 0.55;
  if (budget < 150) return 0.45;
  if (budget < 200) return 0.35;
  return 0.25; // Mega budget, high risk
};

// Sample realistic movie metadata
export const sampleMovies = [
  {
    title: "Horizon's Edge",
    genre: "Sci-Fi",
    language: "English",
    budget: 180,
    runtime: 148,
    releaseMonth: 7,
    leadActorPopularity: 85,
    directorScore: 78,
    trailerSentiment: 0.72,
    socialBuzz: 82,
    sequelOrFranchise: false,
    hasAwardWinningCrew: true,
  },
  {
    title: "The Last Kingdom",
    genre: "Action",
    language: "English",
    budget: 95,
    runtime: 132,
    releaseMonth: 12,
    leadActorPopularity: 72,
    directorScore: 65,
    trailerSentiment: 0.58,
    socialBuzz: 68,
    sequelOrFranchise: true,
    hasAwardWinningCrew: false,
  },
  {
    title: "Whispers in the Dark",
    genre: "Horror",
    language: "English",
    budget: 25,
    runtime: 98,
    releaseMonth: 10,
    leadActorPopularity: 45,
    directorScore: 55,
    trailerSentiment: 0.65,
    socialBuzz: 72,
    sequelOrFranchise: false,
    hasAwardWinningCrew: false,
  },
];

export const genres = Object.keys(genreSuccessIndex);
export const languages = Object.keys(languageMultiplier);
