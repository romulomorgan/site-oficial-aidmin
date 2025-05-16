
import { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { EmailSubscription } from '@/utils/supabase/types';

export type SortOrder = 'asc' | 'desc';
export type SortField = 'email' | 'created_at';

export function useEmailSubscriptions() {
  const [emailSubscriptions, setEmailSubscriptions] = useState<EmailSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const loadEmailSubscriptions = async () => {
    setIsLoading(true);
    try {
      // Load email subscriptions with sort order
      const { data: subscriptionsData, error: subscriptionsError } = await supabase
        .from('site_email_subscriptions')
        .select('*')
        .order(sortField, { ascending: sortOrder === 'asc' });
        
      if (subscriptionsError) {
        console.error('Erro ao carregar inscrições de email:', subscriptionsError);
        
        // Fallback to localStorage if database fails
        const savedEmailSubscriptions = localStorage.getItem('emailSubscriptions');
        if (savedEmailSubscriptions) {
          const parsedSubscriptions = JSON.parse(savedEmailSubscriptions);
          // Sort manually for localStorage fallback
          const sortedSubscriptions = sortEmailSubscriptions(parsedSubscriptions, sortField, sortOrder);
          setEmailSubscriptions(sortedSubscriptions);
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

  const sortEmailSubscriptions = (subscriptions: EmailSubscription[], field: SortField, order: SortOrder) => {
    return [...subscriptions].sort((a, b) => {
      const valueA = field === 'email' ? a.email.toLowerCase() : new Date(a.created_at).getTime();
      const valueB = field === 'email' ? b.email.toLowerCase() : new Date(b.created_at).getTime();
      
      if (order === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  };

  const handleSort = (field: SortField) => {
    // If clicking the same field, toggle the sort order
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If clicking a new field, set it as the sort field and default to ascending
      setSortField(field);
      setSortOrder('asc');
    }
    // Reload the data with the new sort parameters
    loadEmailSubscriptions();
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
    sortField,
    sortOrder,
    loadEmailSubscriptions,
    handleDeleteEmailSubscription,
    handleSort
  };
}
