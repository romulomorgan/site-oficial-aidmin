
import React from 'react';
import { ContactMessage } from '@/utils/supabase/types';
import MessageItem from './MessageItem';
import MessageSearch from './MessageSearch';
import { EmptyState } from '@/components/admin/messages/subscription';

interface MessageListProps {
  messages: ContactMessage[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onReply: (message: ContactMessage) => void;
  onMarkAsRead: (messageId: string | number) => void;
  onDelete: (messageId: string | number) => void;
}

const MessageList: React.FC<MessageListProps> = ({ 
  messages, 
  searchQuery,
  onSearchChange,
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

  return (
    <div>
      <MessageSearch searchQuery={searchQuery} onSearchChange={onSearchChange} />
      
      {messages.length === 0 ? (
        searchQuery ? (
          <EmptyState message="Nenhuma mensagem encontrada para esta busca." />
        ) : (
          <EmptyState message="Nenhuma mensagem encontrada." />
        )
      ) : (
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
      )}
    </div>
  );
};

export default MessageList;
