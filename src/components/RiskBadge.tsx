import { Shield, AlertTriangle, AlertOctagon } from 'lucide-react';

interface RiskBadgeProps {
  level: 'Low' | 'Medium' | 'High';
}

export function RiskBadge({ level }: RiskBadgeProps) {
  const config = {
    Low: {
      icon: Shield,
      className: 'risk-low',
      textClass: 'text-success-foreground',
      label: 'Low Risk',
    },
    Medium: {
      icon: AlertTriangle,
      className: 'risk-medium',
      textClass: 'text-warning-foreground',
      label: 'Medium Risk',
    },
    High: {
      icon: AlertOctagon,
      className: 'risk-high',
      textClass: 'text-danger-foreground',
      label: 'High Risk',
    },
  };

  const { icon: Icon, className, textClass, label } = config[level];

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${className} animate-scale-in`}>
      <Icon className={`w-5 h-5 ${textClass}`} />
      <span className={`font-semibold ${textClass}`}>{label}</span>
    </div>
  );
}
