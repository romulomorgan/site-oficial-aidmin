
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { EmailSubscription } from '@/utils/supabase/types';
import { useWebhook } from '@/hooks/useWebhook';

export type SortField = 'email' | 'created_at';
export type SortOrder = 'asc' | 'desc';

export function useEmailSubscriptions() {
  const [emailSubscriptions, setEmailSubscriptions] = useState<EmailSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const { sendEmailSubscriptionWebhook } = useWebhook();

  // Função para carregar as inscrições de email
  const loadEmailSubscriptions = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_email_subscriptions')
        .select('*')
        .order(sortField, { ascending: sortOrder === 'asc' });
      
      if (error) {
        console.error('Erro ao carregar inscrições:', error);
        toast.error('Erro ao carregar inscrições de email');
        return;
      }
      
      setEmailSubscriptions(data || []);
    } catch (error) {
      console.error('Erro ao carregar inscrições:', error);
      toast.error('Erro ao carregar inscrições de email');
    } finally {
      setIsLoading(false);
    }
  }, [sortField, sortOrder]);

  // Função para excluir uma inscrição
  const handleDeleteEmailSubscription = async (id: string | number) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('site_email_subscriptions')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Erro ao excluir inscrição:', error);
        toast.error('Erro ao excluir inscrição de email');
        return;
      }
      
      setEmailSubscriptions(prev => prev.filter(sub => sub.id !== id));
      toast.success('Inscrição de email excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir inscrição:', error);
      toast.error('Erro ao excluir inscrição de email');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para adicionar uma nova inscrição
  const handleAddEmailSubscription = async (email: string, source: string = 'website') => {
    if (!email || !email.trim()) {
      toast.error('Por favor, insira um email válido');
      return;
    }
    
    setIsLoading(true);
    try {
      // Verificar se o email já existe no banco
      const { data: existingData } = await supabase
        .from('site_email_subscriptions')
        .select('id')
        .eq('email', email.trim())
        .maybeSingle();
      
      if (existingData) {
        toast.error('Este email já está inscrito');
        return;
      }
      
      // Inserir novo email
      const { data, error } = await supabase
        .from('site_email_subscriptions')
        .insert([{
          email: email.trim(),
          source,
          created_at: new Date().toISOString()
        }])
        .select('*')
        .single();
      
      if (error) {
        console.error('Erro ao adicionar inscrição:', error);
        toast.error('Erro ao adicionar inscrição de email');
        return;
      }
      
      // Carregar URL do webhook
      const { data: webhookConfig } = await supabase
        .from('site_texts')
        .select('content')
        .eq('key', 'webhookUrl')
        .maybeSingle();
      
      if (webhookConfig?.content) {
        // Enviar notificação via webhook
        const webhookUrl = webhookConfig.content;
        console.log('Enviando notificação de inscrição de email para webhook:', webhookUrl);
        await sendEmailSubscriptionWebhook(webhookUrl, email, source);
      } else {
        console.warn('URL de webhook não configurada para inscrição de email');
      }
      
      // Atualizar a lista
      setEmailSubscriptions(prev => [data, ...prev]);
      toast.success('Email inscrito com sucesso');
    } catch (error) {
      console.error('Erro ao adicionar inscrição:', error);
      toast.error('Erro ao adicionar inscrição de email');
    } finally {
      setIsLoading(false);
    }
  };

  // Função para ordenar
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      // Inverter ordem se clicar na mesma coluna
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Definir nova coluna e ordem padrão
      setSortField(field);
      setSortOrder('asc');
    }
    
    // Recarregar dados com nova ordenação
    loadEmailSubscriptions();
  };

  return {
    emailSubscriptions,
    loadEmailSubscriptions,
    handleDeleteEmailSubscription,
    handleAddEmailSubscription,
    isLoading,
    sortField,
    sortOrder,
    handleSort
  };
}
