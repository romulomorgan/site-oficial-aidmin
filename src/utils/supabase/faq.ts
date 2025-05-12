
import { supabase } from "@/integrations/supabase/client";
import { FAQItem } from "./types";

// Função para buscar FAQs do Supabase
export async function fetchFAQs(): Promise<FAQItem[]> {
  try {
    const { data, error } = await supabase
      .from('site_faqs')
      .select('id, question, answer')
      .eq('active', true)
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Erro ao buscar FAQs:', error);
      return getFAQsFromLocalStorage();
    }

    if (!data || data.length === 0) {
      console.warn('Nenhuma FAQ encontrada, usando localStorage');
      return getFAQsFromLocalStorage();
    }

    // Atualizar o localStorage para uso offline
    localStorage.setItem('faqs', JSON.stringify(data));

    return data;
  } catch (error) {
    console.error('Erro ao buscar FAQs:', error);
    return getFAQsFromLocalStorage();
  }
}

// Função para adicionar uma nova FAQ
export async function addFAQ(faq: Omit<FAQItem, 'id'>): Promise<boolean> {
  try {
    console.log('Adicionando FAQ:', faq);
    const { error } = await supabase
      .from('site_faqs')
      .insert({
        question: faq.question,
        answer: faq.answer,
        active: faq.active !== undefined ? faq.active : true,
        order_index: await getNextOrderIndex()
      });

    if (error) {
      console.error('Erro ao adicionar FAQ:', error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Erro ao adicionar FAQ:', error);
    return false;
  }
}

// Função para atualizar uma FAQ existente
export async function updateFAQ(id: string, faq: Omit<FAQItem, 'id'>): Promise<boolean> {
  try {
    console.log('Atualizando FAQ:', id, faq);
    const { error } = await supabase
      .from('site_faqs')
      .update({
        question: faq.question,
        answer: faq.answer,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar FAQ:', error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Erro ao atualizar FAQ:', error);
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
      console.error('Erro ao excluir FAQ:', error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Erro ao excluir FAQ:', error);
    return false;
  }
}

// Função auxiliar para obter o próximo índice de ordenação
async function getNextOrderIndex(): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('site_faqs')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) return 0;
    return (data[0].order_index || 0) + 1;
  } catch (error) {
    console.error('Erro ao obter próximo índice para FAQ:', error);
    return 0;
  }
}

// Função para obter FAQs do localStorage (fallback)
function getFAQsFromLocalStorage(): FAQItem[] {
  const savedData = localStorage.getItem('faqs');
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (e) {
      console.error('Erro ao parsear dados de FAQs do localStorage:', e);
    }
  }
  
  // Retornar dados padrão caso não haja dados no localStorage
  return [
    {
      id: '1',
      question: 'O que é um assistente de AI?',
      answer: 'Um assistente de AI é uma solução de software que utiliza inteligência artificial para automatizar tarefas, responder perguntas e auxiliar em diversas atividades do dia a dia.'
    },
    {
      id: '2',
      question: 'Como a AI pode ajudar minha empresa?',
      answer: 'A AI pode aumentar a eficiência operacional, melhorar o atendimento ao cliente, automatizar tarefas repetitivas, analisar grandes volumes de dados e gerar insights valiosos para a tomada de decisão.'
    },
    {
      id: '3',
      question: 'Quanto tempo leva para implementar uma solução de AI?',
      answer: 'O tempo de implementação varia conforme a complexidade da solução. Projetos simples podem ser implementados em semanas, enquanto soluções mais complexas podem levar alguns meses.'
    }
  ];
}

// Função para uso síncrono que busca do localStorage e inicia carregamento do Supabase
export const getFAQs = (): FAQItem[] => {
  // Inicia o carregamento assíncrono para atualizar o localStorage posteriormente
  fetchFAQs().catch(err => {
    console.error("Erro ao sincronizar FAQs com Supabase:", err);
  });
  
  // Retorna os dados do localStorage imediatamente
  return getFAQsFromLocalStorage();
};
