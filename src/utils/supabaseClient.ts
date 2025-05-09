
import { supabase } from "@/integrations/supabase/client";

// Site data types
export interface SiteTexts {
  [key: string]: string | boolean | undefined;
}

export interface ColorTemplate {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  buttonTextColor?: string;
  menuTextColor?: string;
  isDefault?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  testimonial: string;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface EmbedConfig {
  code: string;
  position: 'left' | 'right';
  isActive: boolean;
}

// Função para obter textos do site
export async function fetchSiteTexts(): Promise<SiteTexts> {
  try {
    const { data, error } = await supabase
      .from('site_texts')
      .select('key, content');
    
    if (error) {
      console.error('Erro ao carregar textos do site:', error);
      return getSiteTextsFromLocalStorage();
    }
    
    const textsObject: SiteTexts = {};
    data.forEach(item => {
      textsObject[item.key] = item.content;
    });
    
    return textsObject;
  } catch (error) {
    console.error('Erro ao buscar textos do site:', error);
    return getSiteTextsFromLocalStorage();
  }
}

// Função para atualizar textos do site
export async function updateSiteText(key: string, content: string): Promise<boolean> {
  try {
    // Verificar se o texto já existe
    const { data } = await supabase
      .from('site_texts')
      .select('id')
      .eq('key', key)
      .single();
    
    if (data) {
      // Atualizar texto existente
      const { error } = await supabase
        .from('site_texts')
        .update({ content })
        .eq('key', key);
      
      if (error) throw error;
    } else {
      // Inserir novo texto
      const { error } = await supabase
        .from('site_texts')
        .insert({ key, content });
      
      if (error) throw error;
    }
    
    // Atualizar também no localStorage para fallback
    const localTexts = getSiteTextsFromLocalStorage();
    updateSiteTextsInLocalStorage({ ...localTexts, [key]: content });
    
    return true;
  } catch (error) {
    console.error('Erro ao atualizar texto do site:', error);
    return false;
  }
}

// Função para obter templates de cores
export async function fetchColorTemplates(): Promise<ColorTemplate[]> {
  try {
    const { data, error } = await supabase
      .from('site_color_templates')
      .select('*');
    
    if (error) {
      console.error('Erro ao carregar templates de cores:', error);
      return getColorTemplatesFromLocalStorage();
    }
    
    // Converter formato do banco para o formato usado no frontend
    return data.map(template => ({
      id: template.id,
      name: template.name,
      primaryColor: template.primary_color,
      secondaryColor: template.secondary_color,
      accentColor: template.accent_color,
      backgroundColor: template.background_color,
      textColor: template.text_color,
      buttonTextColor: template.button_text_color || '#FFFFFF',
      menuTextColor: template.menu_text_color || '#FFFFFF',
      isDefault: template.is_default
    }));
  } catch (error) {
    console.error('Erro ao buscar templates de cores:', error);
    return getColorTemplatesFromLocalStorage();
  }
}

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

// ===== FUNÇÕES DE FALLBACK PARA LOCALSTORAGE =====

// Função para obter textos do localStorage (fallback)
function getSiteTextsFromLocalStorage(): SiteTexts {
  const savedTexts = localStorage.getItem('siteTexts');
  return savedTexts ? JSON.parse(savedTexts) : {
    siteTitle: 'Virtia',
    footerPhoneNumber: '+1 (415) 343-6587',
    footerEmail: 'contato@virtia.ai',
    footerAbout: 'A sua assistente de AI',
    footerButtonText: 'Contrate a Virtia',
    copyrightText: '© Todos os direitos reservados - Virtia 2023',
    embedActive: false,
    embedPosition: 'right',
    heroTitle: 'Destrave a fronteira da produtividade.',
    heroSubtitle: 'Exploramos os limites da AI Generativa para criar novos produtos, avenidas de receitas e gerar eficiência operacional.'
  };
}

// Função para atualizar textos no localStorage
function updateSiteTextsInLocalStorage(newTexts: Record<string, any>): void {
  const currentTexts = getSiteTextsFromLocalStorage();
  const updatedTexts = { ...currentTexts, ...newTexts };
  localStorage.setItem('siteTexts', JSON.stringify(updatedTexts));
}

// Função para obter templates de cores do localStorage
function getColorTemplatesFromLocalStorage(): ColorTemplate[] {
  const savedTemplates = localStorage.getItem('defaultTemplates');
  const customTemplates = localStorage.getItem('siteTemplates');
  let allTemplates: ColorTemplate[] = [];
  
  if (savedTemplates) {
    allTemplates = JSON.parse(savedTemplates);
  }
  
  if (customTemplates) {
    allTemplates = [...allTemplates, ...JSON.parse(customTemplates)];
  }
  
  return allTemplates.length > 0 ? allTemplates : [
    {
      id: 'default-1',
      name: 'Tema Padrão Virtia',
      primaryColor: '#FF196E',
      secondaryColor: '#2D0A16',
      accentColor: '#FF4F8E',
      backgroundColor: '#FFFFFF',
      textColor: '#222222',
      isDefault: true
    }
  ];
}

// Função para obter depoimentos do localStorage
function getTestimonialsFromLocalStorage(): Testimonial[] {
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

// Função para obter FAQs do localStorage
function getFAQsFromLocalStorage(): FAQItem[] {
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

// Exportar as funções para compatibilidade com código existente
export const getSiteTexts = getSiteTextsFromLocalStorage;
export const updateSiteTexts = updateSiteTextsInLocalStorage;
