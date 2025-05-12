
import { supabase } from '@/integrations/supabase/client';
import { WebhookLog } from '@/utils/supabase/types';

/**
 * Retrieves webhook logs from Supabase or localStorage
 */
export async function getWebhookLogs(): Promise<WebhookLog[]> {
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
}

/**
 * Clears all webhook logs from Supabase
 */
export async function clearWebhookLogs(): Promise<void> {
  try {
    await supabase
      .from('webhook_logs')
      .delete()
      .gte('id', 0);
      
    // Also clear localStorage
    localStorage.removeItem('webhookLogs');
  } catch (e) {
    console.error('Erro ao limpar logs do webhook:', e);
  }
}
