
import { supabase } from "@/integrations/supabase/client";
import { ColorTemplate } from "../types";

// Função para buscar templates de cores do banco de dados
export async function fetchFromDb(): Promise<ColorTemplate[]> {
  try {
    const { data, error } = await supabase
      .from('site_color_templates')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Erro ao buscar templates de cores:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log('Nenhum template de cores encontrado no banco');
      return [];
    }
    
    // Mapear para o formato esperado pela aplicação
    return data.map(item => ({
      id: item.id,
      name: item.name,
      primaryColor: item.primary_color,
      secondaryColor: item.secondary_color,
      accentColor: item.accent_color,
      backgroundColor: item.background_color,
      textColor: item.text_color,
      buttonTextColor: item.button_text_color || '#FFFFFF',
      menuTextColor: item.menu_text_color || '#FFFFFF',
      is_default: item.is_default
    }));
  } catch (error) {
    console.error('Erro ao buscar templates de cores:', error);
    return [];
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
      is_default: template.is_default || false,
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
          id: template.id.startsWith('custom-') ? undefined : template.id, // Deixar o Supabase gerar ID se for personalizado
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
