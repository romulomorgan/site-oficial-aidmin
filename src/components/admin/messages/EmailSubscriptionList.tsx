
import React from 'react';
import { Trash } from 'lucide-react';
import { EmailSubscription } from '@/utils/supabase/types';
import { Button } from '@/components/ui/button';

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
            <th className="py-2 px-4 text-left border-b text-gray-700">Email</th>
            <th className="py-2 px-4 text-left border-b text-gray-700">Data</th>
            <th className="py-2 px-4 text-left border-b text-gray-700">Origem</th>
            <th className="py-2 px-4 text-right border-b text-gray-700">Ações</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map((subscription) => (
            <tr key={subscription.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-gray-800">{subscription.email}</td>
              <td className="py-2 px-4 border-b text-gray-800">{formatDate(subscription.created_at)}</td>
              <td className="py-2 px-4 border-b text-gray-800">{subscription.source || 'Website'}</td>
              <td className="py-2 px-4 border-b text-right">
                <Button
                  onClick={() => onDelete(subscription.id)}
                  variant="ghost"
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailSubscriptionList;
