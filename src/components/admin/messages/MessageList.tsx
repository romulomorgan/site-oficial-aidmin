
import React from 'react';
import { Mail, Check, Trash } from 'lucide-react';
import { ContactMessage } from '@/utils/supabase/types';

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
          className={`border rounded-lg p-4 transition-colors ${!message.read ? 'bg-blue-50' : ''}`}
        >
          <div className="flex justify-between mb-3">
            <div>
              <h3 className="font-medium flex items-center">
                {message.firstname} {message.lastname}
                {!message.read && (
                  <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                    Nova
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-500">
                {message.email} | {message.phone}
              </p>
              <p className="text-xs text-gray-400">
                Recebida em: {formatDate(message.date)}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onReply(message)}
                className="text-blue-500 hover:text-blue-700 transition-colors flex items-center"
                title="Responder"
              >
                <Mail className="h-5 w-5 mr-1" />
                Responder
              </button>
              
              {!message.read && (
                <button
                  onClick={() => onMarkAsRead(message.id)}
                  className="text-green-500 hover:text-green-700 transition-colors"
                  title="Marcar como lida"
                >
                  <Check className="h-5 w-5" />
                </button>
              )}
              
              <button
                onClick={() => onDelete(message.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
                aria-label="Excluir mensagem"
              >
                <Trash className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className="text-gray-700 border-t pt-3 mt-2">{message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
