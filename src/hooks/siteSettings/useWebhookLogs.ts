
import { useState } from 'react';
import { getWebhookLogs } from '@/utils/supabaseClient';

export function useWebhookLogs() {
  const [webhookLogs, setWebhookLogs] = useState<any[]>([]);

  const loadWebhookLogs = async () => {
    try {
      const logs = await getWebhookLogs();
      setWebhookLogs(logs);
    } catch (error) {
      console.error('Erro ao carregar logs de webhook:', error);
      setWebhookLogs([]);
    }
  };

  return {
    webhookLogs,
    setWebhookLogs,
    loadWebhookLogs
  };
}
