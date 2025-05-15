
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { ContactMessage, EmailSubscription } from '@/utils/supabase/types';
import MessageList from '@/components/admin/messages/MessageList';
import EmailSubscriptionList from '@/components/admin/messages/EmailSubscriptionList';
import ReplyDialog from '@/components/admin/messages/ReplyDialog';
import ConfirmDeleteDialog from '@/components/admin/messages/ConfirmDeleteDialog';
import { useMessagesData } from '@/hooks/useMessagesData';

export default function Messages() {
  const { 
    messages, 
    emailSubscriptions, 
    webhookUrl, 
    isLoading, 
    loadData, 
    setWebhookUrl,
    handleDeleteMessage,
    handleDeleteEmailSubscription,
    handleMarkAsRead,
    handleReply
  } = useMessagesData();
  
  const [replyTo, setReplyTo] = useState<ContactMessage | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | string | null>(null);
  const [showDeleteEmailConfirm, setShowDeleteEmailConfirm] = useState<number | string | null>(null);

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
        <Tabs defaultValue="messages">
          <TabsList className="border-b w-full mb-6">
            <TabsTrigger value="messages">Mensagens de Contato</TabsTrigger>
            <TabsTrigger value="subscriptions">Inscrições de Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Mensagens de Contato</h2>
            
            <MessageList 
              messages={messages}
              onReply={setReplyTo}
              onMarkAsRead={handleMarkAsRead}
              onDelete={setShowDeleteConfirm}
            />
          </TabsContent>
          
          <TabsContent value="subscriptions">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Inscrições de Email</h2>
            
            <EmailSubscriptionList 
              subscriptions={emailSubscriptions}
              onDelete={setShowDeleteEmailConfirm}
            />
          </TabsContent>
        </Tabs>
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
      
      <ConfirmDeleteDialog 
        id={showDeleteEmailConfirm}
        title="Tem certeza de que deseja excluir esta inscrição de e-mail?"
        onConfirm={() => showDeleteEmailConfirm !== null && handleDeleteEmailSubscription(showDeleteEmailConfirm)}
        onCancel={() => setShowDeleteEmailConfirm(null)}
      />
    </div>
  );
}
