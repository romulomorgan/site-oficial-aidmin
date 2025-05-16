
import { useEffect } from 'react';
import { useContactMessages } from './useContactMessages';
import { useEmailSubscriptions } from './useEmailSubscriptions';
import { useWebhookSettings } from './useWebhookSettings';
import { useMessageActions } from './useMessageActions';
import { ContactMessage } from '@/utils/supabase/types';

export function useMessagesData() {
  const { 
    messages, 
    loadMessages, 
    handleDeleteMessage, 
    handleMarkAsRead, 
    isLoading: messagesLoading,
    searchQuery,
    handleSearch 
  } = useContactMessages();
  
  const { emailSubscriptions, loadEmailSubscriptions, handleDeleteEmailSubscription, isLoading: subscriptionsLoading } = useEmailSubscriptions();
  const { webhookUrl, setWebhookUrl, loadWebhookUrl, isLoading: webhookLoading } = useWebhookSettings();
  const { handleReply, isLoading: actionLoading } = useMessageActions();

  // Combinar os estados de carregamento
  const isLoading = messagesLoading || subscriptionsLoading || webhookLoading || actionLoading;

  // Função para carregar todos os dados
  const loadData = async () => {
    await Promise.all([
      loadMessages(),
      loadEmailSubscriptions(),
      loadWebhookUrl()
    ]);
  };

  // Wrapper para handleReply que atualiza as mensagens após uma resposta bem-sucedida
  const handleReplyWithUpdate = async (message: ContactMessage, replyContent: string, webhookUrl: string) => {
    const success = await handleReply(message, replyContent, webhookUrl);
    
    if (success) {
      // Marcar mensagem como lida
      await handleMarkAsRead(message.id);
      
      // Recarregar dados para atualizar logs
      loadData();
    }
    
    return success;
  };

  // Usar useEffect para carregar os dados inicialmente
  useEffect(() => {
    loadData();
  }, []);

  return {
    messages,
    emailSubscriptions,
    webhookUrl,
    isLoading,
    searchQuery,
    loadData,
    setWebhookUrl,
    handleDeleteMessage,
    handleDeleteEmailSubscription,
    handleMarkAsRead,
    handleReply: handleReplyWithUpdate,
    handleSearch
  };
}
