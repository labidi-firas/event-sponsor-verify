import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, CheckCircle, Clock, XCircle } from 'lucide-react';

// Mock registrations data
const mockRegistrations = [
  {
    id: '1',
    eventName: 'Congrès National de Cardiologie 2024',
    eventDate: '15-17 Mars 2024',
    location: 'Palais des Congrès, Paris',
    status: 'confirmed',
    sponsoredBy: 'Laboratoire Pasteur',
  },
  {
    id: '2',
    eventName: 'Forum Européen de Dermatologie',
    eventDate: '22-24 Avril 2024',
    location: 'Centre de Conventions, Lyon',
    status: 'pending',
    sponsoredBy: 'Pharma Solutions',
  },
];

export default function ParticipantRegistrations() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <Badge className="bg-success text-success-foreground flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            Confirmée
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            En attente
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <XCircle className="w-3 h-3" />
            Annulée
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <AppLayout 
      title="Mes inscriptions"
      subtitle="Suivez vos inscriptions aux événements"
    >
      <div className="space-y-6 animate-fade-in-up">
        {mockRegistrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockRegistrations.map((registration) => (
              <Card key={registration.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{registration.eventName}</CardTitle>
                    {getStatusBadge(registration.status)}
                  </div>
                  <CardDescription className="flex flex-col gap-2 mt-3">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {registration.eventDate}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {registration.location}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Prise en charge par</p>
                    <p className="font-medium">{registration.sponsoredBy}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground mb-4">Vous n'avez pas encore d'inscriptions</p>
              <Button onClick={() => window.location.href = '/participant/events'}>
                Voir les événements
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
