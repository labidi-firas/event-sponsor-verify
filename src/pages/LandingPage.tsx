import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { mockEvents } from '@/data/mockData';
import {
  Calendar,
  MapPin,
  Users,
  Search,
  ArrowRight,
  Shield,
  Activity,
  CheckCircle2,
  Globe,
  Clock,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ITEMS_PER_PAGE = 6;

function HeroSection({ searchQuery, onSearchChange }: { searchQuery: string; onSearchChange: (v: string) => void }) {
  const stats = [
    { icon: Globe, label: 'Events Hosted', value: '120+' },
    { icon: Users, label: 'Participants', value: '15,000+' },
    { icon: CheckCircle2, label: 'Validated', value: '98%' },
    { icon: Clock, label: 'Avg. Processing', value: '<2min' },
  ];

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-background" />
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/[0.08] border border-primary/[0.12] rounded-md px-3 py-1.5 mb-8">
            <Activity className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-semibold text-primary uppercase tracking-[0.15em]">Medical Events Platform</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-[1.15] tracking-tight mb-4">
            Discover & Register for
            <br />
            <span className="text-primary">Medical Events</span>
          </h1>

          <p className="text-[15px] text-muted-foreground max-w-lg mx-auto mb-10 leading-relaxed">
            Browse upcoming medical congresses, symposiums, and forums. 
            Register with one click and manage your participation seamlessly.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mb-14">
            <div className="relative flex items-center bg-card border border-border rounded-lg shadow-sm">
              <Search className="absolute left-3.5 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search events by name or location..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border-0 h-12 text-sm pl-10 pr-24 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              />
              <Button size="sm" className="absolute right-1.5 h-9 px-4 rounded-md text-xs font-semibold">
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1.5 p-4 rounded-lg border border-border/60 bg-card/50"
            >
              <stat.icon className="w-4 h-4 text-primary" />
              <span className="text-xl font-bold text-foreground leading-none">{stat.value}</span>
              <span className="text-[11px] text-muted-foreground font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; className: string }> = {
    active: { label: 'Active', className: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' },
    upcoming: { label: 'Upcoming', className: 'bg-primary/10 text-primary border-primary/20' },
    completed: { label: 'Completed', className: 'bg-muted text-muted-foreground border-border' },
  };
  const c = config[status];
  if (!c) return null;
  return (
    <Badge variant="outline" className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${c.className}`}>
      {c.label}
    </Badge>
  );
}

function EventCard({ event, onRegister }: { event: typeof mockEvents[0]; onRegister: (id: string) => void }) {
  const accentColor = event.status === 'active' ? 'bg-emerald-500' : event.status === 'upcoming' ? 'bg-primary' : 'bg-muted-foreground/30';

  return (
    <Card className="group relative overflow-hidden border-border hover:border-primary/25 transition-all duration-200 hover:shadow-md">
      <div className={`h-0.5 w-full ${accentColor}`} />
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="font-semibold text-foreground text-sm leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {event.name}
          </h3>
          <StatusBadge status={event.status} />
        </div>

        {/* Meta */}
        <div className="space-y-2 mb-5">
          {[
            { icon: Calendar, text: event.date },
            { icon: MapPin, text: event.location },
            { icon: Users, text: `${event.participantCount.toLocaleString()} participants` },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
              <div className="w-7 h-7 rounded-md bg-secondary flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-primary" />
              </div>
              <span>{text}</span>
            </div>
          ))}
        </div>

        {/* Action */}
        {event.status !== 'completed' ? (
          <Button
            className="w-full h-10 text-xs font-semibold rounded-md"
            onClick={() => onRegister(event.id)}
          >
            Register Now
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        ) : (
          <Button variant="outline" className="w-full h-10 text-xs font-semibold rounded-md" disabled>
            Event Completed
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-border">
      <p className="text-xs text-muted-foreground order-2 sm:order-1">
        Page {currentPage} of {totalPages} · {totalItems} events
      </p>
      <div className="flex items-center gap-1 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 rounded-md"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </Button>

        {pages.map((page, i) => {
          const prev = pages[i - 1];
          const showEllipsis = prev && page - prev > 1;
          return (
            <span key={page} className="flex items-center">
              {showEllipsis && <span className="w-8 text-center text-xs text-muted-foreground">…</span>}
              <Button
                variant={page === currentPage ? 'default' : 'ghost'}
                size="sm"
                className="h-8 w-8 p-0 rounded-md text-xs font-medium"
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            </span>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 rounded-md"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const filteredEvents = useMemo(
    () =>
      mockEvents.filter(
        (e) =>
          e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.location.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [searchQuery]
  );

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => setCurrentPage(1), [searchQuery]);

  const handleRegister = (eventId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/participant/register/${eventId}`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-foreground">VerifLab</span>
              <span className="text-[9px] text-muted-foreground font-medium tracking-wide">by HeadsApp</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button size="sm" variant="outline" className="h-8 text-xs rounded-md" onClick={() => navigate('/dashboard')}>
                Dashboard
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="h-8 text-xs rounded-md" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button size="sm" className="h-8 text-xs rounded-md" onClick={() => navigate('/login')}>
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ─── Hero ─── */}
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* ─── Events ─── */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-xl font-bold text-foreground">Available Events</h2>
              <p className="text-xs text-muted-foreground mt-1">{filteredEvents.length} events found</p>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <Button variant="outline" size="sm" className="h-7 text-[11px] rounded-md">All</Button>
              <Button variant="ghost" size="sm" className="h-7 text-[11px] rounded-md text-muted-foreground">Active</Button>
              <Button variant="ghost" size="sm" className="h-7 text-[11px] rounded-md text-muted-foreground">Upcoming</Button>
            </div>
          </div>

          {currentEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentEvents.map((event) => (
                <EventCard key={event.id} event={event} onRegister={handleRegister} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-border rounded-lg">
              <Search className="w-6 h-6 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-sm font-semibold text-foreground">No events found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your search query</p>
            </div>
          )}

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredEvents.length}
            onPageChange={setCurrentPage}
          />
        </section>
      </main>

      {/* ─── CTA ─── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="relative overflow-hidden rounded-xl gradient-primary p-10 sm:p-12 text-center">
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }} />
          <div className="relative">
            <Stethoscope className="w-8 h-8 text-primary-foreground/60 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-2">
              Ready to Join the Next Congress?
            </h2>
            <p className="text-primary-foreground/70 text-sm max-w-md mx-auto mb-6">
              Create your account and start registering for medical events in minutes.
            </p>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-md font-semibold text-xs h-9 px-5"
              onClick={() => navigate('/login')}
            >
              Create Account
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border bg-card/40 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Shield className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="text-xs font-semibold text-foreground">VerifLab</span>
            <span className="text-[10px] text-muted-foreground">by HeadsApp</span>
          </div>
          <p className="text-[10px] text-muted-foreground">
            © 2025 HeadsApp — VerifLab. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
