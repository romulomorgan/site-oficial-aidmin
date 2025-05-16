
import React, { useState } from 'react';
import { toast } from 'sonner';
import { ContactMessage } from '@/utils/supabase/types';
import { MessageList } from '@/components/admin/messages/message';
import { EmailSubscriptionList } from '@/components/admin/messages/subscription';
import ReplyDialog from '@/components/admin/messages/ReplyDialog';
import ConfirmDeleteDialog from '@/components/admin/messages/ConfirmDeleteDialog';
import WebhookConfig from '@/components/admin/messages/WebhookConfig';
import { useMessagesData } from '@/hooks/messages/useMessagesData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [showDeleteSubscriptionConfirm, setShowDeleteSubscriptionConfirm] = useState<number | string | null>(null);

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

  // Método para salvar webhook URL
  const handleSaveWebhook = async () => {
    try {
      await fetch('/api/save-webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl })
      });
      toast.success('URL do webhook salva com sucesso!');
    } catch (error) {
      toast.error('Erro ao salvar URL do webhook');
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Central de Mensagens</h1>
      
      {/* Configuração do Webhook */}
      <WebhookConfig
        webhookUrl={webhookUrl}
        isLoading={isLoading}
        onWebhookChange={setWebhookUrl}
        onSaveWebhook={handleSaveWebhook}
      />
      
      <div className="bg-white rounded-lg shadow-sm p-6 w-full">
        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="messages" className="text-base">
              Mensagens de Contato
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="text-base">
              Inscrições de Email
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages">
            <MessageList 
              messages={messages}
              onReply={setReplyTo}
              onMarkAsRead={handleMarkAsRead}
              onDelete={setShowDeleteConfirm}
            />
          </TabsContent>
          
          <TabsContent value="subscriptions">
            <EmailSubscriptionList
              subscriptions={emailSubscriptions}
              onDelete={setShowDeleteSubscriptionConfirm}
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
        id={showDeleteSubscriptionConfirm}
        title="Tem certeza de que deseja excluir esta inscrição de email?"
        onConfirm={() => showDeleteSubscriptionConfirm !== null && handleDeleteEmailSubscription(showDeleteSubscriptionConfirm)}
        onCancel={() => setShowDeleteSubscriptionConfirm(null)}
      />
    </div>
  );
}
