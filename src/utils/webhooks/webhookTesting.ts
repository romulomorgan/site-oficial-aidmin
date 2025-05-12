
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { generateWebhookPayload } from '@/utils/supabase/webhooks';
import { WebhookLog } from '@/utils/supabase/types';

/**
 * Tests a webhook URL with test data
 */
export async function testWebhook(
  url: string, 
  mockData: any = null,
  onSuccess?: () => void,
  onError?: (error: any) => void
): Promise<boolean> {
  if (!url.trim()) {
    toast.error('Por favor, insira um URL de webhook válido');
    return false;
  }

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
    
    // Salvar log do teste
    await saveWebhookLog({
      url,
      payload: JSON.stringify(payload),
      status: response.status,
      success: result.success,
      response: responseText,
      timestamp: new Date().toISOString(),
      type: 'test'
    });
    
    if (result.success) {
      toast.success('Teste de webhook bem-sucedido!');
      onSuccess?.();
      return true;
    } else {
      toast.error(`Falha no teste: ${result.message || 'Erro desconhecido'}`);
      onError?.(result);
      return false;
    }
  } catch (error) {
    console.error('Erro ao testar webhook:', error);
    
    // Criar objeto de resultado de erro
    const errorResult = {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
    
    // Salvar log de erro
    const errorPayload = mockData || {
      firstName: 'Teste',
      lastName: 'Webhook',
      email: 'teste@exemplo.com',
      phone: '11912345678',
      message: 'Mensagem de teste do webhook'
    };
    
    await saveWebhookLog({
      url,
      payload: JSON.stringify(errorPayload),
      status: 0,
      success: false,
      response: errorResult.message,
      timestamp: new Date().toISOString(),
      type: 'test'
    });
    
    toast.error('Erro ao testar webhook');
    onError?.(error);
    return false;
  }
}

/**
 * Saves a webhook log to Supabase or localStorage as fallback
 */
export async function saveWebhookLog(logData: Partial<WebhookLog>): Promise<void> {
  try {
    // Fix: Ensure we're inserting a single object, not an array
    await supabase
      .from('webhook_logs')
      .insert(logData);
  } catch (e) {
    console.error('Erro ao salvar log no banco de dados:', e);
    // Fallback para localStorage
    const webhookLogs = JSON.parse(localStorage.getItem('webhookLogs') || '[]');
    webhookLogs.unshift(logData);
    localStorage.setItem('webhookLogs', JSON.stringify(webhookLogs.slice(0, 50)));
  }
}
