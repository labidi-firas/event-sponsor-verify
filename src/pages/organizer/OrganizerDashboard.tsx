import { AppLayout } from '@/components/layout/AppLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Building2, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Upload
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

export default function OrganizerDashboard() {
  const navigate = useNavigate();

  const labStats = [
    { name: 'Laboratoire Pasteur', total: 48, validated: 32, pending: 12, rejected: 4, rate: 67 },
    { name: 'Pharma Solutions', total: 35, validated: 28, pending: 5, rejected: 2, rate: 80 },
    { name: 'MedTech Labs', total: 22, validated: 18, pending: 3, rejected: 1, rate: 82 },
  ];

  return (
    <AppLayout 
      title="Tableau de bord organisateur"
      subtitle="Vue d'ensemble de tous les laboratoires"
    >
      <div className="space-y-6 animate-fade-in-up">
        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button onClick={() => navigate('/organizer/participants')}>
            <Upload className="w-4 h-4 mr-2" />
            Importer la liste officielle
          </Button>
          <Button variant="outline" onClick={() => navigate('/organizer/conflicts')}>
            <AlertTriangle className="w-4 h-4 mr-2" />
            Voir les conflits (3)
          </Button>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Laboratoires actifs"
            value={3}
            icon={<Building2 className="w-6 h-6" />}
            variant="default"
          />
          <KPICard
            title="Total déclarations"
            value={105}
            icon={<Users className="w-6 h-6" />}
            variant="default"
          />
          <KPICard
            title="Conflits détectés"
            value={3}
            icon={<AlertTriangle className="w-6 h-6" />}
            variant="warning"
          />
          <KPICard
            title="Taux validation global"
            value="74%"
            icon={<TrendingUp className="w-6 h-6" />}
            variant="success"
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        {/* Labs Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Statut par laboratoire</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {labStats.map((lab) => (
              <div key={lab.name} className="space-y-3 p-4 rounded-lg border bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{lab.name}</p>
                      <p className="text-sm text-muted-foreground">{lab.total} déclarations</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-success">{lab.rate}%</p>
                    <p className="text-xs text-muted-foreground">taux de validation</p>
                  </div>
                </div>

                <Progress value={lab.rate} className="h-2" />

                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-muted-foreground">{lab.validated} validés</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-warning" />
                    <span className="text-muted-foreground">{lab.pending} en attente</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-muted-foreground">{lab.rejected} rejetés</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
