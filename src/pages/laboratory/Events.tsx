import { AppLayout } from '@/components/layout/AppLayout';
import { EventCard } from '@/components/events/EventCard';
import { mockEvents } from '@/data/mockData';
import { Event } from '@/types';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Events() {
  const navigate = useNavigate();

  const handleSelectEvent = (event: Event) => {
    navigate(`/sponsorships?eventId=${event.id}`);
  };

  const activeEvents = mockEvents.filter(e => e.status === 'active');
  const upcomingEvents = mockEvents.filter(e => e.status === 'upcoming');
  const completedEvents = mockEvents.filter(e => e.status === 'completed');

  return (
    <AppLayout 
      title="Événements" 
      subtitle="Sélectionnez un événement pour gérer vos déclarations"
    >
      <Tabs defaultValue="active" className="animate-fade-in-up">
        <TabsList className="mb-6">
          <TabsTrigger value="active">
            En cours ({activeEvents.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming">
            À venir ({upcomingEvents.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Terminés ({completedEvents.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onSelect={handleSelectEvent} 
              />
            ))}
          </div>
          {activeEvents.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Aucun événement en cours
            </p>
          )}
        </TabsContent>

        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onSelect={handleSelectEvent} 
              />
            ))}
          </div>
          {upcomingEvents.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Aucun événement à venir
            </p>
          )}
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onSelect={handleSelectEvent} 
              />
            ))}
          </div>
          {completedEvents.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              Aucun événement terminé
            </p>
          )}
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
}
