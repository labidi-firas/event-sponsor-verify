import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  ArrowLeft, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type ImportStep = 'upload' | 'mapping' | 'preview' | 'complete';

const mockColumns = ['Colonne A', 'Colonne B', 'Colonne C', 'Colonne D', 'Colonne E', 'Colonne F'];
const requiredFields = [
  { id: 'lastName', label: 'Nom', required: true },
  { id: 'firstName', label: 'Prénom', required: true },
  { id: 'dateOfBirth', label: 'Date de naissance', required: true },
  { id: 'identityCard', label: "Carte d'identité", required: true },
  { id: 'email', label: 'Email', required: false },
  { id: 'specialty', label: 'Spécialité', required: false },
];

const mockPreviewData = [
  { lastName: 'Dupont', firstName: 'Jean', dateOfBirth: '15/06/1980', identityCard: 'AB123456', email: 'jean@email.com', specialty: 'Cardiologie', valid: true },
  { lastName: 'Martin', firstName: 'Marie', dateOfBirth: '22/03/1975', identityCard: 'CD789012', email: 'marie@email.com', specialty: 'Dermatologie', valid: true },
  { lastName: '', firstName: 'Pierre', dateOfBirth: '08/11/1982', identityCard: 'EF345678', email: '', specialty: 'Oncologie', valid: false },
  { lastName: 'Leroy', firstName: 'Sophie', dateOfBirth: '03/09/1978', identityCard: 'GH901234', email: 'sophie@email.com', specialty: '', valid: true },
];

export default function Import() {
  const navigate = useNavigate();
  const [step, setStep] = useState<ImportStep>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setIsUploading(true);
      // Simulate upload
      setTimeout(() => {
        setIsUploading(false);
        setStep('mapping');
      }, 1500);
    }
  };

  const handleMappingChange = (fieldId: string, column: string) => {
    setColumnMapping(prev => ({ ...prev, [fieldId]: column }));
  };

  const canProceedToPreview = requiredFields
    .filter(f => f.required)
    .every(f => columnMapping[f.id]);

  const handleConfirmImport = () => {
    setStep('complete');
  };

  const stepProgress = {
    upload: 25,
    mapping: 50,
    preview: 75,
    complete: 100,
  };

  return (
    <AppLayout 
      title="Importer des déclarations"
      subtitle="Importez un fichier Excel ou CSV"
    >
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in-up">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className={step === 'upload' ? 'text-primary font-medium' : 'text-muted-foreground'}>
              1. Téléverser
            </span>
            <span className={step === 'mapping' ? 'text-primary font-medium' : 'text-muted-foreground'}>
              2. Mapper
            </span>
            <span className={step === 'preview' ? 'text-primary font-medium' : 'text-muted-foreground'}>
              3. Vérifier
            </span>
            <span className={step === 'complete' ? 'text-primary font-medium' : 'text-muted-foreground'}>
              4. Terminé
            </span>
          </div>
          <Progress value={stepProgress[step]} className="h-2" />
        </div>

        {/* Step: Upload */}
        {step === 'upload' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5" />
                Sélectionnez votre fichier
              </CardTitle>
              <CardDescription>
                Formats acceptés : Excel (.xlsx, .xls) ou CSV
              </CardDescription>
            </CardHeader>
            <CardContent>
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted transition-colors">
                <div className="flex flex-col items-center justify-center py-6">
                  {isUploading ? (
                    <>
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-3" />
                      <p className="text-sm text-muted-foreground">Chargement en cours...</p>
                    </>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-primary">Cliquez pour sélectionner</span> ou glissez-déposez
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        XLSX, XLS ou CSV (max. 10MB)
                      </p>
                    </>
                  )}
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileSelect}
                />
              </label>
            </CardContent>
          </Card>
        )}

        {/* Step: Mapping */}
        {step === 'mapping' && (
          <Card>
            <CardHeader>
              <CardTitle>Mapper les colonnes</CardTitle>
              <CardDescription>
                Associez les colonnes de votre fichier aux champs requis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {file && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg mb-4">
                  <FileSpreadsheet className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">{file.name}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="ml-auto"
                    onClick={() => { setFile(null); setStep('upload'); }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              <div className="space-y-3">
                {requiredFields.map((field) => (
                  <div key={field.id} className="flex items-center gap-4">
                    <div className="w-48 flex items-center gap-2">
                      <span className="text-sm font-medium">{field.label}</span>
                      {field.required && (
                        <Badge variant="secondary" className="text-xs">Requis</Badge>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    <Select 
                      value={columnMapping[field.id] || ''} 
                      onValueChange={(v) => handleMappingChange(field.id, v)}
                    >
                      <SelectTrigger className="w-64">
                        <SelectValue placeholder="Sélectionnez une colonne" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockColumns.map((col) => (
                          <SelectItem key={col} value={col}>{col}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {columnMapping[field.id] && (
                      <CheckCircle className="w-4 h-4 text-success" />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  onClick={() => setStep('preview')}
                  disabled={!canProceedToPreview}
                >
                  Continuer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step: Preview */}
        {step === 'preview' && (
          <Card>
            <CardHeader>
              <CardTitle>Vérifier les données</CardTitle>
              <CardDescription>
                Vérifiez les données avant l'import. Les lignes en rouge contiennent des erreurs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden mb-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Nom</TableHead>
                      <TableHead>Prénom</TableHead>
                      <TableHead>Date de naissance</TableHead>
                      <TableHead>Carte d'identité</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Spécialité</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPreviewData.map((row, idx) => (
                      <TableRow 
                        key={idx}
                        className={cn(!row.valid && 'bg-destructive/10')}
                      >
                        <TableCell>
                          {row.valid ? (
                            <CheckCircle className="w-4 h-4 text-success" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-destructive" />
                          )}
                        </TableCell>
                        <TableCell className={cn(!row.lastName && 'text-destructive font-medium')}>
                          {row.lastName || '(manquant)'}
                        </TableCell>
                        <TableCell>{row.firstName}</TableCell>
                        <TableCell>{row.dateOfBirth}</TableCell>
                        <TableCell className="font-mono text-sm">{row.identityCard}</TableCell>
                        <TableCell>{row.email || '-'}</TableCell>
                        <TableCell>{row.specialty || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  <span className="text-success font-medium">3</span> valides, {' '}
                  <span className="text-destructive font-medium">1</span> avec erreurs
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep('mapping')}>
                    Retour
                  </Button>
                  <Button onClick={handleConfirmImport}>
                    Importer 3 déclarations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step: Complete */}
        {step === 'complete' && (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <h2 className="text-xl font-semibold mb-2">Import réussi !</h2>
                <p className="text-muted-foreground mb-6">
                  3 déclarations ont été importées avec succès.
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={() => { setStep('upload'); setFile(null); }}>
                    Importer un autre fichier
                  </Button>
                  <Button onClick={() => navigate('/sponsorships')}>
                    Voir les déclarations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
