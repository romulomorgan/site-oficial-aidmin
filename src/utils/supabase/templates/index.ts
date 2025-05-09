
import { ColorTemplate } from "../types";
import { 
  fetchColorTemplates as fetchFromDb, 
  saveTemplateToDb, 
  deleteTemplateFromDb 
} from "./dbOperations";
import { 
  saveTemplateToLocalStorage, 
  deleteTemplateFromLocalStorage 
} from "./localStorage";
import { defaultTemplates } from "../../themes";

// Função para obter templates de cores
export async function fetchColorTemplates(): Promise<ColorTemplate[]> {
  return await fetchFromDb();
}

// Função para salvar template de cores (banco e localStorage)
export async function saveColorTemplate(template: ColorTemplate): Promise<boolean> {
  console.log('Salvando template de cores:', template);
  
  try {
    // Gerar um ID único se não existir ou se for 'custom'
    if (!template.id || template.id === 'custom') {
      template.id = `custom-${Date.now()}`;
    }
    
    // Salvar no banco de dados
    const dbSuccess = await saveTemplateToDb(template);
    
    // Salvar também no localStorage para fallback
    const localSuccess = saveTemplateToLocalStorage(template);
    
    return dbSuccess || localSuccess;
  } catch (error) {
    console.error('Erro ao salvar template de cores:', error);
    return false;
  }
}

// Função para excluir um template de cores
export async function deleteColorTemplate(templateId: string): Promise<boolean> {
  console.log('Excluindo template de cores:', templateId);
  
  // Verificar se é um template padrão
  if (templateId === 'default' || defaultTemplates.some(t => t.id === templateId)) {
    console.error('Não é possível excluir templates padrão');
    return false;
  }
  
  try {
    // Excluir do banco de dados
    const dbSuccess = await deleteTemplateFromDb(templateId);
    
    // Excluir também do localStorage
    const localSuccess = deleteTemplateFromLocalStorage(templateId);
    
    return dbSuccess || localSuccess;
  } catch (error) {
    console.error('Erro ao excluir template de cores:', error);
    return false;
  }
}

// Reexportar funções para compatibilidade com código existente
export { getColorTemplatesFromLocalStorage } from './localStorage';
