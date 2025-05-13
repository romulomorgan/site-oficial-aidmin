
import { supabase } from "@/integrations/supabase/client";
import { FAQItem } from "./types";

// Função para buscar todas as FAQs
export async function fetchFAQs(): Promise<FAQItem[]> {
  try {
    const { data, error } = await supabase
      .from('site_faqs')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) {
      console.error('Erro ao carregar FAQs:', error);
      return [];
    }
    
    // Mapear dados para o formato FAQItem
    const faqs: FAQItem[] = data.map(item => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      order: item.order_index || 0,
      active: item.active
    }));
    
    return faqs;
  } catch (error) {
    console.error('Erro ao buscar FAQs:', error);
    return [];
  }
}

// Função para adicionar uma nova FAQ
export async function addFAQ(faqData: Omit<FAQItem, "id">): Promise<string | null> {
  try {
    // Verificar se a FAQ já existe
    const { data: existingFaq } = await supabase
      .from('site_faqs')
      .select('id')
      .eq('question', faqData.question)
      .maybeSingle();
    
    if (existingFaq) {
      console.error('FAQ com esta pergunta já existe');
      return null;
    }
    
    // Criar nova FAQ
    const { data, error } = await supabase
      .from('site_faqs')
      .insert([{ 
        question: faqData.question,
        answer: faqData.answer,
        order_index: faqData.order,
        active: faqData.active !== undefined ? faqData.active : true
      }])
      .select();
    
    if (error) {
      console.error('Erro ao criar FAQ:', error);
      return null;
    }
    
    if (data && data.length > 0) {
      console.log('FAQ criada com sucesso:', data[0].id);
      return data[0].id;
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao adicionar FAQ:', error);
    return null;
  }
}

// Função para atualizar uma FAQ existente
export async function updateFAQ(id: string, faqData: Partial<Omit<FAQItem, "id">>): Promise<boolean> {
  try {
    const updateData: any = {};
    
    if (faqData.question !== undefined) updateData.question = faqData.question;
    if (faqData.answer !== undefined) updateData.answer = faqData.answer;
    if (faqData.order !== undefined) updateData.order_index = faqData.order;
    if (faqData.active !== undefined) updateData.active = faqData.active;
    
    const { error } = await supabase
      .from('site_faqs')
      .update(updateData)
      .eq('id', id);
    
    if (error) {
      console.error(`Erro ao atualizar FAQ ${id}:`, error);
      return false;
    }
    
    console.log(`FAQ ${id} atualizada com sucesso`);
    return true;
  } catch (error) {
    console.error(`Erro ao atualizar FAQ ${id}:`, error);
    return false;
  }
}

// Função para excluir uma FAQ
export async function deleteFAQ(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('site_faqs')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error(`Erro ao excluir FAQ ${id}:`, error);
      return false;
    }
    
    console.log(`FAQ ${id} excluída com sucesso`);
    return true;
  } catch (error) {
    console.error(`Erro ao excluir FAQ ${id}:`, error);
    return false;
  }
}

// Função para reordenar FAQs
export async function reorderFAQs(orderedIds: string[]): Promise<boolean> {
  try {
    // Primeiro buscar os dados completos das FAQs existentes
    const { data: existingFaqs, error: fetchError } = await supabase
      .from('site_faqs')
      .select('*');
      
    if (fetchError) {
      console.error('Erro ao buscar FAQs para reordenação:', fetchError);
      return false;
    }
    
    // Criar um mapa para acesso rápido às FAQs existentes
    const faqMap = new Map();
    existingFaqs.forEach(faq => {
      faqMap.set(faq.id, faq);
    });
    
    // Preparar atualizações em lote com todos os campos obrigatórios
    const updates = orderedIds.map((id, index) => {
      const existingFaq = faqMap.get(id);
      if (!existingFaq) {
        console.error(`FAQ com ID ${id} não encontrada`);
        return null;
      }
      
      return {
        id,
        question: existingFaq.question,
        answer: existingFaq.answer,
        order_index: index + 1,
        active: existingFaq.active
      };
    }).filter(item => item !== null);
    
    if (updates.length === 0) {
      console.error('Não foi possível preparar as atualizações para reordenação');
      return false;
    }
    
    // Executar atualizações em lote
    const { error } = await supabase
      .from('site_faqs')
      .upsert(updates);
    
    if (error) {
      console.error('Erro ao reordenar FAQs:', error);
      return false;
    }
    
    console.log('FAQs reordenadas com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao reordenar FAQs:', error);
    return false;
  }
}
