import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Loader2, Eye, EyeOff } from 'lucide-react';
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
      setError('Failed to sign in. Please check your credentials.');
    }
    setIsLoading(false);
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative items-center justify-center overflow-hidden bg-[hsl(180,30%,95%)]">
        {/* Logo at top */}
        <div className="absolute top-6 left-8 flex items-center gap-2.5 z-20">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Shield className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground tracking-tight leading-none">VerifLab</p>
            <p className="text-[9px] text-muted-foreground">by HeadsApp</p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-12 right-16 w-48 h-48 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }} />
        <div className="absolute bottom-24 left-12 w-32 h-32 opacity-[0.07]" style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--primary)) 1.5px, transparent 1.5px)',
          backgroundSize: '16px 16px',
        }} />
        <div className="absolute top-20 left-24 text-primary/15 text-3xl font-bold select-none">+</div>
        <div className="absolute bottom-36 right-20 text-primary/10 text-2xl font-bold select-none">+</div>

        {/* Decorative circles */}
        <div className="absolute top-1/4 right-12">
          <svg width="60" height="60" viewBox="0 0 60 60" className="opacity-10">
            <circle cx="30" cy="30" r="28" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
            <circle cx="30" cy="30" r="18" stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" />
            <circle cx="30" cy="30" r="8" fill="hsl(var(--primary))" opacity="0.3" />
          </svg>
        </div>

        {/* Medical Team Illustration Container */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm px-8">
          {/* Illustration Card */}
          <div className="w-72 h-auto rounded-2xl overflow-hidden shadow-xl mb-6 border border-border/30">
            <img
              src={medicalTeam}
              alt="Medical professionals team"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Welcome Text */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">Welcome Back</h2>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[280px]">
              AI-powered compliance platform for managing medical event sponsorship declarations
            </p>
            <p className="text-[10px] text-muted-foreground/40 pt-4">
              © 2025 HeadsApp - All rights reserved
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-[380px]">
          {/* Logo at top of form */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground leading-none">VerifLab</p>
              <p className="text-[9px] text-muted-foreground">by HeadsApp</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mb-5 border-b border-border">
            <button className="px-4 py-2 text-xs font-semibold text-primary border-b-2 border-primary">
              Sign In
            </button>
            <button className="px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sign Up
            </button>
          </div>

          {/* Sign In Card */}
          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            {/* Header */}
            <div className="mb-5">
              <h1 className="text-base font-bold text-foreground">Sign In</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {error && (
                <div className="bg-destructive/10 text-destructive text-xs p-2.5 rounded-lg border border-destructive/20">
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-1">
                <Label htmlFor="email" className="text-[11px] font-medium text-muted-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-8 px-2.5 text-xs"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[11px] font-medium text-muted-foreground">
                    Password
                  </Label>
                  <button type="button" className="text-[10px] text-primary hover:text-primary/80 font-medium">
                    Forgot?
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
                    disabled={isLoading}
                    className="h-8 px-2.5 pr-9 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full h-9 text-xs font-semibold rounded-lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'LOGIN'
                )}
              </Button>
            </form>

            {/* Quick Access Demo Section */}
            <div className="mt-5 pt-4 border-t border-border">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-2.5 text-center">
                QUICK ACCESS — DEMO
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fillDemo('lab@example.com')}
                  className="flex-1 flex flex-col items-center gap-1 p-2.5 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all"
                >
                  <span className="text-base">🔬</span>
                  <span className="text-[10px] font-medium text-primary">Laboratory</span>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('participant@example.com')}
                  className="flex-1 flex flex-col items-center gap-1 p-2.5 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all"
                >
                  <span className="text-base">👤</span>
                  <span className="text-[10px] font-medium text-primary">Participant</span>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemo('admin@example.com')}
                  className="flex-1 flex flex-col items-center gap-1 p-2.5 rounded-lg border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all"
                >
                  <span className="text-base">📊</span>
                  <span className="text-[10px] font-medium text-primary">Admin</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
