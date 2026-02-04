import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Building2,
  User,
  Calendar,
  FileText,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Conflict {
  id: string;
  participantName: string;
  dateOfBirth: string;
  identityCard: string;
  labs: {
    name: string;
    declaredAt: string;
  }[];
  status: 'pending' | 'resolved';
}

const mockConflicts: Conflict[] = [
  {
    id: '1',
    participantName: 'Dr. Jean Dupont',
    dateOfBirth: '15/06/1980',
    identityCard: 'AB123456',
    labs: [
      { name: 'Laboratoire Pasteur', declaredAt: '10/03/2024 09:30' },
      { name: 'Pharma Solutions', declaredAt: '10/03/2024 10:15' },
    ],
    status: 'pending',
  },
  {
    id: '2',
    participantName: 'Dr. Marie Martin',
    dateOfBirth: '22/03/1975',
    identityCard: 'CD789012',
    labs: [
      { name: 'MedTech Labs', declaredAt: '10/03/2024 11:00' },
      { name: 'Laboratoire Pasteur', declaredAt: '10/03/2024 14:20' },
    ],
    status: 'pending',
  },
  {
    id: '3',
    participantName: 'Dr. Pierre Bernard',
    dateOfBirth: '08/11/1982',
    identityCard: 'EF345678',
    labs: [
      { name: 'Pharma Solutions', declaredAt: '09/03/2024 16:30' },
      { name: 'MedTech Labs', declaredAt: '10/03/2024 08:45' },
      { name: 'Laboratoire Pasteur', declaredAt: '10/03/2024 15:00' },
    ],
    status: 'pending',
  },
];

export default function AdminConflicts() {
  const [conflicts, setConflicts] = useState<Conflict[]>(mockConflicts);
  const [selectedConflict, setSelectedConflict] = useState<Conflict | null>(null);
  const [selectedLab, setSelectedLab] = useState<string | null>(null);

  const handleResolve = (conflictId: string, winningLab: string) => {
    setConflicts(conflicts.map(c => 
      c.id === conflictId ? { ...c, status: 'resolved' as const } : c
    ));
    setSelectedConflict(null);
    setSelectedLab(null);
  };

  const pendingConflicts = conflicts.filter(c => c.status === 'pending');
  const resolvedConflicts = conflicts.filter(c => c.status === 'resolved');

  return (
    <AppLayout 
      title="Résolution des conflits"
      subtitle="Gérez les déclarations multiples pour un même participant"
    >
      <div className="space-y-6 animate-fade-in-up">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-warning/50 bg-warning/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pendingConflicts.length}</p>
                  <p className="text-sm text-muted-foreground">Conflits en attente</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{resolvedConflicts.length}</p>
                  <p className="text-sm text-muted-foreground">Conflits résolus</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Laboratoires impliqués</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Conflicts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Conflits en attente de résolution
            </CardTitle>
            <CardDescription>
              Ces participants ont été déclarés par plusieurs laboratoires
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingConflicts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-success" />
                <p>Aucun conflit en attente</p>
              </div>
            ) : (
              pendingConflicts.map((conflict) => (
                <div 
                  key={conflict.id}
                  className="p-4 border rounded-lg space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <p className="font-medium">{conflict.participantName}</p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {conflict.dateOfBirth}
                          </span>
                          <span className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {conflict.identityCard}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-warning/10 text-warning">
                      {conflict.labs.length} laboratoires
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {conflict.labs.map((lab, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-muted/50 rounded-lg flex items-center gap-3"
                      >
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{lab.name}</p>
                          <p className="text-xs text-muted-foreground">{lab.declaredAt}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => setSelectedConflict(conflict)}
                  >
                    Résoudre ce conflit
                  </Button>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Resolution Dialog */}
        <Dialog open={!!selectedConflict} onOpenChange={() => setSelectedConflict(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Résoudre le conflit</DialogTitle>
              <DialogDescription>
                Sélectionnez le laboratoire qui prend en charge {selectedConflict?.participantName}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4">
              {selectedConflict?.labs.map((lab, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedLab(lab.name)}
                  className={`w-full p-4 border rounded-lg text-left transition-colors ${
                    selectedLab === lab.name 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      selectedLab === lab.name 
                        ? 'border-primary bg-primary' 
                        : 'border-muted-foreground'
                    }`} />
                    <div>
                      <p className="font-medium">{lab.name}</p>
                      <p className="text-sm text-muted-foreground">Déclaré le {lab.declaredAt}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedConflict(null)}>
                Annuler
              </Button>
              <Button 
                onClick={() => selectedConflict && selectedLab && handleResolve(selectedConflict.id, selectedLab)}
                disabled={!selectedLab}
              >
                Confirmer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
