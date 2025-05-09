
import { supabase } from "@/integrations/supabase/client";
import { SiteTexts } from "./types";

// Função para buscar todos os textos do site
export async function fetchSiteTexts(): Promise<SiteTexts> {
  console.log('Buscando textos do site do Supabase...');
  try {
    const { data, error } = await supabase
      .from('site_texts')
      .select('*');
    
    if (error) {
      console.error('Erro ao carregar textos do site:', error);
      return {};
    }
    
    // Converter array para objeto chave-valor
    const texts: SiteTexts = {};
    if (data && data.length > 0) {
      data.forEach(item => {
        texts[item.key] = item.content;
      });
      console.log(`${data.length} textos carregados do Supabase`);
    } else {
      console.log('Nenhum texto encontrado no Supabase');
    }
    
    return texts;
  } catch (error) {
    console.error('Erro ao buscar textos do site:', error);
    return {};
  }
}

// Função para salvar um texto específico
export async function saveSiteText(key: string, content: string): Promise<boolean> {
  console.log(`Salvando texto no Supabase: ${key}`);
  try {
    // Verificar se o texto já existe
    const { data: existingText } = await supabase
      .from('site_texts')
      .select('id')
      .eq('key', key)
      .maybeSingle();
    
    if (existingText) {
      // Atualizar texto existente
      const { error } = await supabase
        .from('site_texts')
        .update({ 
          content,
          updated_at: new Date().toISOString()
        })
        .eq('key', key);
      
      if (error) {
        console.error(`Erro ao atualizar texto ${key}:`, error);
        return false;
      }
    } else {
      // Criar novo texto
      const { error } = await supabase
        .from('site_texts')
        .insert([{ 
          key, 
          content,
          type: 'text',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
      
      if (error) {
        console.error(`Erro ao criar texto ${key}:`, error);
        return false;
      }
    }
    
    console.log(`Texto ${key} salvo com sucesso`);
    return true;
  } catch (error) {
    console.error(`Erro ao salvar texto ${key}:`, error);
    return false;
  }
}

// Função para atualizar um texto específico
export async function updateSiteText(key: string, content: string | boolean): Promise<boolean> {
  console.log(`Atualizando texto no Supabase: ${key}`);
  try {
    // Verificar se o texto já existe
    const { data: existingText } = await supabase
      .from('site_texts')
      .select('id')
      .eq('key', key)
      .maybeSingle();
    
    const textData = {
      content: typeof content === 'string' ? content : JSON.stringify(content),
      type: typeof content === 'string' ? 'text' : 'boolean',
      updated_at: new Date().toISOString()
    };
    
    if (existingText) {
      // Atualizar texto existente
      const { error } = await supabase
        .from('site_texts')
        .update(textData)
        .eq('key', key);
      
      if (error) {
        console.error(`Erro ao atualizar texto ${key}:`, error);
        return false;
      }
    } else {
      // Criar novo texto
      const { error } = await supabase
        .from('site_texts')
        .insert([{ 
          key, 
          ...textData,
          created_at: new Date().toISOString()
        }]);
      
      if (error) {
        console.error(`Erro ao criar texto ${key}:`, error);
        return false;
      }
    }
    
    console.log(`Texto ${key} atualizado com sucesso`);
    return true;
  } catch (error) {
    console.error(`Erro ao atualizar texto ${key}:`, error);
    return false;
  }
}
