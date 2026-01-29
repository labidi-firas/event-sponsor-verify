import { Sponsorship } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScoreBadge } from './ScoreBadge';
import { StatusBadge } from './StatusBadge';
import { Button } from '@/components/ui/button';
import { Eye, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

interface SponsorshipTableProps {
  sponsorships: Sponsorship[];
  onViewDetails: (sponsorship: Sponsorship) => void;
}

export function SponsorshipTable({ sponsorships, onViewDetails }: SponsorshipTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [scoreFilter, setScoreFilter] = useState<string>('all');

  const filteredSponsorships = sponsorships.filter((s) => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (scoreFilter === 'high' && s.similarityScore < 85) return false;
    if (scoreFilter === 'medium' && (s.similarityScore < 60 || s.similarityScore >= 85)) return false;
    if (scoreFilter === 'low' && s.similarityScore >= 60) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-4 p-4 bg-card rounded-lg border">
        <Filter className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Filtrer par:</span>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="validated">Validé</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="rejected">Rejeté</SelectItem>
          </SelectContent>
        </Select>

        <Select value={scoreFilter} onValueChange={setScoreFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Score" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les scores</SelectItem>
            <SelectItem value="high">Élevé (≥85%)</SelectItem>
            <SelectItem value="medium">Moyen (60-84%)</SelectItem>
            <SelectItem value="low">Faible (&lt;60%)</SelectItem>
          </SelectContent>
        </Select>

        <span className="ml-auto text-sm text-muted-foreground">
          {filteredSponsorships.length} résultat(s)
        </span>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Nom</TableHead>
              <TableHead>Date de naissance</TableHead>
              <TableHead>Carte d'identité</TableHead>
              <TableHead>Score IA</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSponsorships.map((sponsorship) => (
              <TableRow 
                key={sponsorship.id}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => onViewDetails(sponsorship)}
              >
                <TableCell className="font-medium">
                  {sponsorship.participant.firstName} {sponsorship.participant.lastName}
                </TableCell>
                <TableCell>{sponsorship.participant.dateOfBirth}</TableCell>
                <TableCell className="font-mono text-sm">
                  {sponsorship.participant.identityCard}
                </TableCell>
                <TableCell>
                  <ScoreBadge score={sponsorship.similarityScore} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={sponsorship.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(sponsorship);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Détails
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredSponsorships.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            Aucune déclaration ne correspond aux filtres sélectionnés.
          </div>
        )}
      </div>
    </div>
  );
}
