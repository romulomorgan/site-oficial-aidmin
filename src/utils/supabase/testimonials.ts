
import { supabase } from "@/integrations/supabase/client";
import { Testimonial } from "./types";

// Função para obter depoimentos
export async function fetchTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('site_testimonials')
      .select('*')
      .order('order_index');
    
    if (error) {
      console.error('Erro ao carregar depoimentos:', error);
      return getTestimonialsFromLocalStorage();
    }
    
    return data.map(item => ({
      id: item.id,
      name: item.name,
      role: item.role,
      testimonial: item.testimonial,
      avatarUrl: item.avatar_url
    }));
  } catch (error) {
    console.error('Erro ao buscar depoimentos:', error);
    return getTestimonialsFromLocalStorage();
  }
}

// Função para adicionar depoimento
export async function addTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<boolean> {
  try {
    console.log('Adicionando depoimento:', testimonial);
    
    // Preparar o objeto para inserção no formato do banco
    const { error } = await supabase
      .from('site_testimonials')
      .insert([{
        name: testimonial.name,
        role: testimonial.role,
        testimonial: testimonial.testimonial,
        avatar_url: testimonial.avatarUrl,
        order_index: 0, // Pode ser ajustado conforme a lógica de ordenação
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);
    
    if (error) {
      console.error('Erro específico ao adicionar depoimento:', error);
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao adicionar depoimento:', error);
    return false;
  }
}

// Função para excluir depoimento
export async function deleteTestimonial(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('site_testimonials')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Erro ao excluir depoimento:', error);
    return false;
  }
}

// Função para obter depoimentos do localStorage
export function getTestimonialsFromLocalStorage(): Testimonial[] {
  const savedTestimonials = localStorage.getItem('testimonials');
  
  if (savedTestimonials) {
    return JSON.parse(savedTestimonials);
  }
  
  return [
    {
      id: '1',
      name: "Carlos M.",
      role: "Gerente de Projetos",
      testimonial: "Com a AI da Virtia, conseguimos reduzir o tempo de planejamento em 30%. Ela nos fornece insights precisos, ajustando automaticamente o cronograma de acordo com o andamento das obras. Nunca tivemos tanto controle!",
      avatarUrl: "https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/99958c2062e54bcd396af977cf7591eddd0afa70?placeholderIfAbsent=true"
    },
    {
      id: '2',
      name: "Mariana P.",
      role: "Diretora de operações",
      testimonial: "A Virtia trouxe uma transformação real à nossa empresa. A rapidez com que automatiza processos e interpreta documentos é impressionante, e seu sistema de apoio à decisão nos permite ser mais estratégicos.",
      avatarUrl: "https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/09b122a661f457926e57ea75f3ccd16a13770c01?placeholderIfAbsent=true"
    },
    {
      id: '3',
      name: "Lucas K.",
      role: "Coordenador de obras",
      testimonial: "O que a Virtia realiza diária do nosso time com SmartCity é preciso e intuitivo. A visualização de relatórios e o gerenciamento ágil são diferenciais que nos ajudam a manter as obras no cronograma.",
      avatarUrl: "https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/8491a3ecf4b307f91edcd2d89f2c8c01096ca3cb?placeholderIfAbsent=true"
    }
  ];
}
