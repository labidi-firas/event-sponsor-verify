import { cn } from '@/lib/utils';

interface ScoreBadgeProps {
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ScoreBadge({ score, showLabel = true, size = 'md' }: ScoreBadgeProps) {
  const getScoreLevel = () => {
    if (score >= 85) return { label: 'Élevé', class: 'score-high' };
    if (score >= 60) return { label: 'Moyen', class: 'score-medium' };
    return { label: 'Faible', class: 'score-low' };
  };

  const { label, class: scoreClass } = getScoreLevel();

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span className={cn('score-badge', scoreClass, sizeStyles[size])}>
      <span className="font-bold">{score}%</span>
      {showLabel && <span className="opacity-80">({label})</span>}
    </span>
  );
}
