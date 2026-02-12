import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockEvents } from '@/data/mockData';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle, User, Mail, Phone, Building2, Stethoscope, FileText, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const specialties = [
  'Cardiology', 'Dermatology', 'Neurology', 'Oncology', 'Pediatrics',
  'General Surgery', 'Internal Medicine', 'Radiology', 'Anesthesiology', 'Other',
];

export default function ParticipantRegister() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', specialty: '', institution: '', motivation: '',
  });

  const event = mockEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <AppLayout title="Event Not Found" subtitle="">
        <div className="text-center py-16">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-6">This event does not exist or has been removed.</p>
          <Button variant="outline" onClick={() => navigate('/participant/events')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
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
      toast({ title: 'Required fields', description: 'Please fill in all required fields.', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({ title: 'Registration submitted!', description: 'Your registration request has been sent successfully.' });
  };

  if (isSubmitted) {
    return (
      <AppLayout title="Registration Confirmed" subtitle="">
        <div className="max-w-md mx-auto text-center py-20 animate-fade-in">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Registration Submitted</h2>
          <p className="text-muted-foreground mb-1 text-sm">
            Your registration for <strong className="text-foreground">{event.name}</strong> has been received.
          </p>
          <p className="text-muted-foreground mb-8 text-sm">
            You will receive a confirmation email once approved.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/participant/events')}>
              Browse Events
            </Button>
            <Button onClick={() => navigate('/participant/registrations')}>
              My Registrations
            </Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const fieldGroup = (
    icon: React.ReactNode,
    title: string,
    children: React.ReactNode,
  ) => (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5 pb-2 border-b border-border">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );

  return (
    <AppLayout
      title="Event Registration"
      subtitle="Complete the form below to submit your registration"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Event summary card */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="bg-primary/5 border-b border-border px-6 py-4">
            <h3 className="font-semibold text-foreground text-base">{event.name}</h3>
          </div>
          <div className="px-6 py-4 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary/70" />
              {event.date}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary/70" />
              {event.location}
            </span>
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary/70" />
              {event.participantCount} participants
            </span>
          </div>
        </div>

        {/* Registration form */}
        <div className="rounded-xl border border-border bg-card">
          <div className="px-6 sm:px-8 py-5 border-b border-border">
            <h2 className="text-base font-semibold text-foreground">Registration Details</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Fields marked with * are required</p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 space-y-8">
            {/* Personal Information */}
            {fieldGroup(
              <User className="w-3.5 h-3.5 text-primary" />,
              'Personal Information',
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-xs font-medium text-muted-foreground">Last Name *</Label>
                  <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} required className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-xs font-medium text-muted-foreground">First Name *</Label>
                  <Input id="firstName" placeholder="John" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} required className="h-10" />
                </div>
              </div>
            )}

            {/* Contact Details */}
            {fieldGroup(
              <Mail className="w-3.5 h-3.5 text-primary" />,
              'Contact Details',
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email *</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={e => handleChange('email', e.target.value)} required className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs font-medium text-muted-foreground">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} className="h-10" />
                </div>
              </div>
            )}

            {/* Professional Background */}
            {fieldGroup(
              <Stethoscope className="w-3.5 h-3.5 text-primary" />,
              'Professional Background',
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="specialty" className="text-xs font-medium text-muted-foreground">Specialty *</Label>
                  <Select value={formData.specialty} onValueChange={v => handleChange('specialty', v)}>
                    <SelectTrigger className="h-10"><SelectValue placeholder="Select specialty" /></SelectTrigger>
                    <SelectContent>
                      {specialties.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="institution" className="text-xs font-medium text-muted-foreground">Institution</Label>
                  <Input id="institution" placeholder="Hospital / Clinic" value={formData.institution} onChange={e => handleChange('institution', e.target.value)} className="h-10" />
                </div>
              </div>
            )}

            {/* Motivation */}
            <div className="space-y-1.5">
              <Label htmlFor="motivation" className="text-xs font-medium text-muted-foreground">Motivation (optional)</Label>
              <Textarea id="motivation" placeholder="Why would you like to attend this event?" value={formData.motivation} onChange={e => handleChange('motivation', e.target.value)} rows={3} className="resize-none" />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => navigate('/participant/events')} className="h-10">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1 h-10">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  'Confirm Registration'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
