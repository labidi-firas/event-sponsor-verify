import { AppLayout } from '@/components/layout/AppLayout';
import { KPICard } from '@/components/dashboard/KPICard';
import { AIScoreCard } from '@/components/dashboard/AIScoreCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Button } from '@/components/ui/button';
import { mockDashboardStats, mockActivities } from '@/data/mockData';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Plus, 
  Upload 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LaboratoryDashboard() {
  const navigate = useNavigate();
  const stats = mockDashboardStats;

  return (
    <AppLayout 
      title="Tableau de bord" 
      subtitle="Vue d'ensemble de vos déclarations de prise en charge"
    >
      <div className="space-y-6 animate-fade-in-up">
        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button onClick={() => navigate('/events')}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle déclaration
          </Button>
          <Button variant="outline" onClick={() => navigate('/import')}>
            <Upload className="w-4 h-4 mr-2" />
            Importer un fichier
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total déclarés"
            value={stats.totalDeclared}
            icon={<Users className="w-6 h-6" />}
            variant="default"
          />
          <KPICard
            title="Validés"
            value={stats.validated}
            icon={<CheckCircle className="w-6 h-6" />}
            variant="success"
            trend={{ value: 12, isPositive: true }}
          />
          <KPICard
            title="En attente"
            value={stats.pending}
            icon={<Clock className="w-6 h-6" />}
            variant="warning"
          />
          <KPICard
            title="Rejetés"
            value={stats.rejected}
            icon={<XCircle className="w-6 h-6" />}
            variant="destructive"
            trend={{ value: 3, isPositive: false }}
          />
        </div>

        {/* AI Stats and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIScoreCard
            averageScore={stats.averageScore}
            validationRate={stats.validationRate}
            totalAnalyzed={stats.totalDeclared}
          />
          <RecentActivity activities={mockActivities} />
        </div>
      </div>
    </AppLayout>
  );
}
