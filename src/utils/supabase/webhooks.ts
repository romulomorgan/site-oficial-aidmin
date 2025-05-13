
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

// Função para gerar payload padrão para webhooks
export function generateWebhookPayload(data: any, type: string = 'contact_message'): any {
  // Cria uma cópia do objeto para não modificar o original
  const payload = {
    type: type,
    ...data,
    timestamp: new Date().toISOString(),
  };

  // Mapear campos específicos dependendo do tipo
  if (type === 'contact_message') {
    return {
      type: type,
      firstName: data.firstName || data.firstname || '',
      lastName: data.lastName || data.lastname || '',
      email: data.email || '',
      phone: data.phone || '',
      message: data.message || '',
      date: data.date || new Date().toISOString(),
      threadId: data.threadId || data.thread_id || `thread_${Date.now()}`,
      contactId: data.contactId || data.contact_id || `contact_${Date.now()}`
    };
  } else if (type === 'reply') {
    return {
      type: type,
      to: data.to || '',
      from: data.from || "noreply@iadmin.com",
      subject: data.subject || '',
      message: data.message || '',
      contactData: data.contactData || {},
      date: data.date || new Date().toISOString(),
      threadId: data.threadId || data.thread_id || '',
      contactId: data.contactId || data.contact_id || ''
    };
  } else if (type === 'email_subscription') {
    return {
      type: type,
      email: data.email || '',
      source: data.source || 'website',
      date: data.date || new Date().toISOString(),
      subscriptionId: data.subscriptionId || `subscription_${Date.now()}`
    };
  } else {
    // Para outros tipos, retorna o payload enriquecido
    return payload;
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
