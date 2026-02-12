import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Loader2, AlertCircle, Eye, EyeOff, Activity, Users, BarChart3 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import medicalTeam from '@/assets/medical-team.jpg';

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
    { label: 'Admin', email: 'admin@example.com', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen flex bg-[hsl(180,30%,95%)]">
      {/* Left – Illustration panel */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative items-center justify-center p-12 overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
        <div className="absolute bottom-20 left-10 w-20 h-20 rounded-full bg-primary/10" />
        <div className="absolute top-16 left-20 text-primary/20 text-4xl font-bold">+</div>
        <div className="absolute bottom-32 right-24 text-primary/15 text-3xl font-bold">+</div>

        <div className="relative z-10 flex flex-col items-center text-center max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="text-left">
              <span className="text-lg font-bold text-foreground tracking-tight">VerifLab</span>
              <p className="text-[10px] text-muted-foreground -mt-0.5">by HeadsApp</p>
            </div>
          </div>

          {/* Illustration */}
          <img
            src={medicalTeam}
            alt="Medical professionals team"
            className="w-80 h-auto mb-8 drop-shadow-lg"
          />

          <h2 className="text-xl font-bold text-foreground mb-2">Welcome Back</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            AI-powered compliance platform for managing medical event sponsorship declarations.
          </p>
        </div>

        <p className="absolute bottom-6 text-[11px] text-muted-foreground/50">
          © 2025 HeadsApp · All rights reserved
        </p>
      </div>

      {/* Right – Form card */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-[420px] bg-card rounded-2xl shadow-lg border border-border p-8 sm:p-10">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">VerifLab</span>
          </div>

          <div className="text-center mb-8">
            <div className="hidden lg:flex w-12 h-12 rounded-2xl bg-primary/10 items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Sign In</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="py-3">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-muted-foreground">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="h-11 bg-secondary/50 border-border"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-medium text-muted-foreground">Password</Label>
                <button type="button" className="text-[11px] text-primary hover:text-primary/80 font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 pr-10 bg-secondary/50 border-border"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 font-medium text-sm rounded-xl" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in…
                </>
              ) : (
                'LOGIN'
              )}
            </Button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60 mb-3 text-center">
              Quick Access — Demo
            </p>
            <div className="flex gap-2">
              {demoAccounts.map((demo) => {
                const Icon = demo.icon;
                return (
                  <button
                    key={demo.email}
                    type="button"
                    onClick={() => fillDemo(demo.email)}
                    className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-secondary/30 hover:bg-accent hover:border-primary/20 transition-all group"
                  >
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground">{demo.label}</span>
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
