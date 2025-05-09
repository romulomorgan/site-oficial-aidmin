
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

// Função para obter textos do localStorage (fallback)
export function getSiteTextsFromLocalStorage(): SiteTexts {
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
export function updateSiteTextsInLocalStorage(newTexts: Record<string, any>): void {
  const currentTexts = getSiteTextsFromLocalStorage();
  const updatedTexts = { ...currentTexts, ...newTexts };
  localStorage.setItem('siteTexts', JSON.stringify(updatedTexts));
}

// Exportar as funções para compatibilidade com código existente
export const getSiteTexts = getSiteTextsFromLocalStorage;
export const updateSiteTexts = updateSiteTextsInLocalStorage;
