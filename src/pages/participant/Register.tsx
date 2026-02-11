import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockEvents } from '@/data/mockData';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const specialties = [
  'Cardiologie',
  'Dermatologie',
  'Neurologie',
  'Oncologie',
  'Pédiatrie',
  'Chirurgie générale',
  'Médecine interne',
  'Radiologie',
  'Anesthésiologie',
  'Autre',
];

export default function ParticipantRegister() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialty: '',
    institution: '',
    motivation: '',
  });

  const event = mockEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <AppLayout title="Événement introuvable" subtitle="">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Cet événement n'existe pas.</p>
          <Button onClick={() => navigate('/participant/events')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux événements
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.specialty) {
      toast({
        title: 'Champs requis',
        description: 'Veuillez remplir tous les champs obligatoires.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: 'Inscription envoyée !',
      description: 'Votre demande d\'inscription a été soumise avec succès.',
    });
  };

  if (isSubmitted) {
    return (
      <AppLayout title="Inscription confirmée" subtitle="">
        <div className="max-w-lg mx-auto text-center py-12 animate-fade-in-up">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Inscription envoyée !</h2>
          <p className="text-muted-foreground mb-2">
            Votre demande d'inscription à <strong>{event.name}</strong> a été soumise.
          </p>
          <p className="text-muted-foreground mb-8">
            Vous recevrez une confirmation par email une fois votre inscription validée.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/participant/events')}>
              Voir les événements
            </Button>
            <Button onClick={() => navigate('/participant/registrations')}>
              Mes inscriptions
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title={`Inscription : ${event.name}`}
      subtitle="Remplissez le formulaire pour vous inscrire à cet événement"
    >
      <div className="max-w-2xl mx-auto space-y-6 animate-fade-in-up">
        {/* Event Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Détails de l'événement</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-6 text-sm text-muted-foreground">
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
          </CardContent>
        </Card>

        {/* Registration Form */}
        <Card>
          <CardHeader>
            <CardTitle>Formulaire d'inscription</CardTitle>
            <CardDescription>Les champs marqués d'un * sont obligatoires</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom *</Label>
                  <Input
                    id="lastName"
                    placeholder="Votre nom"
                    value={formData.lastName}
                    onChange={e => handleChange('lastName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom *</Label>
                  <Input
                    id="firstName"
                    placeholder="Votre prénom"
                    value={formData.firstName}
                    onChange={e => handleChange('firstName', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre.email@exemple.com"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+33 6 12 34 56 78"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="specialty">Spécialité *</Label>
                  <Select value={formData.specialty} onValueChange={v => handleChange('specialty', v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez" />
                    </SelectTrigger>
                    <SelectContent>
                      {specialties.map(s => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Établissement</Label>
                  <Input
                    id="institution"
                    placeholder="Hôpital / Clinique"
                    value={formData.institution}
                    onChange={e => handleChange('institution', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">Motivation (optionnel)</Label>
                <Textarea
                  id="motivation"
                  placeholder="Pourquoi souhaitez-vous participer à cet événement ?"
                  value={formData.motivation}
                  onChange={e => handleChange('motivation', e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => navigate('/participant/events')}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting ? 'Envoi en cours...' : "Confirmer l'inscription"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
