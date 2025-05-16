
import React from 'react';
import { Trash } from 'lucide-react';
import { EmailSubscription } from '@/utils/supabase/types';
import { Button } from '@/components/ui/button';

interface EmailSubscriptionItemProps {
  subscription: EmailSubscription;
  onDelete: (id: string | number) => void;
  formatDate: (dateString: string) => string;
}

const EmailSubscriptionItem: React.FC<EmailSubscriptionItemProps> = ({ 
  subscription, 
  onDelete, 
  formatDate 
}) => {
  return (
    <tr className="hover:bg-gray-50">
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
  );
};

export default EmailSubscriptionItem;
