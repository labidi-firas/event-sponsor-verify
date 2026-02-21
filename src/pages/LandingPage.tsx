import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockEvents } from '@/data/mockData';
import {
  Calendar,
  MapPin,
  Users,
  Search,
  ArrowRight,
  ArrowUpRight,
  Shield,
  CheckCircle2,
  Globe,
  Clock,
  ChevronLeft,
  ChevronRight,
  Zap,
  Award,
  TrendingUp,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ITEMS_PER_PAGE = 6;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

/* ──────────────────────────────────────────────
   Trusted-by / social proof strip
   ────────────────────────────────────────────── */
function TrustStrip() {
  const orgs = ['CHU Paris', 'Hôpital Lyon-Sud', 'Institut Pasteur', 'AP-HP', 'Gustave Roussy'];
  return (
    <div className="border-b border-border bg-card/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-semibold shrink-0">
          Trusted by
        </span>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          {orgs.map((org) => (
            <span key={org} className="text-xs text-muted-foreground/60 font-medium whitespace-nowrap">
              {org}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Hero
   ────────────────────────────────────────────── */
function HeroSection({ searchQuery, onSearchChange }: { searchQuery: string; onSearchChange: (v: string) => void }) {
  const stats = [
    { icon: Globe, label: 'Events Hosted', value: '120+', color: 'text-primary' },
    { icon: Users, label: 'Participants', value: '15K+', color: 'text-primary' },
    { icon: CheckCircle2, label: 'Validation Rate', value: '98%', color: 'text-emerald-600' },
    { icon: Clock, label: 'Avg. Processing', value: '<2m', color: 'text-primary' },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Geometric accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] -translate-y-1/3 translate-x-1/4 rounded-full border border-primary/[0.06]" />
      <div className="absolute top-20 right-20 w-[300px] h-[300px] -translate-y-1/4 translate-x-1/4 rounded-full border border-primary/[0.04]" />
      <div className="absolute bottom-0 left-0 w-[200px] h-[200px] translate-y-1/2 -translate-x-1/3 rounded-full bg-primary/[0.02]" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 sm:pt-24 sm:pb-20">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Tag */}
          <motion.div variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-1.5 border border-primary/15 bg-primary/[0.06] rounded-full px-3 py-1 mb-6">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.18em]">
                Medical Events Platform
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-5"
          >
            The smarter way to
            <br />
            discover & register for{' '}
            <span className="relative inline-block text-primary">
              medical events
              <span className="absolute -bottom-1.5 left-0 right-0 h-[3px] bg-primary/20 rounded-full" />
            </span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-muted-foreground text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
          >
            Browse upcoming congresses, symposiums, and forums.
            Register in one click and manage your participation — all in one place.
          </motion.p>

          {/* Search */}
          <motion.div variants={fadeUp} custom={3} className="max-w-xl mb-12">
            <div className="relative group">
              <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-primary/20 via-primary/5 to-primary/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <Search className="ml-4 text-muted-foreground w-4 h-4 shrink-0" />
                <Input
                  placeholder="Search by event name or location..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="border-0 h-12 text-sm pl-3 pr-28 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent placeholder:text-muted-foreground/50"
                />
                <Button size="sm" className="absolute right-1.5 h-9 px-5 rounded-lg text-xs font-semibold shadow-sm">
                  Search
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            custom={4}
            className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border rounded-xl overflow-hidden border border-border"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card flex flex-col items-center justify-center py-5 px-3"
              >
                <stat.icon className={`w-4 h-4 ${stat.color} mb-2`} />
                <span className="text-2xl font-bold text-foreground leading-none tracking-tight">{stat.value}</span>
                <span className="text-[10px] text-muted-foreground font-medium mt-1.5 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Status Badge
   ────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; dot: string; className: string }> = {
    active: { label: 'Active', dot: 'bg-emerald-500', className: 'bg-emerald-500/8 text-emerald-700 border-emerald-500/15' },
    upcoming: { label: 'Upcoming', dot: 'bg-primary', className: 'bg-primary/8 text-primary border-primary/15' },
    completed: { label: 'Ended', dot: 'bg-muted-foreground/40', className: 'bg-muted text-muted-foreground border-border' },
  };
  const c = config[status];
  if (!c) return null;
  return (
    <Badge variant="outline" className={`text-[10px] font-semibold px-2 py-0.5 gap-1.5 ${c.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </Badge>
  );
}

/* ──────────────────────────────────────────────
   Event Card
   ────────────────────────────────────────────── */
function EventCard({ event, onRegister, index }: { event: typeof mockEvents[0]; onRegister: (id: string) => void; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <Card className="group relative overflow-hidden border-border bg-card hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/[0.04]">
        {/* Hover accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <CardContent className="p-6">
          {/* Status + type label */}
          <div className="flex items-center justify-between mb-4">
            <StatusBadge status={event.status} />
            <span className="text-[10px] text-muted-foreground/50 font-mono uppercase">
              EVT-{event.id.padStart(3, '0')}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground text-[15px] leading-snug mb-4 group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
            {event.name}
          </h3>

          {/* Meta rows */}
          <div className="space-y-2.5 mb-6">
            {[
              { icon: Calendar, text: event.date },
              { icon: MapPin, text: event.location },
              { icon: Users, text: `${event.participantCount.toLocaleString()} participants` },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-[13px] text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-secondary/80 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-foreground/50" />
                </div>
                <span className="truncate">{text}</span>
              </div>
            ))}
          </div>

          <Separator className="mb-5" />

          {/* CTA */}
          {event.status !== 'completed' ? (
            <Button
              className="w-full h-10 text-xs font-semibold rounded-lg group/btn"
              onClick={() => onRegister(event.id)}
            >
              Register Now
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          ) : (
            <Button variant="outline" className="w-full h-10 text-xs font-medium rounded-lg" disabled>
              Event Completed
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Features row (value props)
   ────────────────────────────────────────────── */
function FeaturesRow() {
  const features = [
    { icon: Zap, title: 'Instant Registration', desc: 'Sign up for events in seconds with one-click enrollment' },
    { icon: Award, title: 'Verified Events', desc: 'All events are validated by official medical boards' },
    { icon: TrendingUp, title: 'Track Everything', desc: 'Monitor your registrations, certificates, and history' },
  ];

  return (
    <section className="border-y border-border bg-card/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/[0.08] border border-primary/[0.1] flex items-center justify-center shrink-0">
                <f.icon className="w-4.5 h-4.5 text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{f.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Pagination
   ────────────────────────────────────────────── */
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
      <p className="text-[11px] text-muted-foreground font-mono order-2 sm:order-1">
        Page {currentPage}/{totalPages} — {totalItems} results
      </p>
      <div className="flex items-center gap-1 order-1 sm:order-2">
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 rounded-lg"
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
              {showEllipsis && <span className="w-8 text-center text-[10px] text-muted-foreground">…</span>}
              <Button
                variant={page === currentPage ? 'default' : 'ghost'}
                size="sm"
                className="h-8 w-8 p-0 rounded-lg text-xs font-medium"
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
          className="h-8 w-8 p-0 rounded-lg"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Export
   ────────────────────────────────────────────── */
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
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center shadow-sm shadow-primary/20">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold text-foreground tracking-tight">VerifLab</span>
              <span className="text-[9px] text-muted-foreground font-medium tracking-wider uppercase">by HeadsApp</span>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-6 mr-auto ml-12">
            <a href="#events" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">Events</a>
            <a href="#features" className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">Features</a>
          </nav>

          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg font-medium" onClick={() => navigate('/dashboard')}>
                Dashboard
                <ArrowUpRight className="w-3 h-3 ml-1" />
              </Button>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="h-8 text-xs rounded-lg font-medium" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button size="sm" className="h-8 text-xs rounded-lg font-semibold shadow-sm shadow-primary/20" onClick={() => navigate('/login')}>
                  Get Started
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ─── Trust strip ─── */}
      <TrustStrip />

      {/* ─── Hero ─── */}
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* ─── Features ─── */}
      <div id="features">
        <FeaturesRow />
      </div>

      {/* ─── Events ─── */}
      <main className="flex-1" id="events">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.18em]">Browse Events</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">Available Events</h2>
              <p className="text-xs text-muted-foreground mt-1 font-mono">{filteredEvents.length} results</p>
            </div>
            <div className="hidden sm:flex items-center gap-1 border border-border rounded-lg p-0.5">
              <Button variant="secondary" size="sm" className="h-7 text-[11px] rounded-md font-semibold px-3">All</Button>
              <Button variant="ghost" size="sm" className="h-7 text-[11px] rounded-md text-muted-foreground px-3">Active</Button>
              <Button variant="ghost" size="sm" className="h-7 text-[11px] rounded-md text-muted-foreground px-3">Upcoming</Button>
            </div>
          </div>

          {currentEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {currentEvents.map((event, i) => (
                <EventCard key={event.id} event={event} onRegister={handleRegister} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-border rounded-xl bg-card/30">
              <Search className="w-6 h-6 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-sm font-semibold text-foreground">No events found</p>
              <p className="text-[11px] text-muted-foreground mt-1">Try adjusting your search query</p>
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl gradient-primary p-10 sm:p-14"
        >
          {/* Geometric accents */}
          <div className="absolute top-0 right-0 w-64 h-64 border border-white/[0.06] rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-40 h-40 border border-white/[0.04] rounded-full translate-y-1/2 -translate-x-1/3" />

          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground mb-2 tracking-tight">
                Ready to Join the Next Congress?
              </h2>
              <p className="text-primary-foreground/60 text-sm max-w-md leading-relaxed">
                Create your account and start registering for medical events in minutes. No setup required.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="secondary"
                className="rounded-lg font-semibold text-xs h-10 px-6 shadow-md"
                onClick={() => navigate('/login')}
              >
                Create Account
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-border bg-card/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-bold text-foreground">VerifLab</span>
                <span className="text-[9px] text-muted-foreground">by HeadsApp</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">
              © 2025 HeadsApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
