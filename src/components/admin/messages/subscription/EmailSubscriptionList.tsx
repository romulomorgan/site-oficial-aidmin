
import React from 'react';
import { EmailSubscription } from '@/utils/supabase/types';
import EmailSubscriptionItem from './EmailSubscriptionItem';
import EmptyState from './EmptyState';

interface EmailSubscriptionListProps {
  subscriptions: EmailSubscription[];
  onDelete: (subscriptionId: string | number) => void;
}

const EmailSubscriptionList: React.FC<EmailSubscriptionListProps> = ({ 
  subscriptions, 
  onDelete 
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

  if (subscriptions.length === 0) {
    return <EmptyState message="Nenhuma inscrição encontrada." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-2 px-4 text-left border-b text-gray-700">Email</th>
            <th className="py-2 px-4 text-left border-b text-gray-700">Data</th>
            <th className="py-2 px-4 text-left border-b text-gray-700">Origem</th>
            <th className="py-2 px-4 text-right border-b text-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <EmailSubscriptionItem
              key={subscription.id}
              subscription={subscription}
              onDelete={onDelete}
              formatDate={formatDate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailSubscriptionList;
