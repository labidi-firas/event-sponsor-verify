import { Brain, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AIScoreCardProps {
  averageScore: number;
  validationRate: number;
  totalAnalyzed: number;
}

export function AIScoreCard({ averageScore, validationRate, totalAnalyzed }: AIScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressColor = (score: number) => {
    if (score >= 85) return 'bg-success';
    if (score >= 60) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="kpi-card">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Brain className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold">Statistiques IA</h3>
        <Tooltip>
          <TooltipTrigger>
            <Info className="w-4 h-4 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>L'IA compare les déclarations avec la liste officielle des inscrits pour calculer un score de similarité.</p>
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Score moyen de similarité</span>
            <span className={`font-bold ${getScoreColor(averageScore)}`}>
              {averageScore}%
            </span>
          </div>
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`absolute h-full rounded-full transition-all ${getProgressColor(averageScore)}`}
              style={{ width: `${averageScore}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Taux de validation automatique</span>
            <span className={`font-bold ${getScoreColor(validationRate)}`}>
              {validationRate}%
            </span>
          </div>
          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`absolute h-full rounded-full transition-all ${getProgressColor(validationRate)}`}
              style={{ width: `${validationRate}%` }}
            />
          </div>
        </div>

        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{totalAnalyzed}</span> déclarations analysées
          </p>
        </div>
      </div>
    </div>
  );
}
