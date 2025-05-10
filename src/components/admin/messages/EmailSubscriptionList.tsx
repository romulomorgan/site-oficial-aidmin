
import React from 'react';
import { Trash } from 'lucide-react';
import { EmailSubscription } from '@/utils/supabase/types';

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
    return <p className="text-gray-500">Nenhuma inscrição encontrada.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="py-2 px-4 text-left border-b">Email</th>
            <th className="py-2 px-4 text-left border-b">Data</th>
            <th className="py-2 px-4 text-left border-b">Origem</th>
            <th className="py-2 px-4 text-right border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{subscription.email}</td>
              <td className="py-2 px-4 border-b">{formatDate(subscription.created_at)}</td>
              <td className="py-2 px-4 border-b">{subscription.source}</td>
              <td className="py-2 px-4 border-b text-right">
                <button
                  onClick={() => onDelete(subscription.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  aria-label="Excluir inscrição"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailSubscriptionList;
