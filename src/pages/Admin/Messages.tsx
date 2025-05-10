
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { ContactMessage, EmailSubscription } from '@/utils/supabase/types';
import MessageList from '@/components/admin/messages/MessageList';
import EmailSubscriptionList from '@/components/admin/messages/EmailSubscriptionList';
import ReplyDialog from '@/components/admin/messages/ReplyDialog';
import ConfirmDeleteDialog from '@/components/admin/messages/ConfirmDeleteDialog';
import { useWebhook } from '@/hooks/useWebhook';

export default function Messages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [emailSubscriptions, setEmailSubscriptions] = useState<EmailSubscription[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replyTo, setReplyTo] = useState<ContactMessage | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | string | null>(null);
  const [showDeleteEmailConfirm, setShowDeleteEmailConfirm] = useState<number | string | null>(null);
  
  // Usar o hook de webhook
  const { sendWebhook } = useWebhook();

  useEffect(() => {
    loadData();
  }, []);

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
      
      setShowDeleteConfirm(null);
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
      
      setShowDeleteEmailConfirm(null);
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

  const handleSendReply = async () => {
    if (!replyTo || !replyMessage.trim() || !webhookUrl) {
      toast.error('Por favor, preencha a mensagem e configure o webhook!');
      return;
    }

    setIsLoading(true);

    try {
      // Preparar dados para o webhook
      const replyData = {
        type: 'reply',
        to: replyTo.email,
        from: "noreply@iadmin.com",
        subject: `Re: Contato IAdmin - ${replyTo.firstname} ${replyTo.lastname}`,
        message: replyMessage,
        contactData: {
          firstName: replyTo.firstname,
          lastName: replyTo.lastname,
          email: replyTo.email,
          phone: replyTo.phone,
          originalMessage: replyTo.message
        },
        threadId: replyTo.thread_id || `thread_${Date.now()}`,
        contactId: replyTo.id
      };
      
      // Enviar via webhook usando o hook
      const success = await sendWebhook(webhookUrl, replyData);
      
      if (success) {
        // Marcar mensagem como lida
        await handleMarkAsRead(replyTo.id);
        
        setReplyTo(null);
        setReplyMessage('');
        
        // Recarregar dados para atualizar logs
        loadData();
      }
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
      toast.error('Erro ao enviar resposta. Verifique o webhook.');
    } finally {
      setIsLoading(false);
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
