
import { supabase } from "@/integrations/supabase/client";
import { Testimonial } from "./types";

// Função para buscar depoimentos
export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('site_testimonials')
      .select('id, name, role, testimonial, avatar_url')
      .order('order_index', { ascending: true });

    if (error) {
      console.error('Erro ao buscar depoimentos:', error);
      return getTestimonialsFromLocalStorage();
    }

    if (!data || data.length === 0) {
      console.warn('Nenhum depoimento encontrado, usando localStorage');
      return getTestimonialsFromLocalStorage();
    }

    // Mapear os dados do banco para o formato esperado pela aplicação
    const testimonials = data.map(item => ({
      id: item.id,
      name: item.name,
      role: item.role,
      testimonial: item.testimonial,
      avatarUrl: item.avatar_url || 'https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/99958c2062e54bcd396af977cf7591eddd0afa70?placeholderIfAbsent=true'
    }));

    // Atualizar o localStorage para uso offline
    localStorage.setItem('testimonials', JSON.stringify(testimonials));

    return testimonials;
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    return getTestimonialsFromLocalStorage();
  }
}

// Função para adicionar um novo depoimento
export async function addTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<boolean> {
  try {
    console.log('Adicionando depoimento:', testimonial);
    const { error } = await supabase
      .from('site_testimonials')
      .insert({
        name: testimonial.name,
        role: testimonial.role,
        testimonial: testimonial.testimonial,
        avatar_url: testimonial.avatarUrl,
        order_index: await getNextOrderIndex()
      });

    if (error) {
      console.error('Erro ao adicionar depoimento:', error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Erro ao adicionar depoimento:', error);
    return false;
  }
}

// Função para atualizar um depoimento existente
export async function updateTestimonial(id: string, testimonial: Omit<Testimonial, 'id'>): Promise<boolean> {
  try {
    console.log('Atualizando depoimento:', id, testimonial);
    const { error } = await supabase
      .from('site_testimonials')
      .update({
        name: testimonial.name,
        role: testimonial.role,
        testimonial: testimonial.testimonial,
        avatar_url: testimonial.avatarUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', id);

    if (error) {
      console.error('Erro ao atualizar depoimento:', error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Erro ao atualizar depoimento:', error);
    return false;
  }
}

// Função para excluir um depoimento
export async function deleteTestimonial(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('site_testimonials')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Erro ao excluir depoimento:', error);
      throw error;
    }
    return true;
  } catch (error) {
    console.error('Erro ao excluir depoimento:', error);
    return false;
  }
}

// Função auxiliar para obter o próximo índice de ordenação
async function getNextOrderIndex(): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('site_testimonials')
      .select('order_index')
      .order('order_index', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) return 0;
    return (data[0].order_index || 0) + 1;
  } catch (error) {
    console.error('Erro ao obter próximo índice:', error);
    return 0;
  }
}

// Função para obter depoimentos do localStorage (fallback)
function getTestimonialsFromLocalStorage(): Testimonial[] {
  const savedData = localStorage.getItem('testimonials');
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (e) {
      console.error('Erro ao parsear dados de depoimentos do localStorage:', e);
    }
  }
  
  // Retornar dados padrão caso não haja dados no localStorage
  return [
    {
      id: '1',
      name: 'João Silva',
      role: 'CEO da TechSolutions',
      testimonial: 'O serviço de AI revolucionou nossa produtividade. Não sei como vivíamos sem isso antes!',
      avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '2',
      name: 'Maria Santos',
      role: 'Diretora de Marketing',
      testimonial: 'Implementamos o assistente AI e observamos um aumento de 40% na satisfação dos clientes.',
      avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '3',
      name: 'Carlos Mendes',
      role: 'Gerente de Projetos',
      testimonial: 'A ferramenta de AI nos ajudou a identificar gargalos em nossos processos que nunca teríamos encontrado sozinhos.',
      avatarUrl: 'https://randomuser.me/api/portraits/men/67.jpg'
    }
  ];
}

// Função para uso síncrono que busca do localStorage e inicia carregamento do Supabase
export const getTestimonials = (): Testimonial[] => {
  // Inicia o carregamento assíncrono para atualizar o localStorage posteriormente
  fetchTestimonials().catch(err => {
    console.error("Erro ao sincronizar depoimentos com Supabase:", err);
  });
  
  // Retorna os dados do localStorage imediatamente
  return getTestimonialsFromLocalStorage();
};
