
import { supabase } from "@/integrations/supabase/client";
import { EmailSubscription } from "./types";

// Função para adicionar uma nova inscrição de email
export async function addEmailSubscription(email: string, source: string = 'Footer'): Promise<boolean> {
  try {
    // Verificar se o email já está cadastrado
    const { data: existingEmail } = await supabase
      .from('site_email_subscriptions')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (existingEmail) {
      console.log('Email já cadastrado');
      return true; // Não é erro, já está inscrito
    }

    // Inserir novo email
    const { error } = await supabase
      .from('site_email_subscriptions')
      .insert({
        email,
        source
      });

    if (error) throw error;
    
    // Atualizar cache local
    addEmailSubscriptionToLocalStorage(email, source);
    
    return true;
  } catch (error) {
    console.error('Erro ao adicionar inscrição de email:', error);
    
    // Se falhar com o Supabase, salvar localmente para tentar sincronizar depois
    addEmailSubscriptionToLocalStorage(email, source);
    
    return false;
  }
}

// Export the saveEmailSubscription function for backward compatibility
export const saveEmailSubscription = addEmailSubscription;

// Função para buscar inscrições de email
export async function fetchEmailSubscriptions(): Promise<EmailSubscription[]> {
  try {
    const { data, error } = await supabase
      .from('site_email_subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar inscrições de email:', error);
      return getEmailSubscriptionsFromLocalStorage();
    }

    if (!data) {
      return getEmailSubscriptionsFromLocalStorage();
    }

    // Mapear para o formato esperado
    const subscriptions = data.map(item => ({
      id: item.id,
      email: item.email,
      source: item.source || 'Desconhecido',
      createdAt: item.created_at
    }));

    // Atualizar cache local
    localStorage.setItem('emailSubscriptions', JSON.stringify(subscriptions));

    return subscriptions;
  } catch (error) {
    console.error('Erro ao buscar inscrições de email:', error);
    return getEmailSubscriptionsFromLocalStorage();
  }
}

// Função para excluir uma inscrição de email
export async function deleteEmailSubscription(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('site_email_subscriptions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    // Remover do localStorage também
    const subscriptions = getEmailSubscriptionsFromLocalStorage();
    const updatedSubscriptions = subscriptions.filter(sub => sub.id !== id);
    localStorage.setItem('emailSubscriptions', JSON.stringify(updatedSubscriptions));
    
    return true;
  } catch (error) {
    console.error('Erro ao excluir inscrição de email:', error);
    return false;
  }
}

// Função auxiliar para adicionar inscrição ao localStorage
function addEmailSubscriptionToLocalStorage(email: string, source: string): void {
  const subscriptions = getEmailSubscriptionsFromLocalStorage();
  
  // Verificar se o email já existe
  if (subscriptions.some(sub => sub.email === email)) {
    return;
  }
  
  // Adicionar nova inscrição
  const newSubscription: EmailSubscription = {
    id: `local-${Date.now()}`,
    email,
    source,
    createdAt: new Date().toISOString()
  };
  
  subscriptions.unshift(newSubscription);
  localStorage.setItem('emailSubscriptions', JSON.stringify(subscriptions));
}

// Função para obter inscrições de email do localStorage
function getEmailSubscriptionsFromLocalStorage(): EmailSubscription[] {
  const saved = localStorage.getItem('emailSubscriptions');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Erro ao parsear inscrições de email do localStorage:', e);
    }
  }
  return [];
}

// Adiciona handler para o footer
export function handleFooterSubscription(email: string): Promise<boolean> {
  if (!email || !email.includes('@')) {
    return Promise.resolve(false);
  }
  
  return addEmailSubscription(email, 'Rodapé do site');
}
