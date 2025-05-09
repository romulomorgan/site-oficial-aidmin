
import { supabase } from "@/integrations/supabase/client";
import { ColorTemplate } from "../types";
import { defaultTemplates } from "../../themes";
import { getColorTemplatesFromLocalStorage } from "./localStorage";

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
export async function insertDefaultTemplates(): Promise<boolean> {
  try {
    const templatesForDb = defaultTemplates.map(template => ({
      id: template.id,
      name: template.name,
      primary_color: template.primaryColor,
      secondary_color: template.secondaryColor,
      accent_color: template.accentColor,
      background_color: template.backgroundColor,
      text_color: template.textColor,
      button_text_color: template.buttonTextColor || '#FFFFFF',
      menu_text_color: template.menuTextColor || '#FFFFFF',
      is_default: template.id === 'default',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    // Verificar templates existentes para evitar duplicações
    const { data: existingTemplates } = await supabase
      .from('site_color_templates')
      .select('id');
    
    const existingIds = existingTemplates ? existingTemplates.map(t => t.id) : [];
    
    // Filtrar apenas templates que não existem ainda
    const newTemplates = templatesForDb.filter(t => !existingIds.includes(t.id));
    
    if (newTemplates.length === 0) {
      console.log('Todos os templates padrão já estão inseridos');
      return true;
    }

    const { error } = await supabase
      .from('site_color_templates')
      .insert(newTemplates);
    
    if (error) {
      console.error('Erro ao inserir templates padrão:', error);
      return false;
    }
    
    console.log(`${newTemplates.length} templates padrão inseridos com sucesso`);
    return true;
  } catch (error) {
    console.error('Erro ao inserir templates padrão:', error);
    return false;
  }
}

// Função para salvar template de cores no Supabase
export async function saveTemplateToDb(template: ColorTemplate): Promise<boolean> {
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
    
    let result;
    
    if (data) {
      console.log('Atualizando template existente:', template.id);
      // Atualizar template existente
      result = await supabase
        .from('site_color_templates')
        .update(templateData)
        .eq('id', template.id);
    } else {
      console.log('Criando novo template:', template.id);
      // Inserir novo template com created_at
      result = await supabase
        .from('site_color_templates')
        .insert([{
          ...templateData,
          created_at: new Date().toISOString()
        }]);
    }
    
    if (result.error) {
      console.error('Erro ao salvar template no Supabase:', result.error);
      return false;
    }
    
    console.log('Template salvo com sucesso no Supabase');
    return true;
  } catch (error) {
    console.error('Erro ao salvar template no banco:', error);
    return false;
  }
}

// Função para excluir um template de cores do banco
export async function deleteTemplateFromDb(templateId: string): Promise<boolean> {
  try {
    // Verificar se é um template padrão
    if (templateId === 'default' || defaultTemplates.some(t => t.id === templateId)) {
      console.error('Não é possível excluir templates padrão');
      return false;
    }
    
    // Excluir do Supabase
    const { error } = await supabase
      .from('site_color_templates')
      .delete()
      .eq('id', templateId);
    
    if (error) {
      console.error('Erro ao excluir template do Supabase:', error);
      return false;
    }
    
    console.log('Template excluído com sucesso do banco');
    return true;
  } catch (error) {
    console.error('Erro ao excluir template do banco:', error);
    return false;
  }
}
