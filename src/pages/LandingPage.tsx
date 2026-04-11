import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Calendar, MapPin, Users, Search, ArrowRight, Shield,
  Activity, CheckCircle2, Globe, Clock, ChevronLeft, ChevronRight,
  Brain, Zap, Award, Lock, Sparkles, Star, TrendingUp, Heart,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { getAllEvents, type Event } from '@/lib/api/events';

const ITEMS_PER_PAGE = 6;

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
function formatLocation(loc: any): string {
  if (typeof loc === 'string') return loc;
  if (loc && typeof loc === 'object') return loc.address || loc.city || loc.name || 'Location TBD';
  return 'Location TBD';
}

/* ─── Reveal wrapper ───────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Floating orbs background ─────────────────────────────────────────────── */
function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-primary/[0.07] blur-[120px] animate-pulse" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[100px]" style={{ background: 'hsl(250 80% 60%)' }} />
      <div className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[90px]" style={{ background: 'hsl(160 60% 50%)' }} />
    </div>
  );
}

/* ─── Header ───────────────────────────────────────────────────────────────── */
function Header() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-2xl border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <Shield className="w-[18px] h-[18px] text-primary-foreground" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border-2 border-background" />
          </div>
          <div>
            <span className={`text-base font-bold tracking-tight ${scrolled ? 'text-foreground' : 'text-white'}`}>
              HeadsApp
            </span>
            <span className={`block text-[10px] font-medium tracking-wider uppercase ${scrolled ? 'text-muted-foreground' : 'text-white/50'}`}>
              Medical Platform
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-1">
          {['Events', 'Features', 'About'].map(label => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className={`px-4 py-2 text-[13px] font-medium rounded-lg transition-colors ${
                scrolled
                  ? 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <button
              onClick={() => navigate('/dashboard')}
              className="h-9 px-5 rounded-xl gradient-primary text-primary-foreground text-xs font-bold shadow-lg shadow-primary/30 flex items-center gap-2 hover:shadow-xl hover:shadow-primary/40 transition-all"
            >
              Dashboard <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className={`h-9 px-4 rounded-xl text-xs font-semibold transition-all ${
                  scrolled
                    ? 'border border-border bg-background text-foreground hover:bg-accent'
                    : 'border border-white/20 bg-white/5 text-white hover:bg-white/10'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="h-9 px-5 rounded-xl gradient-primary text-primary-foreground text-xs font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────────────────── */
function HeroSection({ searchQuery, onSearchChange }: { searchQuery: string; onSearchChange: (v: string) => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden" style={{ background: 'hsl(222 47% 8%)' }}>
      <FloatingOrbs />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 20%, hsl(222 47% 4%) 80%)' }} />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(hsl(var(--primary)) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold text-primary tracking-wide">AI-Powered Medical Events</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6"
        >
          The Future of
          <br />
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, hsl(var(--primary)), hsl(250 80% 68%), hsl(280 70% 65%))' }}>
            Medical Events
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Discover, register, and manage medical congresses — powered by AI verification with{' '}
          <span className="text-white font-semibold">97% accuracy</span>.
        </motion.p>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="max-w-lg mx-auto relative group mb-10"
        >
          <div className="absolute -inset-1 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(to right, hsl(var(--primary) / 0.3), hsl(250 80% 60% / 0.2), hsl(var(--primary) / 0.3))' }} />
          <div className="relative flex items-center bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group-focus-within:border-primary/40 transition-colors">
            <Search className="absolute left-4 w-[18px] h-[18px] text-white/30" />
            <input
              placeholder="Search events, locations..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="flex-1 h-14 pl-12 pr-32 bg-transparent border-none outline-none text-white text-sm placeholder:text-white/25"
            />
            <button
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="absolute right-2 h-10 px-6 rounded-xl gradient-primary text-primary-foreground text-xs font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all"
            >
              Search
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-wrap justify-center gap-8 md:gap-14"
        >
          {[
            { icon: Globe, value: '120+', label: 'Events' },
            { icon: Users, value: '15,000+', label: 'Participants' },
            { icon: CheckCircle2, value: '98%', label: 'Verified' },
            { icon: Clock, value: '<2min', label: 'Processing' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/10 transition-all">
                <Icon className="w-[18px] h-[18px] text-white/40 group-hover:text-primary transition-colors" />
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-white">{value}</div>
                <div className="text-[11px] text-white/35 font-medium">{label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/20 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Trust strip ──────────────────────────────────────────────────────────── */
function TrustStrip() {
  return (
    <Reveal>
      <section className="py-16 border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase mb-8">
            Trusted by leading medical institutions
          </p>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
            {['CHU Mustapha', "Hôpital Central d'Alger", 'Institut Pasteur', 'CHU Constantine', 'Faculté de Médecine Oran', 'CHU Tlemcen'].map(name => (
              <span key={name} className="text-sm text-muted-foreground/50 font-semibold tracking-wide hover:text-muted-foreground transition-colors">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

/* ─── Features ─────────────────────────────────────────────────────────────── */
function FeaturesSection() {
  const features = [
    { icon: Brain, color: 'hsl(270 80% 65%)', title: 'AI-Powered Matching', desc: 'Neural embeddings for name similarity — 97% accuracy rate on identity verification.' },
    { icon: Shield, color: 'hsl(var(--primary))', title: 'Identity Verification', desc: 'Multi-field comparison: name, DOB, national ID — all scored independently.' },
    { icon: Zap, color: 'hsl(var(--warning))', title: 'Instant Processing', desc: 'Bulk analyze hundreds of declarations in seconds with real-time results.' },
    { icon: Activity, color: 'hsl(var(--success))', title: 'Live Monitoring', desc: 'Real-time dashboard with notifications when AI finds a match.' },
    { icon: Award, color: 'hsl(330 80% 60%)', title: 'Audit Trail', desc: 'Every comparison stored with detailed score breakdowns for compliance.' },
    { icon: Lock, color: 'hsl(195 80% 55%)', title: 'Role-Based Access', desc: 'Admins, labs, and participants each have tailored dashboards.' },
  ];

  return (
    <section id="features" className="py-28 bg-background relative">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Star className="w-3 h-3 text-primary" />
              <span className="text-[11px] font-semibold text-primary tracking-wide">Platform Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
              Everything you need,{' '}
              <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, hsl(var(--primary)), hsl(250 80% 60%))' }}>
                nothing you don't
              </span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm">
              From participant registration to AI-powered verification — one platform handles it all.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, color, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="group relative p-6 rounded-2xl border border-border/60 bg-card hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: `color-mix(in srgb, ${color} 12%, transparent)` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-2">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Status Badge ─────────────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { label: string; classes: string; dot?: boolean }> = {
    PUBLISHED:  { label: 'Open', classes: 'bg-success/15 text-success border-success/25', dot: true },
    DRAFT:      { label: 'Upcoming', classes: 'bg-primary/15 text-primary border-primary/25' },
    COMPLETED:  { label: 'Completed', classes: 'bg-muted text-muted-foreground border-border' },
    CANCELLED:  { label: 'Cancelled', classes: 'bg-destructive/15 text-destructive border-destructive/25' },
  };
  const c = cfg[status];
  if (!c) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide border ${c.classes}`}>
      {c.dot && <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />}
      {c.label}
    </span>
  );
}

/* ─── Event Card ───────────────────────────────────────────────────────────── */
function EventCard({ event, onRegister, index }: { event: Event; onRegister: (id: string) => void; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.08] transition-all duration-500 hover:-translate-y-2"
    >
      {/* Image placeholder */}
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5">
        {event.image ? (
          <img src={event.image} alt={event.nom} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
              <Heart className="w-6 h-6 text-primary/40" />
            </div>
            <span className="text-[10px] text-muted-foreground/50 font-medium tracking-wider uppercase">Medical Event</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <StatusBadge status={event.status} />
        </div>
        {event.participantCount > 0 && (
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50">
            <Users className="w-3 h-3 text-muted-foreground" />
            <span className="text-[11px] font-semibold text-foreground">{event.participantCount}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-sm font-bold text-foreground mb-3 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {event.nom}
        </h3>
        <div className="space-y-2 mb-5">
          {[
            { icon: Calendar, text: `${formatDate(event.dateDebut)} — ${formatDate(event.dateFin)}` },
            { icon: MapPin, text: formatLocation(event.location) },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground truncate">{text}</span>
            </div>
          ))}
        </div>

        {event.status === 'PUBLISHED' ? (
          <button
            onClick={() => onRegister(event.id)}
            className="w-full h-11 rounded-xl gradient-primary text-primary-foreground text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all group/btn"
          >
            Register Now
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </button>
        ) : (
          <div className="w-full h-11 rounded-xl bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
            {event.status === 'COMPLETED' ? 'Event Completed' : 'Not Available'}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Pagination ───────────────────────────────────────────────────────────── */
function PaginationControls({ currentPage, totalPages, totalItems, onPageChange }: {
  currentPage: number; totalPages: number; totalItems: number; onPageChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1);

  return (
    <div className="flex flex-col items-center gap-4 mt-12">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        {pages.map((page, i) => {
          const prev = pages[i - 1];
          return (
            <span key={page} className="contents">
              {prev && page - prev > 1 && <span className="text-xs text-muted-foreground px-1">…</span>}
              <button
                onClick={() => onPageChange(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  page === currentPage
                    ? 'gradient-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'border border-border bg-card text-muted-foreground hover:bg-accent'
                }`}
              >
                {page}
              </button>
            </span>
          );
        })}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <p className="text-xs text-muted-foreground">
        Page {currentPage} of {totalPages} — {totalItems} events
      </p>
    </div>
  );
}

/* ─── CTA Section ──────────────────────────────────────────────────────────── */
function CTASection() {
  const navigate = useNavigate();
  return (
    <Reveal>
      <section id="about" className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/[0.03] to-background" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <TrendingUp className="w-3 h-3 text-primary" />
            <span className="text-[11px] font-semibold text-primary">Join Now</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-4">
            Ready to join your next congress?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-10 text-sm leading-relaxed">
            Create your account, register for events, and let AI handle the verification seamlessly.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/register')}
              className="h-12 px-8 rounded-xl gradient-primary text-primary-foreground text-sm font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all flex items-center gap-2"
            >
              Create Free Account <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="h-12 px-8 rounded-xl border border-border bg-card text-foreground text-sm font-semibold hover:bg-accent transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

/* ─── Footer ───────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-foreground">HeadsApp</span>
        </div>
        <div className="flex items-center gap-6">
          {['Events', 'Features', 'Sign In'].map(item => (
            <a key={item} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {item}
            </a>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">© 2025 HeadsApp. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─── Main Page ────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true); setError(null);
      const result = await getAllEvents({ limit: 1000, status: 'PUBLISHED' });
      setEvents(result.events || []);
    } catch {
      setError('Failed to load events. Please try again.');
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredEvents = useMemo(() =>
    events.filter(e =>
      e.nom?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      formatLocation(e.location).toLowerCase().includes(searchQuery.toLowerCase())
    ), [events, searchQuery]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const currentEvents = filteredEvents.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  useEffect(() => setCurrentPage(1), [searchQuery]);

  const handleRegister = (id: string) => {
    if (isAuthenticated) {
      navigate(`/event/register/${id}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <TrustStrip />

      {/* Events Section */}
      <section id="events" className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Calendar className="w-3 h-3 text-primary" />
                  <span className="text-[11px] font-semibold text-primary tracking-wide">Upcoming Events</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-2">
                  Open for Registration
                </h2>
                <p className="text-sm text-muted-foreground">
                  {isLoading ? 'Loading events...' : `${filteredEvents.length} event${filteredEvents.length !== 1 ? 's' : ''} available`}
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  placeholder="Filter events..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>
          </Reveal>

          {/* Loading */}
          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                  <Skeleton className="h-44 w-full" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                    <Skeleton className="h-11 w-full rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !isLoading && (
            <div className="text-center py-16">
              <p className="text-sm text-destructive mb-4">{error}</p>
              <button onClick={fetchEvents} className="h-10 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-bold">
                Try Again
              </button>
            </div>
          )}

          {/* Grid */}
          <AnimatePresence mode="wait">
            {!isLoading && !error && currentEvents.length > 0 && (
              <motion.div
                key={currentPage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {currentEvents.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} onRegister={handleRegister} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty */}
          {!isLoading && !error && currentEvents.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-1">No events found</h3>
              <p className="text-xs text-muted-foreground">Try a different search term</p>
            </div>
          )}

          {!isLoading && !error && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredEvents.length}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>

      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}
