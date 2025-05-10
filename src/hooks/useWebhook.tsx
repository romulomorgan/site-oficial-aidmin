
import { useState } from 'react';
import { toast } from 'sonner';
import { testWebhookUrl } from '@/utils/supabase/webhooks';

interface UseWebhookOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function useWebhook(options: UseWebhookOptions = {}) {
  const [isTesting, setIsTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const testWebhook = async (url: string) => {
    if (!url.trim()) {
      toast.error('Por favor, insira um URL de webhook válido');
      return false;
    }

    setIsTesting(true);
    try {
      const result = await testWebhookUrl(url);
      if (result.success) {
        toast.success('Teste de webhook bem-sucedido!');
        options.onSuccess?.();
        return true;
      } else {
        toast.error(`Falha no teste: ${result.message || 'Erro desconhecido'}`);
        options.onError?.(result);
        return false;
      }
    } catch (error) {
      toast.error('Erro ao testar webhook');
      console.error('Erro ao testar webhook:', error);
      options.onError?.(error);
      return false;
    } finally {
      setIsTesting(false);
    }
  };

  return {
    testWebhook,
    isTesting,
    saving,
    setSaving
  };
}
