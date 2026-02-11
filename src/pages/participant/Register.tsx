import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { mockEvents } from '@/data/mockData';
import { Calendar, MapPin, Users, ArrowLeft, CheckCircle, User, Mail, Phone, Building2, Stethoscope, FileText } from 'lucide-react';
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
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">This event does not exist.</p>
          <Button onClick={() => navigate('/participant/events')}>
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
        <div className="max-w-lg mx-auto text-center py-16 animate-fade-in">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-foreground">Registration Submitted</h2>
          <p className="text-muted-foreground mb-1">
            Your registration for <strong className="text-foreground">{event.name}</strong> has been received.
          </p>
          <p className="text-muted-foreground mb-8">
            You will receive a confirmation email once your registration is approved.
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

  return (
    <AppLayout
      title={`Register: ${event.name}`}
      subtitle="Complete the form below to register for this event"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Event summary */}
        <div className="rounded-xl border border-border bg-card p-5 flex flex-wrap gap-6 items-center">
          <div className="flex-1 min-w-[200px]">
            <h3 className="font-semibold text-foreground">{event.name}</h3>
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{event.date}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{event.location}</span>
              <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" />{event.participantCount} participants</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Identity */}
            <fieldset className="space-y-4">
              <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-1">
                <User className="w-3.5 h-3.5" /> Personal Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-xs">Last Name *</Label>
                  <Input id="lastName" placeholder="Doe" value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} required className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-xs">First Name *</Label>
                  <Input id="firstName" placeholder="John" value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} required className="h-10" />
                </div>
              </div>
            </fieldset>

            {/* Contact */}
            <fieldset className="space-y-4">
              <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-1">
                <Mail className="w-3.5 h-3.5" /> Contact Details
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs">Email *</Label>
                  <Input id="email" type="email" placeholder="john.doe@example.com" value={formData.email} onChange={e => handleChange('email', e.target.value)} required className="h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Phone</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => handleChange('phone', e.target.value)} className="h-10" />
                </div>
              </div>
            </fieldset>

            {/* Professional */}
            <fieldset className="space-y-4">
              <legend className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-1">
                <Stethoscope className="w-3.5 h-3.5" /> Professional Background
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="specialty" className="text-xs">Specialty *</Label>
                  <Select value={formData.specialty} onValueChange={v => handleChange('specialty', v)}>
                    <SelectTrigger className="h-10"><SelectValue placeholder="Select specialty" /></SelectTrigger>
                    <SelectContent>
                      {specialties.map(s => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="institution" className="text-xs">Institution</Label>
                  <Input id="institution" placeholder="Hospital / Clinic" value={formData.institution} onChange={e => handleChange('institution', e.target.value)} className="h-10" />
                </div>
              </div>
            </fieldset>

            {/* Motivation */}
            <div className="space-y-1.5">
              <Label htmlFor="motivation" className="text-xs">Motivation (optional)</Label>
              <Textarea id="motivation" placeholder="Why would you like to attend this event?" value={formData.motivation} onChange={e => handleChange('motivation', e.target.value)} rows={3} />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button type="button" variant="outline" onClick={() => navigate('/participant/events')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button type="submit" disabled={isSubmitting} className="flex-1">
                {isSubmitting ? 'Submitting…' : 'Confirm Registration'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
