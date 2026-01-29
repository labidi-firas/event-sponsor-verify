import { Activity } from '@/types';
import { CheckCircle, XCircle, FileUp, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface RecentActivityProps {
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'validation':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejection':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'import':
        return <FileUp className="w-4 h-4 text-primary" />;
      case 'declaration':
        return <Plus className="w-4 h-4 text-primary" />;
    }
  };

  const getActivityBackground = (type: Activity['type']) => {
    switch (type) {
      case 'validation':
        return 'bg-success/10';
      case 'rejection':
        return 'bg-destructive/10';
      default:
        return 'bg-primary/10';
    }
  };

  return (
    <div className="kpi-card">
      <h3 className="font-semibold mb-4">Activité récente</h3>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div 
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className={cn(
              'p-2 rounded-full',
              getActivityBackground(activity.type)
            )}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {activity.description}
              </p>
              {activity.participantName && (
                <p className="text-xs text-muted-foreground">
                  {activity.participantName}
                </p>
              )}
              <p className="text-xs text-muted-foreground mt-1">
                {formatDistanceToNow(new Date(activity.timestamp), { 
                  addSuffix: true,
                  locale: fr 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
