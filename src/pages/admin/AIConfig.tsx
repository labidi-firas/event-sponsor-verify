import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  Brain, 
  Info, 
  Save,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

export default function AIConfig() {
  const [settings, setSettings] = useState({
    autoValidationThreshold: 85,
    warningThreshold: 60,
    rejectThreshold: 40,
    autoValidationEnabled: true,
    fuzzyMatchingEnabled: true,
    accentInsensitive: true,
    maxProcessingTime: 30,
  });

  const handleSave = () => {
    toast.success('Configuration IA sauvegardée');
  };

  const handleReset = () => {
    setSettings({
      autoValidationThreshold: 85,
      warningThreshold: 60,
      rejectThreshold: 40,
      autoValidationEnabled: true,
      fuzzyMatchingEnabled: true,
      accentInsensitive: true,
      maxProcessingTime: 30,
    });
    toast.info('Configuration réinitialisée aux valeurs par défaut');
  };

  return (
    <AppLayout 
      title="Configuration IA"
      subtitle="Paramétrage des algorithmes de correspondance"
    >
      <div className="max-w-3xl space-y-6 animate-fade-in-up">
        {/* Warning */}
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Modifier ces paramètres affectera immédiatement le comportement de l'IA pour toutes les nouvelles vérifications.
          </AlertDescription>
        </Alert>

        {/* Thresholds */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Seuils de validation
            </CardTitle>
            <CardDescription>
              Définissez les scores de similarité pour chaque décision
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Auto Validation Threshold */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-base font-medium">Seuil de validation automatique</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Les déclarations avec un score supérieur ou égal à ce seuil seront automatiquement validées.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-lg font-bold text-success">{settings.autoValidationThreshold}%</span>
              </div>
              <Slider
                value={[settings.autoValidationThreshold]}
                onValueChange={([value]) => setSettings(s => ({ ...s, autoValidationThreshold: value }))}
                max={100}
                min={50}
                step={5}
                className="py-2"
              />
              <p className="text-sm text-muted-foreground">
                Score ≥ {settings.autoValidationThreshold}% → Validation automatique (vert)
              </p>
            </div>

            {/* Warning Threshold */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-base font-medium">Seuil d'avertissement</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Les déclarations entre ce seuil et le seuil de validation nécessitent une vérification manuelle.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-lg font-bold text-warning">{settings.warningThreshold}%</span>
              </div>
              <Slider
                value={[settings.warningThreshold]}
                onValueChange={([value]) => setSettings(s => ({ ...s, warningThreshold: value }))}
                max={settings.autoValidationThreshold - 5}
                min={30}
                step={5}
                className="py-2"
              />
              <p className="text-sm text-muted-foreground">
                Score {settings.warningThreshold}% - {settings.autoValidationThreshold - 1}% → Vérification manuelle (orange)
              </p>
            </div>

            {/* Reject Threshold */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Label className="text-base font-medium">Seuil de rejet</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>Les déclarations avec un score inférieur à ce seuil seront automatiquement marquées comme non trouvées.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <span className="text-lg font-bold text-destructive">{settings.rejectThreshold}%</span>
              </div>
              <Slider
                value={[settings.rejectThreshold]}
                onValueChange={([value]) => setSettings(s => ({ ...s, rejectThreshold: value }))}
                max={settings.warningThreshold - 5}
                min={10}
                step={5}
                className="py-2"
              />
              <p className="text-sm text-muted-foreground">
                Score &lt; {settings.rejectThreshold}% → Rejet automatique (rouge)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Matching Options */}
        <Card>
          <CardHeader>
            <CardTitle>Options de correspondance</CardTitle>
            <CardDescription>
              Configurez le comportement de l'algorithme de matching
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Validation automatique</Label>
                <p className="text-sm text-muted-foreground">
                  Activer la validation automatique pour les scores élevés
                </p>
              </div>
              <Switch
                checked={settings.autoValidationEnabled}
                onCheckedChange={(checked) => setSettings(s => ({ ...s, autoValidationEnabled: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Correspondance approximative</Label>
                <p className="text-sm text-muted-foreground">
                  Tolérer les fautes de frappe mineures dans les noms
                </p>
              </div>
              <Switch
                checked={settings.fuzzyMatchingEnabled}
                onCheckedChange={(checked) => setSettings(s => ({ ...s, fuzzyMatchingEnabled: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Insensible aux accents</Label>
                <p className="text-sm text-muted-foreground">
                  Ignorer les différences d'accentuation (é = e)
                </p>
              </div>
              <Switch
                checked={settings.accentInsensitive}
                onCheckedChange={(checked) => setSettings(s => ({ ...s, accentInsensitive: checked }))}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-base">Temps de traitement maximum</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-4 h-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Temps maximum en secondes pour analyser une déclaration avant timeout.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  value={settings.maxProcessingTime}
                  onChange={(e) => setSettings(s => ({ ...s, maxProcessingTime: parseInt(e.target.value) || 30 }))}
                  className="w-24"
                  min={5}
                  max={120}
                />
                <span className="text-sm text-muted-foreground">secondes</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Réinitialiser
          </Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
