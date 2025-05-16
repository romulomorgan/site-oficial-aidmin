
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { ContactMessage } from '@/utils/supabase/types';

export function useContactMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
          setFilteredMessages(parsedMessages);
        }
      } else if (messagesData) {
        setMessages(messagesData);
        setFilteredMessages(messagesData);
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
        applySearchFilter(updatedMessages, searchQuery);
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
        applySearchFilter(updatedMessages, searchQuery);
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

  // Função para aplicar o filtro de busca
  const applySearchFilter = useCallback((messagesList: ContactMessage[], query: string) => {
    if (!query.trim()) {
      setFilteredMessages(messagesList);
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    const filtered = messagesList.filter(message => 
      (message.firstname && message.firstname.toLowerCase().includes(lowerCaseQuery)) || 
      (message.lastname && message.lastname.toLowerCase().includes(lowerCaseQuery)) ||
      (message.name && message.name.toLowerCase().includes(lowerCaseQuery)) ||
      message.email.toLowerCase().includes(lowerCaseQuery) ||
      message.message.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredMessages(filtered);
  }, []);

  // Handler para atualizar a busca
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    applySearchFilter(messages, query);
  }, [messages, applySearchFilter]);

  return {
    messages: filteredMessages, // Agora retornamos as mensagens filtradas
    allMessages: messages, // Mantemos acesso às mensagens originais se necessário
    isLoading,
    searchQuery,
    loadMessages,
    handleDeleteMessage,
    handleMarkAsRead,
    handleSearch
  };
}
