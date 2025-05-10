
import { supabase } from "@/integrations/supabase/client";
import { EmailSubscription } from "./types";

// Função para salvar uma inscrição de email e notificar webhook
export async function saveEmailSubscription(email: string, source?: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('site_email_subscriptions')
      .insert([{
        email,
        source: source || 'website',
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Erro ao salvar inscrição de email:', error);
      return false;
    }

    // Notificar o webhook sobre a nova inscrição
    await notifyWebhookEmailSubscription(email, source);

    return true;
  } catch (error) {
    console.error('Erro ao processar inscrição de email:', error);
    return false;
  }
}

// Função para obter todas as inscrições de email
export async function fetchEmailSubscriptions(): Promise<EmailSubscription[]> {
  try {
    const { data, error } = await supabase
      .from('site_email_subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar inscrições de email:', error);
      return [];
    }

    return data as EmailSubscription[];
  } catch (error) {
    console.error('Erro ao processar busca de inscrições:', error);
    return [];
  }
}

// Função para notificar o webhook quando uma inscrição for adicionada
export async function notifyWebhookEmailSubscription(email: string, source?: string): Promise<boolean> {
  try {
    // Buscar a URL do webhook
    const { data } = await supabase
      .from('site_texts')
      .select('content')
      .eq('key', 'webhookUrl')
      .single();
    
    if (!data || !data.content) {
      console.log('URL de webhook não configurada');
      return false;
    }
    
    const webhookUrl = data.content;
    
    // Preparar payload para o webhook
    const payload = {
      type: 'email_subscription',
      email,
      source: source || 'website',
      date: new Date().toISOString(),
      subscriptionId: `subscription_${Date.now()}`
    };
    
    // Enviar para o webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    // Verificar resposta
    const success = response.status >= 200 && response.status < 300;
    
    // Salvar log
    try {
      const responseText = await response.text();
      
      await supabase
        .from('webhook_logs')
        .insert([{
          url: webhookUrl,
          payload: JSON.stringify(payload),
          status: response.status,
          success,
          response: responseText,
          timestamp: new Date().toISOString(),
          type: 'email_subscription'
        }]);
    } catch (e) {
      console.error('Erro ao salvar log no banco de dados:', e);
    }
    
    return success;
  } catch (error) {
    console.error('Erro ao notificar webhook sobre inscrição de email:', error);
    return false;
  }
}
