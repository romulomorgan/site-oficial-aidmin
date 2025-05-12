
import { supabase } from "@/integrations/supabase/client";

// Função para obter logs de webhooks
export async function getWebhookLogs(): Promise<any[]> {
  try {
    const { data, error } = await supabase
      .from('webhook_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(50);
    
    if (error) {
      console.error('Erro ao buscar logs de webhook:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Erro ao buscar logs de webhook:', error);
    return [];
  }
}

// Função para testar uma URL de webhook
export async function testWebhook(url: string): Promise<boolean> {
  try {
    // Criar payload de teste
    const testPayload = {
      type: 'test',
      message: 'Este é um teste de webhook',
      timestamp: new Date().toISOString()
    };
    
    // Enviar requisição de teste
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testPayload)
    });
    
    // Verificar resposta
    const success = response.status >= 200 && response.status < 300;
    
    // Salvar log do teste
    try {
      const responseText = await response.text();
      
      await supabase
        .from('webhook_logs')
        .insert([{
          url,
          payload: JSON.stringify(testPayload),
          status: response.status,
          success,
          response: responseText,
          timestamp: new Date().toISOString(),
          type: 'test'
        }]);
    } catch (e) {
      console.error('Erro ao salvar log de teste no banco de dados:', e);
    }
    
    return success;
  } catch (error) {
    console.error('Erro ao testar webhook:', error);
    
    // Salvar log do erro
    try {
      await supabase
        .from('webhook_logs')
        .insert([{
          url,
          payload: JSON.stringify({ type: 'test' }),
          status: 0,
          success: false,
          response: error instanceof Error ? error.message : 'Erro desconhecido',
          timestamp: new Date().toISOString(),
          type: 'test'
        }]);
    } catch (e) {
      console.error('Erro ao salvar log de erro no banco de dados:', e);
    }
    
    return false;
  }
}
