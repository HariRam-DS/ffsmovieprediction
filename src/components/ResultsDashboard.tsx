import { PredictionResult, MovieInput } from '@/lib/movieData';
import { SuccessGauge } from './SuccessGauge';
import { RiskBadge } from './RiskBadge';
import { FeatureChart } from './FeatureChart';
import { 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  Lightbulb,
  BarChart3,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResultsDashboardProps {
  movie: MovieInput;
  result: PredictionResult;
  onBack: () => void;
}

export function ResultsDashboard({ movie, result, onBack }: ResultsDashboardProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}B`;
    }
    return `$${value}M`;
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          New Analysis
        </Button>
        <RiskBadge level={result.riskLevel} />
      </div>

      {/* Movie Title */}
      <div className="text-center">
        <h2 className="font-display text-4xl md:text-5xl gradient-text mb-2">
          {movie.title || 'Untitled Movie'}
        </h2>
        <p className="text-muted-foreground">
          {movie.genre} • {movie.language} • {movie.runtime} min
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Success Gauge - Takes center position on large screens */}
        <div className="lg:col-span-1 lg:order-2 flex justify-center">
          <div className="glass-card p-8 flex flex-col items-center">
            <SuccessGauge value={result.successProbability} size={220} />
          </div>
        </div>

        {/* Revenue Estimate */}
        <div className="lg:order-1 glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">Revenue Estimate</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-muted-foreground text-sm">Expected</span>
              <span className="font-display text-3xl text-foreground">
                {formatCurrency(result.estimatedRevenue.expected)}
              </span>
            </div>
            <div className="flex justify-between items-baseline text-sm">
              <span className="text-muted-foreground">Range</span>
              <span className="text-muted-foreground">
                {formatCurrency(result.estimatedRevenue.min)} - {formatCurrency(result.estimatedRevenue.max)}
              </span>
            </div>
            
            {/* Revenue Range Bar */}
            <div className="relative h-2 bg-muted rounded-full mt-4">
              <div 
                className="absolute h-full bg-gradient-to-r from-primary/60 to-primary rounded-full"
                style={{ 
                  left: '20%',
                  width: '60%'
                }}
              />
              <div 
                className="absolute w-3 h-3 bg-primary rounded-full -top-0.5 transform -translate-x-1/2"
                style={{ left: '50%' }}
              />
            </div>
          </div>
        </div>

        {/* Revenue at Risk */}
        <div className="lg:order-3 glass-card p-6 space-y-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Revenue at Risk</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-muted-foreground text-sm">Potential Loss</span>
              <span className="font-display text-3xl text-danger">
                {formatCurrency(result.revenueAtRisk)}
              </span>
            </div>
            <div className="flex justify-between items-baseline text-sm">
              <span className="text-muted-foreground">Budget</span>
              <span className="text-muted-foreground">{formatCurrency(movie.budget)}</span>
            </div>
            
            {/* Risk indicator */}
            <div className="relative h-2 bg-muted rounded-full mt-4">
              <div 
                className="absolute h-full bg-gradient-to-r from-danger/60 to-danger rounded-full transition-all duration-1000"
                style={{ 
                  width: `${(result.revenueAtRisk / movie.budget) * 100}%`
                }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {((result.revenueAtRisk / movie.budget) * 100).toFixed(0)}% of budget at risk
            </p>
          </div>
        </div>
      </div>

      {/* Feature Importance & Explanations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Feature Importance */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h3 className="font-display text-xl text-foreground">Feature Impact Analysis</h3>
          </div>
          <FeatureChart features={result.featureImportance} />
        </div>

        {/* Explanations */}
        <div className="space-y-6">
          {/* Why This Prediction */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h3 className="font-display text-xl text-foreground">Why This Prediction?</h3>
            </div>
            <ul className="space-y-3">
              {result.explanation.map((exp, i) => (
                <li 
                  key={i} 
                  className="flex items-start gap-3 text-sm text-muted-foreground animate-fade-in-up"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {exp}
                </li>
              ))}
            </ul>
          </div>

          {/* Recommendations */}
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-warning" />
              <h3 className="font-display text-xl text-foreground">Recommendations</h3>
            </div>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li 
                  key={i} 
                  className="flex items-start gap-3 text-sm text-muted-foreground animate-fade-in-up"
                  style={{ animationDelay: `${i * 150 + 300}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Budget Summary Footer */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-primary" />
          <h3 className="font-display text-xl text-foreground">Investment Summary</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">Budget</p>
            <p className="font-display text-2xl text-foreground">{formatCurrency(movie.budget)}</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">Break-Even</p>
            <p className="font-display text-2xl text-foreground">{formatCurrency(movie.budget * 2.5)}</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">Expected ROI</p>
            <p className={`font-display text-2xl ${result.estimatedRevenue.expected > movie.budget * 2 ? 'text-success' : 'text-danger'}`}>
              {(((result.estimatedRevenue.expected / movie.budget) - 1) * 100).toFixed(0)}%
            </p>
          </div>
          <div className="text-center p-4 rounded-lg bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">Risk-Adjusted</p>
            <p className="font-display text-2xl text-foreground">
              {formatCurrency(result.estimatedRevenue.expected * (result.successProbability / 100))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
