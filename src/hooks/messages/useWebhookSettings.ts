
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useWebhookSettings() {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const loadWebhookUrl = async () => {
    setIsLoading(true);
    try {
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
      console.error('Erro ao carregar URL do webhook:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    webhookUrl,
    setWebhookUrl,
    isLoading,
    loadWebhookUrl
  };
}
