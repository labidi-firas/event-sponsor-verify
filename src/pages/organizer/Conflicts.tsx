import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  Users, 
  CheckCircle, 
  XCircle,
  ChevronRight,
  Building2,
  History
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Conflict {
  id: string;
  participant: {
    name: string;
    dateOfBirth: string;
    identityCard: string;
  };
  laboratories: {
    id: string;
    name: string;
    declaredAt: string;
  }[];
  type: 'duplicate' | 'ambiguous';
}

const mockConflicts: Conflict[] = [
  {
    id: '1',
    participant: { name: 'Jean Dupont', dateOfBirth: '15/06/1980', identityCard: 'AB123456' },
    laboratories: [
      { id: '1', name: 'Laboratoire Pasteur', declaredAt: '10/03/2024 09:30' },
      { id: '2', name: 'Pharma Solutions', declaredAt: '10/03/2024 10:15' },
    ],
    type: 'duplicate',
  },
  {
    id: '2',
    participant: { name: 'Marie Martin / Marie Martins', dateOfBirth: '22/03/1975', identityCard: 'CD789012 / CD789013' },
    laboratories: [
      { id: '1', name: 'Laboratoire Pasteur', declaredAt: '10/03/2024 11:00' },
      { id: '3', name: 'MedTech Labs', declaredAt: '10/03/2024 14:20' },
    ],
    type: 'ambiguous',
  },
  {
    id: '3',
    participant: { name: 'Pierre Bernard', dateOfBirth: '08/11/1982', identityCard: 'EF345678' },
    laboratories: [
      { id: '2', name: 'Pharma Solutions', declaredAt: '09/03/2024 16:45' },
      { id: '3', name: 'MedTech Labs', declaredAt: '10/03/2024 08:00' },
    ],
    type: 'duplicate',
  },
];

export default function Conflicts() {
  const [selectedConflict, setSelectedConflict] = useState<Conflict | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleResolve = (labId: string) => {
    toast.success(`Conflit résolu en faveur du laboratoire sélectionné`);
    setIsDialogOpen(false);
  };

  const handleRejectAll = () => {
    toast.error('Toutes les déclarations ont été rejetées');
    setIsDialogOpen(false);
  };

  return (
    <AppLayout 
      title="Résolution des conflits"
      subtitle="Gérez les déclarations en conflit entre laboratoires"
    >
      <div className="space-y-6 animate-fade-in-up">
        {/* Summary */}
        <div className="flex items-center gap-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <AlertTriangle className="w-6 h-6 text-warning" />
          <div>
            <p className="font-medium">3 conflits nécessitent votre attention</p>
            <p className="text-sm text-muted-foreground">
              Des participants ont été déclarés par plusieurs laboratoires
            </p>
          </div>
        </div>

        {/* Conflicts List */}
        <div className="space-y-4">
          {mockConflicts.map((conflict) => (
            <Card 
              key={conflict.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => { setSelectedConflict(conflict); setIsDialogOpen(true); }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-warning" />
                    </div>
                    <div>
                      <p className="font-medium">{conflict.participant.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {conflict.participant.dateOfBirth} • {conflict.participant.identityCard}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge variant={conflict.type === 'duplicate' ? 'destructive' : 'secondary'}>
                      {conflict.type === 'duplicate' ? 'Doublon' : 'Ambigu'}
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        {conflict.laboratories.length} laboratoires
                      </p>
                      <div className="flex gap-1 mt-1">
                        {conflict.laboratories.map((lab) => (
                          <div 
                            key={lab.id}
                            className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center"
                            title={lab.name}
                          >
                            <Building2 className="w-3 h-3 text-primary" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Resolution Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Résoudre le conflit</DialogTitle>
              <DialogDescription>
                Sélectionnez le laboratoire dont la déclaration doit être conservée
              </DialogDescription>
            </DialogHeader>

            {selectedConflict && (
              <div className="space-y-6">
                {/* Participant Info */}
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">{selectedConflict.participant.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Né(e) le {selectedConflict.participant.dateOfBirth} • 
                    CI: {selectedConflict.participant.identityCard}
                  </p>
                </div>

                {/* Laboratories */}
                <div className="space-y-3">
                  {selectedConflict.laboratories.map((lab) => (
                    <div 
                      key={lab.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{lab.name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <History className="w-3 h-3" />
                            Déclaré le {lab.declaredAt}
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleResolve(lab.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Conserver
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-4 border-t">
                  <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button variant="destructive" onClick={handleRejectAll}>
                    <XCircle className="w-4 h-4 mr-2" />
                    Rejeter toutes les déclarations
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
