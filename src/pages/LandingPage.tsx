import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockEvents } from '@/data/mockData';
import { Calendar, MapPin, Users, Search, ArrowRight, Shield, Activity, CheckCircle2, Globe, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LandingPage() {
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
        return <Badge className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-medium">● Active</Badge>;
      case 'upcoming':
        return <Badge className="bg-primary/10 text-primary border border-primary/20 font-medium">Upcoming</Badge>;
      case 'completed':
        return <Badge variant="outline" className="text-muted-foreground font-medium">Completed</Badge>;
      default:
        return null;
    }
  };

  const handleRegister = (eventId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/participant/register/${eventId}`);
    }
  };

  const stats = [
    { icon: Globe, label: 'Events Hosted', value: '120+' },
    { icon: Users, label: 'Participants', value: '15,000+' },
    { icon: CheckCircle2, label: 'Validated', value: '98%' },
    { icon: Clock, label: 'Avg. Processing', value: '<2min' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-md shadow-primary/25">
              <Shield className="w-4.5 h-4.5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-foreground leading-tight">VerifLab</span>
              <span className="text-[10px] text-muted-foreground leading-tight">by HeadsApp</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button onClick={() => navigate('/dashboard')} size="sm">
                Go to Dashboard
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Sign In</Button>
                <Button size="sm" onClick={() => navigate('/login')} className="shadow-md shadow-primary/20">
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-background to-primary/[0.06]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/[0.05] rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/15 rounded-full px-4 py-1.5 mb-6">
              <Activity className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Medical Events Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-[1.1] tracking-tight">
              Discover & Register for{' '}
              <span className="text-primary relative">
                Medical Events
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 8.5C50 2 100 2 150 6C200 10 250 4 298 7" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              Browse upcoming medical congresses, symposiums, and forums. Register with one click and manage your participation seamlessly.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl" />
              <div className="relative flex items-center bg-card border border-border rounded-2xl shadow-lg shadow-black/[0.04] overflow-hidden">
                <Search className="ml-5 text-muted-foreground w-5 h-5 shrink-0" />
                <Input
                  placeholder="Search events by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 h-14 text-base pl-3 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                />
                <Button className="mr-2 rounded-xl h-10 px-5 shadow-md shadow-primary/20">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-card/60 border border-border/50 backdrop-blur-sm">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">Available Events</h2>
            <p className="text-muted-foreground mt-1.5">{filteredEvents.length} events found</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg">All</Button>
            <Button variant="ghost" size="sm" className="rounded-lg text-muted-foreground">Active</Button>
            <Button variant="ghost" size="sm" className="rounded-lg text-muted-foreground">Upcoming</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card 
              key={event.id} 
              className="group relative overflow-hidden border-border/80 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.05] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top accent bar */}
              <div className={`h-1 w-full ${
                event.status === 'active' ? 'bg-emerald-500' : 
                event.status === 'upcoming' ? 'bg-primary' : 'bg-muted'
              }`} />
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <h3 className="font-semibold text-foreground text-base leading-snug group-hover:text-primary transition-colors">
                    {event.name}
                  </h3>
                  {getStatusBadge(event.status)}
                </div>
                
                <div className="space-y-2.5 mb-6">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/[0.06] flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/[0.06] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-8 h-8 rounded-lg bg-primary/[0.06] flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <span>{event.participantCount.toLocaleString()} participants</span>
                  </div>
                </div>

                {event.status !== 'completed' ? (
                  <Button
                    className="w-full rounded-xl h-11 font-medium shadow-md shadow-primary/15 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all"
                    onClick={() => handleRegister(event.id)}
                  >
                    Register Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </Button>
                ) : (
                  <Button variant="outline" className="w-full rounded-xl h-11 font-medium" disabled>
                    Event Completed
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-muted-foreground/50" />
            </div>
            <p className="text-lg font-semibold text-foreground">No events found</p>
            <p className="text-muted-foreground mt-1">Try adjusting your search query</p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-10 sm:p-14 text-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/[0.06] rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/[0.04] rounded-full blur-2xl translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-3">
              Ready to Join the Next Congress?
            </h2>
            <p className="text-primary-foreground/80 max-w-md mx-auto mb-8">
              Create your account today and start registering for medical events in minutes.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button 
                size="lg" 
                variant="secondary" 
                className="rounded-xl font-medium shadow-lg"
                onClick={() => navigate('/login')}
              >
                Create Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-foreground">VerifLab</span>
              <span className="text-xs text-muted-foreground">by HeadsApp</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2025 HeadsApp — VerifLab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
