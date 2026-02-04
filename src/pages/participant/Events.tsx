import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockEvents } from '@/data/mockData';
import { Calendar, MapPin, Users, Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function ParticipantEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const filteredEvents = mockEvents.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">En cours</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">À venir</Badge>;
      case 'completed':
        return <Badge variant="outline">Terminé</Badge>;
      default:
        return null;
    }
  };

  const handleRegister = (eventId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      // Navigate to registration page
      navigate(`/participant/register/${eventId}`);
    }
  };

  return (
    <AppLayout 
      title="Événements disponibles"
      subtitle="Consultez et inscrivez-vous aux congrès médicaux"
    >
      <div className="space-y-6 animate-fade-in-up">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher un événement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">{event.name}</CardTitle>
                  {getStatusBadge(event.status)}
                </div>
                <CardDescription className="flex flex-col gap-2 mt-3">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {event.participantCount} participants
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {event.status !== 'completed' ? (
                  <Button 
                    className="w-full" 
                    onClick={() => handleRegister(event.id)}
                  >
                    S'inscrire
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full" disabled>
                    Événement terminé
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aucun événement trouvé</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
