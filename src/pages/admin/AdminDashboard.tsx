import { AppLayout } from '@/components/layout/AppLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Server, 
  Users, 
  Activity, 
  Shield,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function AdminDashboard() {
  const systemHealth = [
    { name: 'API Response Time', value: 45, unit: 'ms', status: 'healthy' },
    { name: 'Database Load', value: 23, unit: '%', status: 'healthy' },
    { name: 'AI Processing Queue', value: 3, unit: 'items', status: 'healthy' },
    { name: 'Storage Usage', value: 67, unit: '%', status: 'warning' },
  ];

  const recentUsers = [
    { name: 'Dr. Marie Dupont', role: 'Laboratoire', lastActive: 'Il y a 5 min' },
    { name: 'Jean Martin', role: 'Organisateur', lastActive: 'Il y a 12 min' },
    { name: 'Sophie Bernard', role: 'Admin', lastActive: 'En ligne' },
  ];

  return (
    <AppLayout 
      title="Administration système"
      subtitle="Surveillance et configuration du système"
    >
      <div className="space-y-6 animate-fade-in-up">
        {/* System KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Utilisateurs actifs"
            value={24}
            icon={<Users className="w-6 h-6" />}
            variant="default"
            subtitle="Aujourd'hui"
          />
          <KPICard
            title="Requêtes/heure"
            value="1.2k"
            icon={<Activity className="w-6 h-6" />}
            variant="default"
            trend={{ value: 8, isPositive: true }}
          />
          <KPICard
            title="Disponibilité"
            value="99.9%"
            icon={<Server className="w-6 h-6" />}
            variant="success"
            subtitle="30 derniers jours"
          />
          <KPICard
            title="Alertes sécurité"
            value={0}
            icon={<Shield className="w-6 h-6" />}
            variant="success"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                Santé du système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemHealth.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{metric.name}</span>
                    <div className="flex items-center gap-2">
                      {metric.status === 'healthy' ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-warning" />
                      )}
                      <span className="font-medium">
                        {metric.value} {metric.unit}
                      </span>
                    </div>
                  </div>
                  <Progress 
                    value={metric.name.includes('Queue') ? 30 : metric.value} 
                    className="h-2" 
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Active Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Utilisateurs récents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentUsers.map((user) => (
                <div 
                  key={user.name}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {user.lastActive === 'En ligne' ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-success" />
                        <span className="text-success">{user.lastActive}</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3 h-3" />
                        {user.lastActive}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
