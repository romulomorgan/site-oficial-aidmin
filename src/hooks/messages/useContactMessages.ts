
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ContactMessage } from '@/utils/supabase/types';

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadMessages = async () => {
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
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
      toast.error('Erro ao carregar mensagens');
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
      loadMessages();
    } catch (error) {
      console.error('Erro ao excluir mensagem:', error);
      toast.error('Erro ao excluir mensagem');
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
      loadMessages();
    } catch (error) {
      console.error('Erro ao marcar mensagem como lida:', error);
      toast.error('Erro ao marcar mensagem como lida');
    }
  };

  return {
    messages,
    isLoading,
    loadMessages,
    handleDeleteMessage,
    handleMarkAsRead
  };
}
