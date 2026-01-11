import { useEffect, useState } from 'react';

interface SuccessGaugeProps {
  value: number;
  size?: number;
}

export function SuccessGauge({ value, size = 200 }: SuccessGaugeProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (animatedValue / 100) * circumference;

  const getColor = () => {
    if (value >= 70) return 'hsl(var(--success))';
    if (value >= 45) return 'hsl(var(--warning))';
    return 'hsl(var(--danger))';
  };

  const getGradientId = () => {
    if (value >= 70) return 'successGradient';
    if (value >= 45) return 'warningGradient';
    return 'dangerGradient';
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox="0 0 180 180"
      >
        <defs>
          <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(142, 76%, 36%)" />
            <stop offset="100%" stopColor="hsl(142, 76%, 50%)" />
          </linearGradient>
          <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(38, 92%, 45%)" />
            <stop offset="100%" stopColor="hsl(45, 93%, 58%)" />
          </linearGradient>
          <linearGradient id="dangerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(0, 84%, 50%)" />
            <stop offset="100%" stopColor="hsl(15, 90%, 55%)" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Animated progress circle */}
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={`url(#${getGradientId()})`}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          filter="url(#glow)"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute flex flex-col items-center justify-center">
        <span 
          className="font-display text-5xl font-bold transition-all duration-1000"
          style={{ color: getColor() }}
        >
          {Math.round(animatedValue)}%
        </span>
        <span className="text-sm text-muted-foreground mt-1">Success Rate</span>
      </div>
    </div>
  );
}
