
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { generateWebhookPayload } from '@/utils/supabase/webhooks';
import { saveWebhookLog } from './webhookTesting';

/**
 * Sends data to a webhook URL
 */
export async function sendWebhook(
  url: string, 
  data: any, 
  onSuccess?: () => void,
  onError?: (error: any) => void
): Promise<boolean> {
  if (!url || !url.trim()) {
    console.error('URL de webhook não configurada');
    toast.error('URL de webhook não configurada');
    return false;
  }

  try {
    console.log(`Enviando webhook para ${url} com dados:`, data);
    
    // Gerar payload com base nos dados fornecidos
    const payload = generateWebhookPayload(data, data.type || 'contact_message');
    
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
    
    console.log(`Resposta do webhook (status ${response.status}):`, responseText);
    
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
    await saveWebhookLog({
      url,
      payload: JSON.stringify(payload),
      status: response.status,
      success: result.success,
      response: responseText,
      timestamp: new Date().toISOString(),
      type: data.type || 'contact_message'
    });
    
    if (result.success) {
      toast.success('Mensagem enviada com sucesso!');
      onSuccess?.();
      return true;
    } else {
      toast.error(`Erro ao enviar mensagem: ${result.message || 'Erro desconhecido'}`);
      onError?.(result);
      return false;
    }
  } catch (error) {
    console.error('Erro ao enviar para webhook:', error);
    
    // Criar objeto de resultado de erro
    const errorResult = {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
    
    // Salvar log de erro
    await saveWebhookLog({
      url,
      payload: JSON.stringify(data),
      status: 0,
      success: false,
      response: errorResult.message,
      timestamp: new Date().toISOString(),
      type: data.type || 'contact_message'
    });
    
    toast.error('Erro ao enviar mensagem');
    onError?.(error);
    return false;
  }
}

/**
 * Sends email subscription data to a webhook
 */
export async function sendEmailSubscriptionWebhook(
  url: string, 
  email: string, 
  source: string = 'website'
): Promise<boolean> {
  if (!url || !url.trim()) {
    console.error('URL de webhook não configurada para inscrição de email');
    return false;
  }

  try {
    console.log(`Enviando inscrição de email para webhook ${url}:`, email);
    
    const payload = {
      type: 'email_subscription',
      email: email,
      source: source,
      date: new Date().toISOString(),
      subscriptionId: `subscription_${Date.now()}`
    };
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    let responseText = '';
    try {
      responseText = await response.text();
      console.log(`Resposta do webhook (status ${response.status}):`, responseText);
    } catch (e) {
      responseText = 'Não foi possível obter o conteúdo da resposta';
      console.error('Erro ao ler resposta do webhook:', e);
    }

    // Criar objeto de resultado
    const result = {
      success: response.status >= 200 && response.status < 300,
      status: response.status,
      message: responseText,
    };
    
    // Salvar log
    await saveWebhookLog({
      url,
      payload: JSON.stringify(payload),
      status: response.status,
      success: result.success,
      response: responseText,
      timestamp: new Date().toISOString(),
      type: 'email_subscription'
    });
    
    if (result.success) {
      console.log('Webhook de inscrição de email enviado com sucesso');
    } else {
      console.error('Falha ao enviar webhook de inscrição de email:', result);
    }
    
    return result.success;
  } catch (error) {
    console.error('Erro ao enviar inscrição para webhook:', error);
    return false;
  }
}
