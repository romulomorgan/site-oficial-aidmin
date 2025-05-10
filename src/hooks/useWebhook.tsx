
import { useState } from 'react';
import { toast } from 'sonner';
import { generateWebhookPayload } from '@/utils/supabase/webhooks';
import { supabase } from '@/integrations/supabase/client';
import { WebhookLog } from '@/utils/supabase/types';

interface UseWebhookOptions {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export function useWebhook(options: UseWebhookOptions = {}) {
  const [isTesting, setIsTesting] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastTestResult, setLastTestResult] = useState<any>(null);
  
  const testWebhook = async (url: string, mockData: any = null) => {
    if (!url.trim()) {
      toast.error('Por favor, insira um URL de webhook válido');
      return false;
    }

    setIsTesting(true);
    try {
      // Criar payload de teste
      const testData = mockData || {
        firstName: 'Teste',
        lastName: 'Webhook',
        email: 'teste@exemplo.com',
        phone: '11912345678',
        message: 'Mensagem de teste do webhook',
        date: new Date().toISOString(),
        testId: `test-${Date.now()}`,
      };

      const payload = generateWebhookPayload(testData);
      console.log('Testando webhook com payload:', payload);
      
      // Enviar payload para o webhook
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      // Capturar texto da resposta
      let responseText = '';
      let responseData = null;
      try {
        responseText = await response.text();
        try {
          responseData = JSON.parse(responseText);
        } catch (e) {
          // Resposta não é um JSON válido
        }
      } catch (e) {
        responseText = 'Não foi possível obter o conteúdo da resposta';
      }
      
      // Criar objeto de resultado do teste
      const result = {
        success: response.status >= 200 && response.status < 300,
        status: response.status,
        message: responseText,
        response: responseData,
        payload,
        url,
        timestamp: new Date().toISOString()
      };
      
      // Salvar log do teste no Supabase
      try {
        await supabase
          .from('webhook_logs')
          .insert([{
            url,
            payload: JSON.stringify(payload),
            status: response.status,
            success: result.success,
            response: responseText,
            timestamp: new Date().toISOString(),
            type: 'test'
          }]);
      } catch (e) {
        console.error('Erro ao salvar log no banco de dados:', e);
        // Fallback para localStorage
        const webhookLogs = JSON.parse(localStorage.getItem('webhookLogs') || '[]');
        webhookLogs.unshift(result);
        localStorage.setItem('webhookLogs', JSON.stringify(webhookLogs.slice(0, 50)));
      }
      
      setLastTestResult(result);
      
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
      console.error('Erro ao testar webhook:', error);
      
      // Criar objeto de resultado de erro
      const errorResult = {
        success: false,
        message: error instanceof Error ? error.message : String(error),
        url,
        timestamp: new Date().toISOString(),
        payload: mockData || {
          firstName: 'Teste',
          lastName: 'Webhook',
          email: 'teste@exemplo.com',
          phone: '11912345678',
          message: 'Mensagem de teste do webhook'
        }
      };
      
      setLastTestResult(errorResult);
      
      // Salvar log de erro
      try {
        await supabase
          .from('webhook_logs')
          .insert([{
            url,
            payload: JSON.stringify(errorResult.payload),
            status: 0,
            success: false,
            response: errorResult.message,
            timestamp: new Date().toISOString(),
            type: 'test'
          }]);
      } catch (e) {
        console.error('Erro ao salvar log no banco de dados:', e);
        // Fallback para localStorage
        const webhookLogs = JSON.parse(localStorage.getItem('webhookLogs') || '[]');
        webhookLogs.unshift(errorResult);
        localStorage.setItem('webhookLogs', JSON.stringify(webhookLogs.slice(0, 50)));
      }
      
      toast.error('Erro ao testar webhook');
      options.onError?.(error);
      return false;
    } finally {
      setIsTesting(false);
    }
  };

  const sendWebhook = async (url: string, data: any) => {
    if (!url.trim()) {
      toast.error('URL de webhook não configurada');
      return false;
    }

    setSaving(true);
    try {
      // Gerar payload com base nos dados fornecidos
      const payload = generateWebhookPayload(data, data.type || 'contact_message');
      console.log('Enviando para webhook:', payload);
      
      // Enviar payload para o webhook
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      // Capturar texto da resposta
      let responseText = '';
      try {
        responseText = await response.text();
      } catch (e) {
        responseText = 'Não foi possível obter o conteúdo da resposta';
      }
      
      // Criar objeto de resultado
      const result = {
        success: response.status >= 200 && response.status < 300,
        status: response.status,
        message: responseText,
        payload,
        url,
        timestamp: new Date().toISOString()
      };
      
      // Salvar log
      try {
        await supabase
          .from('webhook_logs')
          .insert([{
            url,
            payload: JSON.stringify(payload),
            status: response.status,
            success: result.success,
            response: responseText,
            timestamp: new Date().toISOString(),
            type: data.type || 'contact_message'
          }]);
      } catch (e) {
        console.error('Erro ao salvar log no banco de dados:', e);
        // Fallback para localStorage
        const webhookLogs = JSON.parse(localStorage.getItem('webhookLogs') || '[]');
        webhookLogs.unshift(result);
        localStorage.setItem('webhookLogs', JSON.stringify(webhookLogs.slice(0, 50)));
      }
      
      if (result.success) {
        toast.success('Mensagem enviada com sucesso!');
        options.onSuccess?.();
        return true;
      } else {
        toast.error(`Erro ao enviar mensagem: ${result.message || 'Erro desconhecido'}`);
        options.onError?.(result);
        return false;
      }
    } catch (error) {
      console.error('Erro ao enviar para webhook:', error);
      
      // Criar objeto de resultado de erro
      const errorResult = {
        success: false,
        message: error instanceof Error ? error.message : String(error),
        url,
        timestamp: new Date().toISOString(),
        payload: data
      };
      
      // Salvar log de erro
      try {
        await supabase
          .from('webhook_logs')
          .insert([{
            url,
            payload: JSON.stringify(data),
            status: 0,
            success: false,
            response: errorResult.message,
            timestamp: new Date().toISOString(),
            type: data.type || 'contact_message'
          }]);
      } catch (e) {
        console.error('Erro ao salvar log no banco de dados:', e);
        // Fallback para localStorage
        const webhookLogs = JSON.parse(localStorage.getItem('webhookLogs') || '[]');
        webhookLogs.unshift(errorResult);
        localStorage.setItem('webhookLogs', JSON.stringify(webhookLogs.slice(0, 50)));
      }
      
      toast.error('Erro ao enviar mensagem');
      options.onError?.(error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const getWebhookLogs = async (): Promise<WebhookLog[]> => {
    try {
      const { data, error } = await supabase
        .from('webhook_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);
        
      if (error) {
        throw error;
      }
        
      return data as WebhookLog[];
    } catch (e) {
      console.error('Erro ao carregar logs do webhook:', e);
      // Fallback para localStorage
      const logs = JSON.parse(localStorage.getItem('webhookLogs') || '[]');
      return logs;
    }
  };

  return {
    testWebhook,
    sendWebhook,
    getWebhookLogs,
    isTesting,
    saving,
    setSaving,
    lastTestResult
  };
}
