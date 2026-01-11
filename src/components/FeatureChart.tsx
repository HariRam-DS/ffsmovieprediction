import { FeatureContribution } from '@/lib/movieData';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface FeatureChartProps {
  features: FeatureContribution[];
}

export function FeatureChart({ features }: FeatureChartProps) {
  return (
    <div className="space-y-4">
      {features.slice(0, 6).map((feature, index) => (
        <div 
          key={feature.feature} 
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {feature.isPositive ? (
                <TrendingUp className="w-4 h-4 text-success" />
              ) : (
                <TrendingDown className="w-4 h-4 text-danger" />
              )}
              <span className="text-sm font-medium text-foreground">
                {feature.feature}
              </span>
            </div>
            <span className={`text-sm font-semibold ${feature.isPositive ? 'text-success' : 'text-danger'}`}>
              {feature.impact > 0 ? '+' : ''}{(feature.impact * 100).toFixed(0)}%
            </span>
          </div>
          
          <div className="relative h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={`absolute h-full rounded-full transition-all duration-1000 ease-out ${
                feature.isPositive 
                  ? 'bg-gradient-to-r from-success/60 to-success' 
                  : 'bg-gradient-to-r from-danger/60 to-danger'
              }`}
              style={{ 
                width: `${Math.abs(feature.impact) * 100}%`,
                animationDelay: `${index * 100 + 200}ms`
              }}
            />
          </div>
          
          <p className="text-xs text-muted-foreground mt-1">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}
