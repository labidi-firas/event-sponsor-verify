import { AppLayout } from '@/components/layout/AppLayout';
import { DeclarationForm } from '@/components/forms/DeclarationForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Declare() {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log('Declaration submitted:', data);
    navigate('/sponsorships');
  };

  const handleSaveAndContinue = (data: any) => {
    console.log('Declaration saved, continuing:', data);
  };

  return (
    <AppLayout 
      title="Déclarer une prise en charge"
      subtitle="Saisissez les informations du participant"
    >
      <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <DeclarationForm 
          onSubmit={handleSubmit}
          onSaveAndContinue={handleSaveAndContinue}
        />
      </div>
    </AppLayout>
  );
}
