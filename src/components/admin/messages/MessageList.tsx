
import React from 'react';
import { Mail, Check, Trash } from 'lucide-react';
import { ContactMessage } from '@/utils/supabase/types';
import { Button } from '@/components/ui/button';

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
    return <p className="text-gray-500">Nenhuma mensagem encontrada.</p>;
  }

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`border rounded-lg p-4 transition-colors ${!message.read ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}
        >
          <div className="flex justify-between mb-3">
            <div>
              <h3 className="font-medium text-gray-800 flex items-center">
                {message.firstname} {message.lastname}
                {!message.read && (
                  <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">
                    Nova
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-600">
                {message.email} | {message.phone || 'Sem telefone'}
              </p>
              <p className="text-xs text-gray-500">
                Recebida em: {formatDate(message.date)}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => onReply(message)}
                variant="outline"
                size="sm"
                className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Mail className="h-4 w-4 mr-1" />
                Responder
              </Button>
              
              {!message.read && (
                <Button
                  onClick={() => onMarkAsRead(message.id)}
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-200 hover:bg-green-50 hover:text-green-700"
                >
                  <Check className="h-4 w-4" />
                </Button>
              )}
              
              <Button
                onClick={() => onDelete(message.id)}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <p className="text-gray-700 border-t border-gray-200 pt-3 mt-2">{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
