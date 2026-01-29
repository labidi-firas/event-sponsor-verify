import { Participant, MatchDetails } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScoreBadge } from './ScoreBadge';
import { Progress } from '@/components/ui/progress';
import { Brain, User, Calendar, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MatchComparisonProps {
  declared: Participant;
  matched?: Participant;
  matchDetails?: MatchDetails;
}

export function MatchComparison({ declared, matched, matchDetails }: MatchComparisonProps) {
  const fields = [
    { 
      label: 'Nom complet', 
      declaredValue: `${declared.firstName} ${declared.lastName}`,
      matchedValue: matched ? `${matched.firstName} ${matched.lastName}` : null,
      score: matchDetails?.nameScore || 0,
      icon: User,
    },
    { 
      label: 'Date de naissance', 
      declaredValue: declared.dateOfBirth,
      matchedValue: matched?.dateOfBirth,
      score: matchDetails?.dateOfBirthScore || 0,
      icon: Calendar,
    },
    { 
      label: "Carte d'identité", 
      declaredValue: declared.identityCard,
      matchedValue: matched?.identityCard,
      score: matchDetails?.identityCardScore || 0,
      icon: CreditCard,
    },
  ];

  const isMatch = (score: number) => score >= 85;

  return (
    <div className="space-y-6">
      {/* AI Score Summary */}
      <div className="ai-explanation">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-primary/10">
            <Brain className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Analyse IA</h3>
            <p className="text-sm text-muted-foreground">
              {matchDetails?.explanation || 'Comparaison des données déclarées avec la liste officielle'}
            </p>
          </div>
          {matchDetails && (
            <div className="ml-auto">
              <ScoreBadge score={matchDetails.overallScore} size="lg" />
            </div>
          )}
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Declared Data */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              Données déclarées (Laboratoire)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field) => (
              <div key={field.label} className="space-y-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <field.icon className="w-4 h-4" />
                  {field.label}
                </div>
                <p className="font-medium text-foreground pl-6">{field.declaredValue}</p>
              </div>
            ))}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                Spécialité médicale
              </div>
              <p className="font-medium text-foreground pl-6">{declared.specialty}</p>
            </div>
          </CardContent>
        </Card>

        {/* Matched Data */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              Données officielles (Liste des inscrits)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {matched ? (
              <>
                {fields.map((field) => (
                  <div key={field.label} className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <field.icon className="w-4 h-4" />
                      {field.label}
                    </div>
                    <p className={cn(
                      'font-medium pl-6',
                      isMatch(field.score) 
                        ? 'comparison-highlight-match' 
                        : 'comparison-highlight-diff'
                    )}>
                      {field.matchedValue}
                    </p>
                  </div>
                ))}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    Spécialité médicale
                  </div>
                  <p className="font-medium text-foreground pl-6">{matched.specialty}</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <AlertCircle className="w-8 h-8 mb-2" />
                <p className="text-sm">Aucune correspondance trouvée</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Score Breakdown */}
      {matchDetails && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Détail des scores de correspondance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((field) => (
              <div key={field.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <field.icon className="w-4 h-4" />
                    {field.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {isMatch(field.score) ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-warning" />
                    )}
                    <span className={cn(
                      'font-semibold',
                      field.score >= 85 ? 'text-success' : field.score >= 60 ? 'text-warning' : 'text-destructive'
                    )}>
                      {field.score}%
                    </span>
                  </div>
                </div>
                <Progress value={field.score} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
