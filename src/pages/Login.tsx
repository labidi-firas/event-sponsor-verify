import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Loader2, AlertCircle, Eye, EyeOff, Lock, Mail, Activity, Users, BarChart3 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(email, password);
    
    if (success) {
      if (email.includes('lab')) navigate('/dashboard');
      else if (email.includes('participant')) navigate('/participant/events');
      else if (email.includes('admin')) navigate('/admin/dashboard');
      else navigate('/dashboard');
    } else {
      setError('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  const demoAccounts = [
    { label: 'Laboratory', email: 'lab@example.com', icon: Activity },
    { label: 'Participant', email: 'participant@example.com', icon: Users },
    { label: 'Administrator', email: 'admin@example.com', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left – Dark sidebar branding */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] flex-col justify-between p-12 bg-sidebar-background text-sidebar-foreground relative overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight">VerifLab</span>
              <p className="text-[11px] text-sidebar-foreground/50 -mt-0.5">by HeadsApp</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-sidebar-primary mb-4">Enterprise Platform</p>
            <h2 className="text-[2rem] font-bold leading-[1.15] tracking-tight">
              Sponsorship
              <br />
              Verification
              <br />
              <span className="text-sidebar-primary">Intelligence</span>
            </h2>
          </div>

          <p className="text-[15px] text-sidebar-foreground/60 leading-relaxed max-w-sm">
            AI-powered compliance platform for managing and verifying medical event sponsorship declarations.
          </p>

          <div className="space-y-3 pt-2">
            {[
              { value: '98%', label: 'AI verification accuracy' },
              { value: '2,400+', label: 'Events monitored' },
              { value: '50,000+', label: 'Declarations processed' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-4">
                <span className="text-2xl font-bold text-sidebar-primary tabular-nums w-24">{stat.value}</span>
                <span className="text-sm text-sidebar-foreground/50">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-[11px] text-sidebar-foreground/30">
          © 2025 HeadsApp · All rights reserved
        </p>
      </div>

      {/* Right – Form area */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">VerifLab</span>
          </div>

          <div className="mb-8">
            <h1 className="text-[1.65rem] font-bold text-foreground tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1.5">Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="py-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-muted-foreground/60" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="h-11 pl-10 bg-background border-border"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">Password</Label>
                <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-[15px] h-[15px] text-muted-foreground/60" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 pl-10 pr-11 bg-background border-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-[15px] h-[15px]" /> : <Eye className="w-[15px] h-[15px]" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 font-medium text-sm" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          {/* Demo accounts */}
          <div className="mt-10">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/70 mb-3">Quick access — Demo</p>
            <div className="grid grid-cols-3 gap-2">
              {demoAccounts.map((demo) => {
                const Icon = demo.icon;
                return (
                  <button
                    key={demo.email}
                    type="button"
                    onClick={() => fillDemo(demo.email)}
                    className="flex flex-col items-center gap-2 p-3.5 rounded-xl border border-border bg-card hover:bg-accent hover:border-primary/20 transition-all text-center group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-xs font-medium text-foreground">{demo.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
