
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { EmailSubscription } from '@/utils/supabase/types';

export function useEmailSubscriptions() {
  const [emailSubscriptions, setEmailSubscriptions] = useState<EmailSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadEmailSubscriptions = async () => {
    setIsLoading(true);
    try {
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
    } catch (error) {
      console.error('Erro ao carregar inscrições de email:', error);
      toast.error('Erro ao carregar inscrições');
    } finally {
      setIsLoading(false);
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
      loadEmailSubscriptions();
    } catch (error) {
      console.error('Erro ao excluir inscrição:', error);
      toast.error('Erro ao excluir inscrição');
    }
  };

  return {
    emailSubscriptions,
    isLoading,
    loadEmailSubscriptions,
    handleDeleteEmailSubscription
  };
}
