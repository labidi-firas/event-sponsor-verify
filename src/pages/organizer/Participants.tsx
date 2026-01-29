import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  Users,
  Calendar,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

const mockOfficialParticipants = [
  { id: '1', firstName: 'Jean', lastName: 'Dupont', dateOfBirth: '15/06/1980', identityCard: 'AB123456', specialty: 'Cardiologie' },
  { id: '2', firstName: 'Marie', lastName: 'Martins', dateOfBirth: '22/03/1975', identityCard: 'CD789013', specialty: 'Dermatologie' },
  { id: '3', firstName: 'Sophie', lastName: 'Leroy', dateOfBirth: '03/09/1978', identityCard: 'GH901234', specialty: 'Cardiologie' },
  { id: '4', firstName: 'Francois', lastName: 'Petit', dateOfBirth: '17/12/1985', identityCard: 'IJ567891', specialty: 'Neurologie' },
  { id: '5', firstName: 'Claire', lastName: 'Moreau', dateOfBirth: '29/07/1990', identityCard: 'KL234567', specialty: 'Pédiatrie' },
];

export default function Participants() {
  const [hasImported, setHasImported] = useState(true);
  const [search, setSearch] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const filteredParticipants = mockOfficialParticipants.filter(p =>
    `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    p.identityCard.toLowerCase().includes(search.toLowerCase())
  );

  const handleFileUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setHasImported(true);
      toast.success('Liste officielle importée avec succès');
    }, 2000);
  };

  return (
    <AppLayout 
      title="Participants officiels"
      subtitle="Gérez la liste des inscrits à l'événement"
    >
      <div className="space-y-6 animate-fade-in-up">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1,250</p>
                  <p className="text-sm text-muted-foreground">Participants inscrits</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-success/10">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-muted-foreground">Données complètes</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-warning/10">
                  <Calendar className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">10 Mars</p>
                  <p className="text-sm text-muted-foreground">Dernière mise à jour</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Import Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5" />
              Importer la liste officielle
            </CardTitle>
            <CardDescription>
              Téléversez la liste des participants inscrits à l'événement
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isUploading ? (
              <div className="py-8 space-y-4">
                <p className="text-center text-muted-foreground">Import en cours...</p>
                <Progress value={65} className="w-full max-w-md mx-auto" />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <label className="flex-1 flex items-center justify-center py-8 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-primary">Cliquez pour sélectionner</span> ou glissez un fichier
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">XLSX, XLS ou CSV</p>
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            )}

            {hasImported && (
              <div className="mt-4 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium">Liste importée</p>
                  <p className="text-sm text-muted-foreground">1,250 participants chargés</p>
                </div>
                <Badge variant="outline" className="ml-auto">Congrès National de Cardiologie 2024</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Participants Table */}
        {hasImported && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Liste des participants</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Rechercher..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead>Nom</TableHead>
                      <TableHead>Prénom</TableHead>
                      <TableHead>Date de naissance</TableHead>
                      <TableHead>Carte d'identité</TableHead>
                      <TableHead>Spécialité</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParticipants.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell className="font-medium">{p.lastName}</TableCell>
                        <TableCell>{p.firstName}</TableCell>
                        <TableCell>{p.dateOfBirth}</TableCell>
                        <TableCell className="font-mono text-sm">{p.identityCard}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{p.specialty}</Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Affichage de {filteredParticipants.length} sur 1,250 participants
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
