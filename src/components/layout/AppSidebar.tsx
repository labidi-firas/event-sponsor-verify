import { useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Upload,
  Users,
  Settings,
  Shield,
  Brain,
  AlertTriangle,
  LogOut,
  Building2,
  ListChecks,
  UserCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
  roles: string[];
}

const navItems: NavItem[] = [
  // Laboratory items
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/dashboard', roles: ['laboratory'] },
  { icon: Calendar, label: 'Événements', path: '/events', roles: ['laboratory'] },
  { icon: FileText, label: 'Déclarations', path: '/sponsorships', roles: ['laboratory'] },
  { icon: Upload, label: 'Importer', path: '/import', roles: ['laboratory'] },
  
  // Participant items
  { icon: Calendar, label: 'Événements', path: '/participant/events', roles: ['participant'] },
  { icon: ListChecks, label: 'Mes inscriptions', path: '/participant/registrations', roles: ['participant'] },
  
  // Admin items
  { icon: LayoutDashboard, label: 'Tableau de bord', path: '/admin/dashboard', roles: ['admin'] },
  { icon: Calendar, label: 'Événements', path: '/admin/events', roles: ['admin'] },
  { icon: UserCheck, label: 'Participants officiels', path: '/admin/participants', roles: ['admin'] },
  { icon: AlertTriangle, label: 'Conflits', path: '/admin/conflicts', roles: ['admin'] },
  { icon: Users, label: 'Utilisateurs', path: '/admin/users', roles: ['admin'] },
  { icon: Brain, label: 'Configuration IA', path: '/admin/ai-config', roles: ['admin'] },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const filteredItems = navItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-64 min-h-screen bg-sidebar text-sidebar-foreground flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-sm">VerifLab</h1>
            <p className="text-xs text-sidebar-foreground/70">Système de vérification</p>
          </div>
        </div>
      </div>

      <Separator className="bg-sidebar-border" />

      {/* User info */}
      {user && (
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sm font-medium">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/70 truncate">
                {user.role === 'laboratory' && user.laboratoryName}
                {user.role === 'participant' && 'Participant'}
                {user.role === 'admin' && 'Administrateur'}
              </p>
            </div>
          </div>
        </div>
      )}

      <Separator className="bg-sidebar-border" />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </Button>
      </div>
    </aside>
  );
}
