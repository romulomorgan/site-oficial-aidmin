
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useWebhook } from '@/hooks/useWebhook';
import { ContactMessage, EmailSubscription } from '@/utils/supabase/types';

export function useMessagesData() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [emailSubscriptions, setEmailSubscriptions] = useState<EmailSubscription[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Usar o hook de webhook
  const { sendWebhook } = useWebhook();

  const loadData = async () => {
    setIsLoading(true);
    
    try {
      // Load messages from Supabase
      const { data: messagesData, error: messagesError } = await supabase
        .from('site_contact_messages')
        .select('*')
        .order('date', { ascending: false });
        
      if (messagesError) {
        console.error('Erro ao carregar mensagens:', messagesError);
        toast.error('Erro ao carregar mensagens');
        
        // Fallback to localStorage if database fails
        const savedMessages = localStorage.getItem('contactMessages');
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages);
          setMessages(parsedMessages);
        }
      } else if (messagesData) {
        setMessages(messagesData);
      }
      
      // Load email subscriptions
      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('site_email_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (subscriptionsError) {
        console.error('Erro ao carregar inscrições de email:', subscriptionsError);
        
        // Fallback to localStorage if database fails
        const savedEmailSubscriptions = localStorage.getItem('emailSubscriptions');
        if (savedEmailSubscriptions) {
          const parsedSubscriptions = JSON.parse(savedEmailSubscriptions);
          setEmailSubscriptions(parsedSubscriptions);
        }
      } else if (subscriptionsData) {
        setEmailSubscriptions(subscriptionsData);
      }
      
      // Load webhook URL
      const { data: configData } = await supabase
        .from('site_texts')
        .select('content')
        .eq('key', 'webhookUrl')
        .single();
        
      if (configData && configData.content) {
        setWebhookUrl(configData.content);
      } else {
        // Fallback to localStorage
        const savedTexts = localStorage.getItem('siteTexts');
        if (savedTexts) {
          const parsedTexts = JSON.parse(savedTexts);
          if (parsedTexts.webhookUrl) {
            setWebhookUrl(parsedTexts.webhookUrl);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMessage = async (id: number | string) => {
    try {
      if (typeof id === 'string' && id.includes('-')) {
        // UUID format (Supabase)
        await supabase.from('site_contact_messages').delete().eq('id', id);
      } else {
        // Local storage ID format
        const updatedMessages = messages.filter(message => message.id !== id);
        setMessages(updatedMessages);
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      }
      
      toast.success('Mensagem removida com sucesso!');
      
      // Reload messages
      loadData();
    } catch (error) {
      console.error('Erro ao excluir mensagem:', error);
      toast.error('Erro ao excluir mensagem');
    }
  };

  const handleDeleteEmailSubscription = async (id: number | string) => {
    try {
      if (typeof id === 'string' && id.includes('-')) {
        // UUID format (Supabase)
        await supabase.from('site_email_subscriptions').delete().eq('id', id);
      } else {
        // Local storage ID format
        const updatedSubscriptions = emailSubscriptions.filter(sub => sub.id !== id);
        setEmailSubscriptions(updatedSubscriptions);
        localStorage.setItem('emailSubscriptions', JSON.stringify(updatedSubscriptions));
      }
      
      toast.success('Inscrição removida com sucesso!');
      
      // Reload subscriptions
      loadData();
    } catch (error) {
      console.error('Erro ao excluir inscrição:', error);
      toast.error('Erro ao excluir inscrição');
    }
  };

  const handleMarkAsRead = async (id: number | string) => {
    try {
      if (typeof id === 'string' && id.includes('-')) {
        // UUID format (Supabase)
        await supabase
          .from('site_contact_messages')
          .update({ read: true })
          .eq('id', id);
      } else {
        // Local storage ID format
        const updatedMessages = messages.map(message => 
          message.id === id ? { ...message, read: true } : message
        );
        setMessages(updatedMessages);
        localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
      }
      
      toast.success('Mensagem marcada como lida!');
      
      // Reload messages
      loadData();
    } catch (error) {
      console.error('Erro ao marcar mensagem como lida:', error);
      toast.error('Erro ao marcar mensagem como lida');
    }
  };

  const handleReply = async (message: ContactMessage, replyContent: string, webhookUrl: string) => {
    setIsLoading(true);

    try {
      // Preparar dados para o webhook
      const replyData = {
        type: 'reply',
        to: message.email,
        from: "noreply@iadmin.com",
        subject: `Re: Contato IAdmin - ${message.firstname} ${message.lastname}`,
        message: replyContent,
        contactData: {
          firstName: message.firstname,
          lastName: message.lastname,
          email: message.email,
          phone: message.phone,
          originalMessage: message.message
        },
        threadId: message.thread_id || `thread_${Date.now()}`,
        contactId: message.id
      };
      
      // Enviar via webhook usando o hook
      const success = await sendWebhook(webhookUrl, replyData);
      
      if (success) {
        // Marcar mensagem como lida
        await handleMarkAsRead(message.id);
        
        // Recarregar dados para atualizar logs
        loadData();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
      toast.error('Erro ao enviar resposta. Verifique o webhook.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
  };
}
