
import { supabase } from "@/integrations/supabase/client";

// Função para salvar inscrição de email
export async function saveEmailSubscription(email: string, source: string): Promise<boolean> {
  try {
    console.log(`Salvando inscrição de email: ${email} da fonte: ${source}`);
    
    // Inserir a inscrição na tabela site_email_subscriptions
    const { error } = await supabase
      .from('site_email_subscriptions')
      .insert([
        {
          email,
          source,
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Erro específico ao salvar inscrição de email:', error);
      throw error;
    }
    
    console.log('Inscrição de email salva com sucesso!');
    return true;
  } catch (error) {
    console.error('Erro ao cadastrar email:', error);
    return false;
  }
}
