
import { supabase } from "@/integrations/supabase/client";
import { ColorTemplate } from "./types";

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

// Função para salvar template de cores
export async function saveColorTemplate(template: ColorTemplate): Promise<boolean> {
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
      // Atualizar template existente
      const { error } = await supabase
        .from('site_color_templates')
        .update(templateData)
        .eq('id', template.id);
      
      if (error) throw error;
    } else {
      // Inserir novo template
      // Add the created_at field only when creating a new record
      const { error } = await supabase
        .from('site_color_templates')
        .insert([{
          ...templateData,
          created_at: new Date().toISOString()
        }]);
      
      if (error) throw error;
    }
    
    // Atualizar também no localStorage para fallback
    const localTemplates = getColorTemplatesFromLocalStorage().filter(t => t.id !== template.id);
    localStorage.setItem('siteTemplates', JSON.stringify([...localTemplates, template]));
    
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
