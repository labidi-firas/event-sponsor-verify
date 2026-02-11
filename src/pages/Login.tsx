import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Loader2, AlertCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react';
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
    { label: 'Laboratory', email: 'lab@example.com', desc: 'Manage declarations & events' },
    { label: 'Participant', email: 'participant@example.com', desc: 'Browse events & register' },
    { label: 'Administrator', email: 'admin@example.com', desc: 'Full platform oversight' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-[960px] grid lg:grid-cols-2 rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
        {/* Left – Branding */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-primary text-primary-foreground">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center">
              <Shield className="w-[18px] h-[18px]" />
            </div>
            <span className="text-lg font-bold tracking-tight">VerifLab</span>
          </div>

          <div className="space-y-5">
            <h2 className="text-3xl font-bold leading-snug">
              Intelligent Sponsorship Verification
            </h2>
            <p className="text-primary-foreground/70 leading-relaxed">
              Secure platform for managing and verifying sponsorship declarations for medical events — powered by AI scoring.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: '98%', label: 'AI Accuracy' },
                { value: '2k+', label: 'Events' },
                { value: '50k+', label: 'Participants' },
              ].map((s) => (
                <div key={s.label} className="rounded-lg bg-primary-foreground/10 p-3 text-center">
                  <p className="text-xl font-bold">{s.value}</p>
                  <p className="text-[11px] text-primary-foreground/60 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-primary-foreground/40">© 2025 HeadsApp · All rights reserved</p>
        </div>

        {/* Right – Form */}
        <div className="flex flex-col justify-center p-8 sm:p-10">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-[18px] h-[18px] text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">VerifLab</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">Sign in to your account</h1>
            <p className="text-sm text-muted-foreground mt-1">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="h-11 pl-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-xs font-medium">Password</Label>
                <button type="button" className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-11 pl-9 pr-10"
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

            <Button type="submit" className="w-full h-11" disabled={isLoading}>
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
          <div className="mt-8 space-y-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-card px-3 text-muted-foreground">Demo accounts</span>
              </div>
            </div>
            <div className="space-y-2">
              {demoAccounts.map((demo) => (
                <button
                  key={demo.email}
                  type="button"
                  onClick={() => fillDemo(demo.email)}
                  className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors text-left"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{demo.label}</p>
                    <p className="text-xs text-muted-foreground">{demo.desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground font-mono">{demo.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
