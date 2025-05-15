
import { ColorTemplate } from "../types";
import { defaultTemplates } from "../../themes";

// Função para obter templates de cores do localStorage
export function getColorTemplatesFromLocalStorage(): ColorTemplate[] {
  try {
    const savedTemplates = localStorage.getItem('defaultTemplates');
    const customTemplates = localStorage.getItem('siteTemplates');
    let allTemplates: ColorTemplate[] = [];
    
    if (savedTemplates) {
      try {
        // Garantir que todos os templates tenham as propriedades necessárias
        const parsedTemplates = JSON.parse(savedTemplates).map((template: any) => ({
          ...template,
          buttonTextColor: template.buttonTextColor || '#FFFFFF',
          menuTextColor: template.menuTextColor || '#FFFFFF'
        })) as ColorTemplate[];
        
        allTemplates = parsedTemplates;
      } catch (e) {
        console.error('Erro ao fazer parse dos templates padrão do localStorage:', e);
      }
    }
    
    if (customTemplates) {
      try {
        // Garantir que todos os templates tenham as propriedades necessárias
        const parsedCustomTemplates = JSON.parse(customTemplates).map((template: any) => ({
          ...template,
          buttonTextColor: template.buttonTextColor || '#FFFFFF',
          menuTextColor: template.menuTextColor || '#FFFFFF'
        })) as ColorTemplate[];
        
        allTemplates = [...allTemplates, ...parsedCustomTemplates];
      } catch (e) {
        console.error('Erro ao fazer parse dos templates personalizados do localStorage:', e);
      }
    }
    
    if (allTemplates.length === 0) {
      // Garantir que defaultTemplates também tem as propriedades necessárias
      return defaultTemplates.map(template => ({
        ...template,
        buttonTextColor: template.buttonTextColor || '#FFFFFF',
        menuTextColor: template.menuTextColor || '#FFFFFF'
      })) as ColorTemplate[];
    }
    
    return allTemplates;
  } catch (error) {
    console.error('Erro ao ler templates do localStorage:', error);
    return defaultTemplates.map(template => ({
      ...template,
      buttonTextColor: template.buttonTextColor || '#FFFFFF',
      menuTextColor: template.menuTextColor || '#FFFFFF'
    })) as ColorTemplate[];
  }
}

// Função para salvar template de cores no localStorage
export function saveTemplateToLocalStorage(template: ColorTemplate): boolean {
  try {
    let localTemplates = getColorTemplatesFromLocalStorage().filter(t => t.id !== template.id);
    localStorage.setItem('siteTemplates', JSON.stringify([...localTemplates, template]));
    console.log('Template salvo com sucesso no localStorage');
    return true;
  } catch (e) {
    console.error('Erro ao salvar template no localStorage:', e);
    return false;
  }
}

// Função para excluir template do localStorage
export function deleteTemplateFromLocalStorage(templateId: string): boolean {
  try {
    // Verificar se é um template padrão
    if (templateId === 'default' || defaultTemplates.some(t => t.id === templateId)) {
      console.error('Não é possível excluir templates padrão do localStorage');
      return false;
    }
    
    const localTemplates = getColorTemplatesFromLocalStorage().filter(t => t.id !== templateId);
    localStorage.setItem('siteTemplates', 
      JSON.stringify(localTemplates.filter(t => !defaultTemplates.some(dt => dt.id === t.id))));
    return true;
  } catch (e) {
    console.error('Erro ao excluir template do localStorage:', e);
    return false;
  }
}
