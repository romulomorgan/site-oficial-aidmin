
import { supabase } from "@/integrations/supabase/client";
import { ColorTemplate } from "../types";
import { defaultTemplates } from "../../themes";

// Função para buscar templates de cores do banco de dados
export async function fetchFromDb(): Promise<ColorTemplate[]> {
  try {
    const { data, error } = await supabase
      .from('site_color_templates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erro ao buscar templates de cores:', error);
      return defaultTemplates;
    }
    
    if (!data || data.length === 0) {
      console.log('Nenhum template de cores encontrado no banco, usando padrões');
      
      // Insira os templates padrão no banco se não houver nenhum
      await insertDefaultTemplates();
      
      return defaultTemplates;
    }
    
    // Mapear para o formato esperado pela aplicação
    const templates = data.map(item => ({
      id: item.id,
      name: item.name,
      primaryColor: item.primary_color,
      secondaryColor: item.secondary_color,
      accentColor: item.accent_color,
      backgroundColor: item.background_color,
      textColor: item.text_color,
      buttonTextColor: item.button_text_color || '#FFFFFF',
      menuTextColor: item.menu_text_color || '#FFFFFF'
    }));
    
    // Adicionar templates padrão caso não existam no banco
    const standardTemplateIds = defaultTemplates.map(t => t.id);
    const missingStandardTemplates = defaultTemplates.filter(
      t => !templates.some(dbTemplate => dbTemplate.id === t.id)
    );
    
    // Se houver templates padrão ausentes, insira-os no banco
    if (missingStandardTemplates.length > 0) {
      await insertSpecificTemplates(missingStandardTemplates);
    }
    
    return [...templates, ...missingStandardTemplates];
  } catch (error) {
    console.error('Erro ao buscar templates de cores:', error);
    return defaultTemplates;
  }
}

// Função para inserir todos os templates padrão no banco
async function insertDefaultTemplates(): Promise<void> {
  try {
    const templateData = defaultTemplates.map(template => ({
      id: template.id,
      name: template.name,
      primary_color: template.primaryColor,
      secondary_color: template.secondaryColor,
      accent_color: template.accentColor,
      background_color: template.backgroundColor,
      text_color: template.textColor,
      button_text_color: template.buttonTextColor || '#FFFFFF',
      menu_text_color: template.menuTextColor || '#FFFFFF',
      is_default: template.id === 'default' || template.id.startsWith('modern') || template.id.startsWith('gradient'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
    
    const { error } = await supabase
      .from('site_color_templates')
      .insert(templateData);
    
    if (error) {
      console.error('Erro ao inserir templates padrão:', error);
    } else {
      console.log('Templates padrão inseridos com sucesso');
    }
  } catch (error) {
    console.error('Erro ao inserir templates padrão:', error);
  }
}

// Função para inserir templates específicos no banco
async function insertSpecificTemplates(templates: ColorTemplate[]): Promise<void> {
  try {
    const templateData = templates.map(template => ({
      id: template.id,
      name: template.name,
      primary_color: template.primaryColor,
      secondary_color: template.secondaryColor,
      accent_color: template.accentColor,
      background_color: template.backgroundColor,
      text_color: template.textColor,
      button_text_color: template.buttonTextColor || '#FFFFFF',
      menu_text_color: template.menuTextColor || '#FFFFFF',
      is_default: template.id === 'default' || template.id.startsWith('modern') || template.id.startsWith('gradient'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
    
    const { error } = await supabase
      .from('site_color_templates')
      .insert(templateData);
    
    if (error) {
      console.error('Erro ao inserir templates específicos:', error);
    } else {
      console.log(`${templates.length} templates inseridos com sucesso`);
    }
  } catch (error) {
    console.error('Erro ao inserir templates específicos:', error);
  }
}

// Função para salvar template de cores no banco de dados
export async function saveTemplateToDb(template: ColorTemplate): Promise<boolean> {
  try {
    // Verificar se o template já existe
    const { data: existingTemplate } = await supabase
      .from('site_color_templates')
      .select('id')
      .eq('id', template.id)
      .maybeSingle();
    
    const templateData = {
      name: template.name,
      primary_color: template.primaryColor,
      secondary_color: template.secondaryColor,
      accent_color: template.accentColor,
      background_color: template.backgroundColor,
      text_color: template.textColor,
      button_text_color: template.buttonTextColor || '#FFFFFF',
      menu_text_color: template.menuTextColor || '#FFFFFF',
      is_default: template.id === 'default',
      updated_at: new Date().toISOString()
    };
    
    if (existingTemplate) {
      // Atualizar template existente
      const { error } = await supabase
        .from('site_color_templates')
        .update(templateData)
        .eq('id', template.id);
      
      if (error) {
        console.error('Erro ao atualizar template:', error);
        return false;
      }
    } else {
      // Criar novo template
      const { error } = await supabase
        .from('site_color_templates')
        .insert([{
          id: template.id,
          ...templateData,
          created_at: new Date().toISOString()
        }]);
      
      if (error) {
        console.error('Erro ao criar template:', error);
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar template no banco:', error);
    return false;
  }
}

// Função para excluir template do banco de dados
export async function deleteTemplateFromDb(templateId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('site_color_templates')
      .delete()
      .eq('id', templateId);
    
    if (error) {
      console.error('Erro ao excluir template:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao excluir template do banco:', error);
    return false;
  }
}
