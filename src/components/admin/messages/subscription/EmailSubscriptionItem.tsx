
import React from 'react';
import { Trash } from 'lucide-react';
import { EmailSubscription } from '@/utils/supabase/types';
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from "@/components/ui/table";

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
    <TableRow className="hover:bg-gray-50">
      <TableCell>{subscription.email}</TableCell>
      <TableCell>{formatDate(subscription.created_at)}</TableCell>
      <TableCell>{subscription.source || 'Website'}</TableCell>
      <TableCell className="text-right">
        <Button
          onClick={() => onDelete(subscription.id)}
          variant="ghost"
          className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
          size="sm"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EmailSubscriptionItem;
