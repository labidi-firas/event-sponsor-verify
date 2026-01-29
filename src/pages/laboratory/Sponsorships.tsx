import { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SponsorshipTable } from '@/components/sponsorship/SponsorshipTable';
import { MatchComparison } from '@/components/sponsorship/MatchComparison';
import { mockSponsorships, mockEvents } from '@/data/mockData';
import { Sponsorship } from '@/types';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Plus, Upload, ArrowLeft, CheckCircle, XCircle, Edit } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function Sponsorships() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get('eventId');
  
  const [selectedSponsorship, setSelectedSponsorship] = useState<Sponsorship | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const event = mockEvents.find(e => e.id === eventId) || mockEvents[0];

  const handleViewDetails = (sponsorship: Sponsorship) => {
    setSelectedSponsorship(sponsorship);
    setIsDetailOpen(true);
  };

  const handleValidate = () => {
    toast.success('Déclaration validée avec succès');
    setIsDetailOpen(false);
  };

  const handleReject = () => {
    toast.error('Déclaration rejetée');
    setIsDetailOpen(false);
  };

  return (
    <AppLayout 
      title="Déclarations de prise en charge"
      subtitle={event.name}
    >
      <div className="space-y-6 animate-fade-in-up">
        {/* Header with actions */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/events')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux événements
          </Button>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => navigate('/import')}>
              <Upload className="w-4 h-4 mr-2" />
              Importer
            </Button>
            <Button onClick={() => navigate('/declare')}>
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle déclaration
            </Button>
          </div>
        </div>

        {/* Sponsorship Table */}
        <SponsorshipTable 
          sponsorships={mockSponsorships} 
          onViewDetails={handleViewDetails}
        />

        {/* Detail Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Détail de la déclaration
              </DialogTitle>
            </DialogHeader>

            {selectedSponsorship && (
              <div className="space-y-6">
                <MatchComparison
                  declared={selectedSponsorship.participant}
                  matched={selectedSponsorship.matchedParticipant}
                  matchDetails={selectedSponsorship.matchDetails}
                />

                {/* Actions */}
                {selectedSponsorship.status === 'pending' && (
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>
                    <Button variant="destructive" onClick={handleReject}>
                      <XCircle className="w-4 h-4 mr-2" />
                      Rejeter
                    </Button>
                    <Button onClick={handleValidate}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Valider
                    </Button>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
