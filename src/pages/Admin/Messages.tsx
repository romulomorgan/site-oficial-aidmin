
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ContactMessage } from '@/utils/supabase/types';
import MessageList from '@/components/admin/messages/MessageList';
import ReplyDialog from '@/components/admin/messages/ReplyDialog';
import ConfirmDeleteDialog from '@/components/admin/messages/ConfirmDeleteDialog';
import { useMessagesData } from '@/hooks/useMessagesData';

export default function Messages() {
  const { 
    messages, 
    webhookUrl, 
    isLoading, 
    loadData, 
    handleDeleteMessage,
    handleMarkAsRead,
    handleReply
  } = useMessagesData();
  
  const [replyTo, setReplyTo] = useState<ContactMessage | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  // Método para enviar resposta
  const handleSendReply = async () => {
    if (!replyTo || !replyMessage.trim() || !webhookUrl) {
      toast.error('Por favor, preencha a mensagem e configure o webhook!');
      return;
    }

    const success = await handleReply(replyTo, replyMessage, webhookUrl);
    
    if (success) {
      setReplyTo(null);
      setReplyMessage('');
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Central de Mensagens</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 w-full">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Mensagens de Contato</h2>
        
        <MessageList 
          messages={messages}
          onReply={setReplyTo}
          onMarkAsRead={handleMarkAsRead}
          onDelete={setShowDeleteConfirm}
        />
      </div>
      
      {/* Dialogs */}
      <ReplyDialog 
        message={replyTo}
        webhookUrl={webhookUrl}
        replyContent={replyMessage}
        isLoading={isLoading}
        onReplyChange={setReplyMessage}
        onSendReply={handleSendReply}
        onClose={() => setReplyTo(null)}
      />
      
      <ConfirmDeleteDialog 
        id={showDeleteConfirm}
        title="Tem certeza de que deseja excluir esta mensagem?"
        onConfirm={() => showDeleteConfirm !== null && handleDeleteMessage(showDeleteConfirm)}
        onCancel={() => setShowDeleteConfirm(null)}
      />
    </div>
  );
}
