
import { supabase } from "@/integrations/supabase/client";
import { ColorTemplate } from "./types";
import { defaultTemplates } from "../themeTemplates";

// Função para obter templates de cores
export async function fetchColorTemplates(): Promise<ColorTemplate[]> {
  console.log('Buscando templates de cores do Supabase...');
  try {
    const { data, error } = await supabase
      .from('site_color_templates')
      .select('*');
    
    if (error) {
      console.error('Erro ao carregar templates de cores:', error);
      return getColorTemplatesFromLocalStorage();
    }
    
    // Verificar se temos dados retornados
    if (!data || data.length === 0) {
      console.log('Nenhum template encontrado no Supabase, usando templates locais');
      // Se não há dados no Supabase, vamos tentar inserir os templates padrão
      await insertDefaultTemplates();
      return getColorTemplatesFromLocalStorage();
    }
    
    console.log(`${data.length} templates encontrados no Supabase`);
    
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

// Função para inserir templates padrão no Supabase
async function insertDefaultTemplates(): Promise<boolean> {
  try {
    const templatesForDb = defaultTemplates.map(template => ({
      id: template.id,
      name: template.name,
      primary_color: template.primaryColor,
      secondary_color: template.secondaryColor,
      accent_color: template.accentColor,
      background_color: template.backgroundColor,
      text_color: template.textColor,
      button_text_color: template.buttonTextColor,
      menu_text_color: template.menuTextColor,
      is_default: template.id === 'default',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    const { error } = await supabase
      .from('site_color_templates')
      .insert(templatesForDb);
    
    if (error) {
      console.error('Erro ao inserir templates padrão:', error);
      return false;
    }
    
    console.log('Templates padrão inseridos com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao inserir templates padrão:', error);
    return false;
  }
}

// Função para salvar template de cores
export async function saveColorTemplate(template: ColorTemplate): Promise<boolean> {
  console.log('Salvando template de cores no Supabase:', template.name);
  try {
    // Verificar se o template já existe
    const { data } = await supabase
      .from('site_color_templates')
      .select('id')
      .eq('id', template.id)
      .maybeSingle();
    
    // Preparar o objeto para inserção/atualização no formato do banco
    const templateData = {
      id: template.id,
      name: template.name,
      primary_color: template.primaryColor,
      secondary_color: template.secondaryColor,
      accent_color: template.accentColor,
      background_color: template.backgroundColor,
      text_color: template.textColor,
      button_text_color: template.buttonTextColor || '#FFFFFF',
      menu_text_color: template.menuTextColor || '#FFFFFF',
      is_default: template.isDefault || false,
      updated_at: new Date().toISOString()
    };
    
    if (data) {
      console.log('Atualizando template existente:', template.id);
      // Atualizar template existente
      const { error } = await supabase
        .from('site_color_templates')
        .update(templateData)
        .eq('id', template.id);
      
      if (error) {
        console.error('Erro ao atualizar template:', error);
        throw error;
      }
    } else {
      console.log('Criando novo template:', template.id);
      // Inserir novo template
      // Add the created_at field only when creating a new record
      const { error } = await supabase
        .from('site_color_templates')
        .insert([{
          ...templateData,
          created_at: new Date().toISOString()
        }]);
      
      if (error) {
        console.error('Erro ao inserir template:', error);
        throw error;
      }
    }
    
    // Atualizar também no localStorage para fallback
    const localTemplates = getColorTemplatesFromLocalStorage().filter(t => t.id !== template.id);
    localStorage.setItem('siteTemplates', JSON.stringify([...localTemplates, template]));
    
    console.log('Template salvo com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao salvar template de cores:', error);
    return false;
  }
}

// Função para obter templates de cores do localStorage
export function getColorTemplatesFromLocalStorage(): ColorTemplate[] {
  const savedTemplates = localStorage.getItem('defaultTemplates');
  const customTemplates = localStorage.getItem('siteTemplates');
  let allTemplates: ColorTemplate[] = [];
  
  if (savedTemplates) {
    allTemplates = JSON.parse(savedTemplates);
  }
  
  if (customTemplates) {
    allTemplates = [...allTemplates, ...JSON.parse(customTemplates)];
  }
  
  if (allTemplates.length === 0) {
    return defaultTemplates;
  }
  
  return allTemplates;
}

// Função para excluir um template de cores
export async function deleteColorTemplate(templateId: string): Promise<boolean> {
  console.log('Excluindo template de cores:', templateId);
  try {
    // Verificar se é um template padrão
    if (templateId === 'default') {
      console.error('Não é possível excluir o template padrão');
      return false;
    }
    
    // Excluir do Supabase
    const { error } = await supabase
      .from('site_color_templates')
      .delete()
      .eq('id', templateId);
    
    if (error) {
      console.error('Erro ao excluir template:', error);
      return false;
    }
    
    // Excluir também do localStorage
    const localTemplates = getColorTemplatesFromLocalStorage().filter(t => t.id !== templateId);
    localStorage.setItem('siteTemplates', JSON.stringify(localTemplates.filter(t => t.id !== 'default')));
    
    console.log('Template excluído com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao excluir template de cores:', error);
    return false;
  }
}
