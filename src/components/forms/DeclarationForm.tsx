import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Save, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

const declarationSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  dateOfBirth: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Format: JJ/MM/AAAA'),
  identityCard: z.string().min(5, "Numéro de carte d'identité invalide"),
  email: z.string().email('Adresse email invalide'),
  specialty: z.string().min(1, 'Veuillez sélectionner une spécialité'),
});

type DeclarationFormData = z.infer<typeof declarationSchema>;

const specialties = [
  'Cardiologie',
  'Dermatologie',
  'Endocrinologie',
  'Gastro-entérologie',
  'Médecine générale',
  'Neurologie',
  'Oncologie',
  'Pédiatrie',
  'Psychiatrie',
  'Rhumatologie',
];

interface DeclarationFormProps {
  onSubmit: (data: DeclarationFormData) => void;
  onSaveAndContinue?: (data: DeclarationFormData) => void;
}

export function DeclarationForm({ onSubmit, onSaveAndContinue }: DeclarationFormProps) {
  const form = useForm<DeclarationFormData>({
    resolver: zodResolver(declarationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      identityCard: '',
      email: '',
      specialty: '',
    },
  });

  const handleSubmit = (data: DeclarationFormData) => {
    onSubmit(data);
    toast.success('Déclaration enregistrée avec succès');
    form.reset();
  };

  const handleSaveAndContinue = () => {
    form.handleSubmit((data) => {
      if (onSaveAndContinue) {
        onSaveAndContinue(data);
        toast.success('Déclaration enregistrée. Vous pouvez continuer.');
        form.reset();
      }
    })();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Nouvelle déclaration de prise en charge
        </CardTitle>
        <CardDescription>
          Remplissez les informations du participant à déclarer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder="Dupont" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prénom</FormLabel>
                    <FormControl>
                      <Input placeholder="Jean" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de naissance</FormLabel>
                    <FormControl>
                      <Input placeholder="15/06/1980" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="identityCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro de carte d'identité</FormLabel>
                    <FormControl>
                      <Input placeholder="AB123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jean.dupont@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Spécialité médicale</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une spécialité" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              {onSaveAndContinue && (
                <Button type="button" variant="outline" onClick={handleSaveAndContinue}>
                  Enregistrer et continuer
                </Button>
              )}
              <Button type="submit">
                <Save className="w-4 h-4 mr-2" />
                Enregistrer
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
