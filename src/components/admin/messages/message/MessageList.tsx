
import React from 'react';
import { ContactMessage } from '@/utils/supabase/types';
import MessageItem from './MessageItem';
import { EmptyState } from '@/components/admin/messages/subscription';

interface MessageListProps {
  messages: ContactMessage[];
  onReply: (message: ContactMessage) => void;
  onMarkAsRead: (messageId: string | number) => void;
  onDelete: (messageId: string | number) => void;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  onReply, 
  onMarkAsRead, 
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

  if (messages.length === 0) {
    return <EmptyState message="Nenhuma mensagem encontrada." />;
  }

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          onReply={onReply}
          onMarkAsRead={onMarkAsRead}
          onDelete={onDelete}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
};

export default MessageList;
