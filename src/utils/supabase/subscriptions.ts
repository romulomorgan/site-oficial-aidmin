
import { supabase } from "@/integrations/supabase/client";
import { EmailSubscription } from "./types";

// Função para salvar uma inscrição de email
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

    return data.map(subscription => ({
      id: subscription.id,
      email: subscription.email,
      source: subscription.source,
      createdAt: subscription.created_at
    }));
  } catch (error) {
    console.error('Erro ao processar busca de inscrições:', error);
    return [];
  }
}
