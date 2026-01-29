import { Event } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  onSelect: (event: Event) => void;
}

export function EventCard({ event, onSelect }: EventCardProps) {
  const statusConfig = {
    active: { label: 'En cours', class: 'bg-success/10 text-success border-success/20' },
    upcoming: { label: 'À venir', class: 'bg-primary/10 text-primary border-primary/20' },
    completed: { label: 'Terminé', class: 'bg-muted text-muted-foreground border-muted' },
  };

  const { label, class: statusClass } = statusConfig[event.status];

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{event.name}</CardTitle>
          <Badge variant="outline" className={cn('text-xs', statusClass)}>
            {label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            {event.date}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            {event.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            {event.participantCount} participants inscrits
          </div>
        </div>

        <Button 
          className="w-full" 
          onClick={() => onSelect(event)}
          disabled={event.status === 'completed'}
        >
          Accéder à l'événement
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
