import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  UserX, 
  UserCheck,
  Building2,
  Shield,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: 'laboratory' | 'organizer' | 'admin';
  laboratoryName?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  lastLogin?: string;
}

const mockUsers: ManagedUser[] = [
  {
    id: '1',
    name: 'Dr. Marie Dupont',
    email: 'marie.dupont@labo-pasteur.fr',
    role: 'laboratory',
    laboratoryName: 'Laboratoire Pasteur',
    status: 'active',
    createdAt: '2024-01-15',
    lastLogin: '2024-03-10T09:30:00Z',
  },
  {
    id: '2',
    name: 'Jean Martin',
    email: 'jean.martin@events.fr',
    role: 'organizer',
    status: 'active',
    createdAt: '2024-02-01',
    lastLogin: '2024-03-09T14:20:00Z',
  },
  {
    id: '3',
    name: 'Sophie Bernard',
    email: 'sophie.bernard@headsapp.com',
    role: 'admin',
    status: 'active',
    createdAt: '2023-11-20',
    lastLogin: '2024-03-10T08:00:00Z',
  },
  {
    id: '4',
    name: 'Dr. Pierre Leroy',
    email: 'p.leroy@pharma-solutions.fr',
    role: 'laboratory',
    laboratoryName: 'Pharma Solutions',
    status: 'inactive',
    createdAt: '2024-01-20',
  },
];

export default function Users() {
  const [users] = useState<ManagedUser[]>(mockUsers);
  const [search, setSearch] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleBadge = (role: ManagedUser['role']) => {
    const config = {
      laboratory: { label: 'Laboratoire', icon: Building2, class: 'bg-blue-100 text-blue-800' },
      organizer: { label: 'Organisateur', icon: Calendar, class: 'bg-purple-100 text-purple-800' },
      admin: { label: 'Admin', icon: Shield, class: 'bg-amber-100 text-amber-800' },
    };
    const { label, icon: Icon, class: className } = config[role];
    return (
      <Badge variant="outline" className={className}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </Badge>
    );
  };

  const handleToggleStatus = (user: ManagedUser) => {
    const action = user.status === 'active' ? 'désactivé' : 'activé';
    toast.success(`Compte ${action} avec succès`);
  };

  return (
    <AppLayout 
      title="Gestion des utilisateurs"
      subtitle="Créez et gérez les comptes utilisateurs"
    >
      <div className="space-y-6 animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un utilisateur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nouvel utilisateur
          </Button>
        </div>

        {/* Users Table */}
        <div className="border rounded-lg bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Utilisateur</TableHead>
                <TableHead>Rôle</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Dernière connexion</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {getRoleBadge(user.role)}
                      {user.laboratoryName && (
                        <p className="text-xs text-muted-foreground">{user.laboratoryName}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === 'active' ? 'default' : 'secondary'}
                      className={user.status === 'active' ? 'bg-success text-success-foreground' : ''}
                    >
                      {user.status === 'active' ? 'Actif' : 'Inactif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {user.lastLogin 
                      ? new Date(user.lastLogin).toLocaleDateString('fr-FR', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Jamais'
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleToggleStatus(user)}
                      >
                        {user.status === 'active' ? (
                          <UserX className="w-4 h-4 text-destructive" />
                        ) : (
                          <UserCheck className="w-4 h-4 text-success" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Create User Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouvel utilisateur</DialogTitle>
              <DialogDescription>
                Remplissez les informations du nouveau compte
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Prénom</Label>
                  <Input placeholder="Jean" />
                </div>
                <div className="space-y-2">
                  <Label>Nom</Label>
                  <Input placeholder="Dupont" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="jean.dupont@email.com" />
              </div>

              <div className="space-y-2">
                <Label>Rôle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laboratory">Laboratoire</SelectItem>
                    <SelectItem value="organizer">Organisateur</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Laboratoire (si applicable)</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un laboratoire" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pasteur">Laboratoire Pasteur</SelectItem>
                    <SelectItem value="pharma">Pharma Solutions</SelectItem>
                    <SelectItem value="medtech">MedTech Labs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => {
                toast.success('Utilisateur créé avec succès');
                setIsCreateOpen(false);
              }}>
                Créer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
