
import { supabase } from "@/integrations/supabase/client";
import { SiteTexts } from "./types";

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
    
    if (!data || data.length === 0) {
      console.warn('Nenhum texto encontrado no Supabase, usando localStorage.');
      return getSiteTextsFromLocalStorage();
    }
    
    const textsObject: SiteTexts = {};
    data.forEach(item => {
      if (item.key && item.content) {
        textsObject[item.key] = item.content;
      }
    });
    
    // Atualiza o localStorage com os dados do Supabase para uso offline
    updateSiteTextsInLocalStorage(textsObject);
    
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
    
    let result;
    
    if (data) {
      // Atualizar texto existente
      result = await supabase
        .from('site_texts')
        .update({ 
          content,
          updated_at: new Date()
        })
        .eq('key', key);
    } else {
      // Inserir novo texto
      result = await supabase
        .from('site_texts')
        .insert({ 
          key, 
          content,
          type: 'text'
        });
    }
    
    if (result.error) throw result.error;
    
    // Atualizar também no localStorage para fallback
    const localTexts = getSiteTextsFromLocalStorage();
    updateSiteTextsInLocalStorage({ ...localTexts, [key]: content });
    
    return true;
  } catch (error) {
    console.error('Erro ao atualizar texto do site:', error);
    return false;
  }
}

// Função para obter textos do localStorage (fallback)
export function getSiteTextsFromLocalStorage(): SiteTexts {
  const savedTexts = localStorage.getItem('siteTexts');
  return savedTexts ? JSON.parse(savedTexts) : {
    siteTitle: 'IAdmin',
    footerPhoneNumber: '(11) 93956-965',
    footerEmail: 'iadminassistant@gmail.com',
    footerAbout: 'A sua assistente de AI',
    footerButtonText: 'Contrate uma AI Poderosa!',
    copyrightText: '© Todos os direitos reservados - IAdmin 2024',
    embedActive: false,
    embedPosition: 'right',
    heroTitle: 'Destrave a fronteira da produtividade.',
    heroSubtitle: 'Exploramos os limites da AI Generativa para criar novos produtos, avenidas de receitas e gerar eficiência operacional.'
  };
}

// Função para atualizar textos no localStorage
export function updateSiteTextsInLocalStorage(newTexts: Record<string, any>): void {
  const currentTexts = getSiteTextsFromLocalStorage();
  const updatedTexts = { ...currentTexts, ...newTexts };
  localStorage.setItem('siteTexts', JSON.stringify(updatedTexts));
}

// Função sincronizada para uso por componentes que não podem usar async/await
export const getSiteTexts = (): SiteTexts => {
  // Inicia o carregamento assíncrono para atualizar o localStorage posteriormente
  fetchSiteTexts().then(texts => {
    updateSiteTextsInLocalStorage(texts);
  }).catch(err => {
    console.error("Erro ao sincronizar dados do Supabase:", err);
  });
  
  // Retorna os dados do localStorage imediatamente
  return getSiteTextsFromLocalStorage();
};

// Exportar as funções para compatibilidade com código existente
export const updateSiteTexts = updateSiteTextsInLocalStorage;
