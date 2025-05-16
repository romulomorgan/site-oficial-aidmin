
import { useState } from 'react';
import { testWebhook } from '@/utils/webhooks/webhookTesting';
import { sendWebhook, sendEmailSubscriptionWebhook } from '@/utils/webhooks/webhookSender';
import { getWebhookLogs, clearWebhookLogs } from '@/utils/webhooks/webhookLogs';
import { WebhookLog } from '@/utils/supabase/types';

interface UseWebhookOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function useWebhook(options: UseWebhookOptions = {}) {
  const [isTesting, setIsTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastTestResult, setLastTestResult] = useState<any>(null);
  
  const handleTestWebhook = async (url: string, mockData: any = null) => {
    setIsTesting(true);
    try {
      const result = await testWebhook(
        url, 
        mockData,
        options.onSuccess,
        options.onError
      );
      
      if (result) {
        const logs = await getWebhookLogs();
        setLastTestResult(logs[0]); // Get latest result
      }
      
      return result;
    } finally {
      setIsTesting(false);
    }
  };

  const handleSendWebhook = async (url: string, data: any) => {
    setSaving(true);
    try {
      return await sendWebhook(
        url, 
        data, 
        options.onSuccess, 
        options.onError
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEmailSubscription = async (url: string, email: string, source: string = 'website') => {
    if (!url || url.trim() === '') {
      console.error('Webhook URL não configurada para inscrição de email');
      return false;
    }
    
    try {
      return await sendEmailSubscriptionWebhook(url, email, source);
    } catch (error) {
      console.error('Erro ao enviar inscrição de email para webhook:', error);
      return false;
    }
  };

  const handleGetLogs = async (): Promise<WebhookLog[]> => {
    return getWebhookLogs();
  };

  const handleClearLogs = async (): Promise<void> => {
    return clearWebhookLogs();
  };

  return {
    testWebhook: handleTestWebhook,
    sendWebhook: handleSendWebhook,
    sendEmailSubscriptionWebhook: handleEmailSubscription,
    getWebhookLogs: handleGetLogs,
    clearWebhookLogs: handleClearLogs,
    isTesting,
    saving,
    setSaving,
    lastTestResult
  };
}
