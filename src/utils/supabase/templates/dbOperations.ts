
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
      
      // Tentar buscar novamente após a inserção
      const { data: newData, error: newError } = await supabase
        .from('site_color_templates')
        .select('*');
        
      if (newError || !newData || newData.length === 0) {
        return getColorTemplatesFromLocalStorage();
      }
      
      console.log(`${newData.length} templates encontrados após a inserção`);
      
      // Converter formato do banco para o formato usado no frontend
      return newData.map(template => ({
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
    // Importar todos os templates, incluindo os modernos
    const { allTemplates } = await import('../../themes');
    
    // Adicionar templates modernos
    const modernTemplates = [
      {
        id: 'modern-teal',
        name: 'Moderno Teal',
        primaryColor: '#00897B',
        secondaryColor: '#263238',
        accentColor: '#4DB6AC',
        backgroundColor: '#FFFFFF',
        textColor: '#263238',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      },
      {
        id: 'modern-purple',
        name: 'Moderno Roxo',
        primaryColor: '#6A1B9A',
        secondaryColor: '#283593',
        accentColor: '#9575CD',
        backgroundColor: '#F8F9FA',
        textColor: '#37474F',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      },
      {
        id: 'modern-navy',
        name: 'Moderno Navy',
        primaryColor: '#1A237E',
        secondaryColor: '#0D47A1',
        accentColor: '#42A5F5',
        backgroundColor: '#FAFAFA',
        textColor: '#212121',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      },
      {
        id: 'modern-coral',
        name: 'Moderno Coral',
        primaryColor: '#FF5252',
        secondaryColor: '#455A64',
        accentColor: '#FF8A80',
        backgroundColor: '#FFFFFF',
        textColor: '#37474F',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      },
      {
        id: 'modern-green',
        name: 'Moderno Verde',
        primaryColor: '#2E7D32',
        secondaryColor: '#1B5E20',
        accentColor: '#81C784',
        backgroundColor: '#F5F5F5',
        textColor: '#212121',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      },
      {
        id: 'modern-amber',
        name: 'Moderno Âmbar',
        primaryColor: '#FF8F00',
        secondaryColor: '#795548',
        accentColor: '#FFB74D',
        backgroundColor: '#FFFFFF',
        textColor: '#37474F',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      },
      {
        id: 'modern-red',
        name: 'Moderno Vermelho',
        primaryColor: '#C62828',
        secondaryColor: '#37474F',
        accentColor: '#EF5350',
        backgroundColor: '#FAFAFA',
        textColor: '#212121',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      },
      {
        id: 'modern-indigo',
        name: 'Moderno Índigo',
        primaryColor: '#3949AB',
        secondaryColor: '#283593',
        accentColor: '#7986CB',
        backgroundColor: '#FFFFFF',
        textColor: '#212121',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      },
      {
        id: 'modern-brown',
        name: 'Moderno Marrom',
        primaryColor: '#5D4037',
        secondaryColor: '#3E2723',
        accentColor: '#8D6E63',
        backgroundColor: '#F5F5F5',
        textColor: '#212121',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      },
      {
        id: 'modern-cyan',
        name: 'Moderno Ciano',
        primaryColor: '#0097A7',
        secondaryColor: '#006064',
        accentColor: '#4DD0E1',
        backgroundColor: '#FFFFFF',
        textColor: '#263238',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      }
    ];
    
    // Combinar templates padrão com modernos
    const templatesParaDb = [...allTemplates, ...modernTemplates].map(template => ({
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
    const newTemplates = templatesParaDb.filter(t => !existingIds.includes(t.id));
    
    if (newTemplates.length === 0) {
      console.log('Todos os templates padrão já estão inseridos');
      return true;
    }

    console.log(`Inserindo ${newTemplates.length} templates no banco de dados...`);

    // Dividir a inserção em lotes menores para evitar problemas com limites de tamanho de payload
    const batchSize = 5;
    for (let i = 0; i < newTemplates.length; i += batchSize) {
      const batch = newTemplates.slice(i, i + batchSize);
      const { error } = await supabase
        .from('site_color_templates')
        .insert(batch);
      
      if (error) {
        console.error(`Erro ao inserir lote de templates ${i}/${newTemplates.length}:`, error);
        // Continuar com o próximo lote mesmo em caso de erro
      } else {
        console.log(`Lote ${i/batchSize + 1} inserido com sucesso (${batch.length} templates)`);
      }
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
    console.log('Salvando template no banco de dados:', template);
    
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
