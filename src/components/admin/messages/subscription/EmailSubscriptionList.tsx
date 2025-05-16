
import React from 'react';
import { EmailSubscription } from '@/utils/supabase/types';
import EmailSubscriptionItem from './EmailSubscriptionItem';
import EmptyState from './EmptyState';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SortField, SortOrder } from '@/hooks/messages/useEmailSubscriptions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EmailSubscriptionListProps {
  subscriptions: EmailSubscription[];
  onDelete: (subscriptionId: string | number) => void;
  sortField?: SortField;
  sortOrder?: SortOrder;
  onSort?: (field: SortField) => void;
}

const EmailSubscriptionList: React.FC<EmailSubscriptionListProps> = ({ 
  subscriptions, 
  onDelete,
  sortField = 'created_at',
  sortOrder = 'desc',
  onSort
}) => {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    
    return sortOrder === 'asc' ? 
      <ChevronUp className="ml-1 h-4 w-4" /> : 
      <ChevronDown className="ml-1 h-4 w-4" />;
  };

  const handleHeaderClick = (field: SortField) => {
    if (onSort) {
      onSort(field);
    }
  };

  if (subscriptions.length === 0) {
    return <EmptyState message="Nenhuma inscrição encontrada." />;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleHeaderClick('email')}
            >
              <div className="flex items-center">
                Email
                {renderSortIcon('email')}
              </div>
            </TableHead>
            
            <TableHead 
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => handleHeaderClick('created_at')}
            >
              <div className="flex items-center">
                Data
                {renderSortIcon('created_at')}
              </div>
            </TableHead>
            
            <TableHead>Origem</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.map((subscription) => (
            <EmailSubscriptionItem
              key={subscription.id}
              subscription={subscription}
              onDelete={onDelete}
              formatDate={formatDate}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmailSubscriptionList;
