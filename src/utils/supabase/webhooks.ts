
import { supabase } from "@/integrations/supabase/client";
import { WebhookLog } from "./types";

// Buscar logs de webhooks
export async function getWebhookLogs(limit = 50): Promise<WebhookLog[]> {
  try {
    const { data, error } = await supabase
      .from('webhook_logs')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(limit);
    
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

// Gerar payload para webhook
export function generateWebhookPayload(data: any, type = 'contact_message'): any {
  return {
    type,
    data,
    timestamp: new Date().toISOString()
  };
}

// Enviar webhook
export async function sendWebhook(url: string, data: any, type = 'contact_message'): Promise<WebhookLog> {
  const payload = generateWebhookPayload(data, type);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    const responseText = await response.text();
    const success = response.ok;
    
    // Salvar log no banco de dados
    const { data: logData, error } = await supabase
      .from('webhook_logs')
      .insert([
        {
          url,
          payload,
          response: responseText,
          status: response.status,
          success,
          type
        }
      ])
      .select()
      .single();
    
    if (error) {
      console.error('Erro ao salvar log de webhook:', error);
    }
    
    return {
      id: logData?.id || 0,
      url,
      payload,
      response: responseText,
      status: response.status,
      success,
      timestamp: new Date().toISOString(),
      type
    };
  } catch (error) {
    console.error('Erro ao enviar webhook:', error);
    
    // Salvar log de erro no banco de dados
    const { data: logData } = await supabase
      .from('webhook_logs')
      .insert([
        {
          url,
          payload,
          response: error instanceof Error ? error.message : 'Erro desconhecido',
          status: 0,
          success: false,
          type
        }
      ])
      .select()
      .single();
    
    return {
      id: logData?.id || 0,
      url,
      payload,
      response: error instanceof Error ? error.message : 'Erro desconhecido',
      status: 0,
      success: false,
      timestamp: new Date().toISOString(),
      type
    };
  }
}
