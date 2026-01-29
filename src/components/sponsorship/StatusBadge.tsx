import { cn } from '@/lib/utils';
import { CheckCircle, Clock, XCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'validated' | 'pending' | 'rejected';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    validated: {
      label: 'Validé',
      icon: CheckCircle,
      class: 'status-validated',
    },
    pending: {
      label: 'En attente',
      icon: Clock,
      class: 'status-pending',
    },
    rejected: {
      label: 'Rejeté',
      icon: XCircle,
      class: 'status-rejected',
    },
  };

  const { label, icon: Icon, class: statusClass } = config[status];

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
      statusClass
    )}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
