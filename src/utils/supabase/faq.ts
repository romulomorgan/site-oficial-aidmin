
import { supabase } from "@/integrations/supabase/client";
import { FAQItem } from "./types";

// Função para obter perguntas frequentes
export async function fetchFAQs(): Promise<FAQItem[]> {
  try {
    const { data, error } = await supabase
      .from('site_faqs')
      .select('*')
      .eq('active', true)
      .order('order_index');
    
    if (error) {
      console.error('Erro ao carregar FAQs:', error);
      return getFAQsFromLocalStorage();
    }
    
    return data.map(item => ({
      id: item.id,
      question: item.question,
      answer: item.answer
    }));
  } catch (error) {
    console.error('Erro ao buscar FAQs:', error);
    return getFAQsFromLocalStorage();
  }
}

// Função para adicionar FAQ
export async function addFAQ(faq: Omit<FAQItem, 'id'>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('site_faqs')
      .insert([{
        question: faq.question,
        answer: faq.answer,
        active: true,
        order_index: 0, // Pode ser ajustado conforme a lógica de ordenação
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erro ao adicionar FAQ:', error);
    return false;
  }
}

// Função para excluir FAQ
export async function deleteFAQ(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('site_faqs')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erro ao excluir FAQ:', error);
    return false;
  }
}

// Função para obter FAQs do localStorage
export function getFAQsFromLocalStorage(): FAQItem[] {
  const savedFAQs = localStorage.getItem('faqItems');
  
  if (savedFAQs) {
    return JSON.parse(savedFAQs);
  }
  
  return [
    {
      id: '1',
      question: "Como funciona a Inteligência Artificial da Virtia?",
      answer: "A Virtia utiliza tecnologia de ponta em IA para automatizar e otimizar processos na construção civil e outros setores. Nosso sistema analisa dados, identifica padrões e fornece insights valiosos para tomada de decisão."
    },
    {
      id: '2',
      question: "Posso ter uma integração completa com nosso departamento operacional?",
      answer: "Sim, nossos sistemas de IA são desenvolvidos para integrar perfeitamente com seus sistemas existentes, garantindo uma transição suave e eficiente para processos mais automatizados."
    },
    {
      id: '3',
      question: "A Inteligência Artificial funciona com o WhatsApp?",
      answer: "Sim! Nossa IA se integra perfeitamente com o WhatsApp Business, permitindo automação de atendimento, respostas inteligentes e gerenciamento eficiente de conversas com seus clientes."
    },
    {
      id: '4',
      question: "Como funciona a Inteligência Artificial da Virtia?",
      answer: "Nossa IA passa por um treinamento específico para entender seu negócio, processos e desafios únicos. Ela é alimentada com dados relevantes do seu setor e aprende continuamente à medida que interage com seus sistemas e equipe."
    },
    {
      id: '5',
      question: "Posso ter uma conversação natural com a Inteligência Artificial?",
      answer: "Sim! A IA da Virtia foi treinada para entender e responder de forma natural, permitindo uma comunicação fluida e eficiente como se estivesse falando com um assistente humano."
    }
  ];
}
