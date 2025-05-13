
import { ColorTemplate } from "../types";
import { 
  fetchFromDb as fetchColorTemplatesFromDb, 
  saveTemplateToDb, 
  deleteTemplateFromDb 
} from "./dbOperations";
import { 
  saveTemplateToLocalStorage, 
  deleteTemplateFromLocalStorage,
  getColorTemplatesFromLocalStorage
} from "./localStorage";

// Função para obter templates de cores
export async function fetchColorTemplates(): Promise<ColorTemplate[]> {
  try {
    // Buscar templates do banco de dados
    const dbTemplates = await fetchColorTemplatesFromDb();
    
    // Se tiver templates no banco, retorna eles
    if (dbTemplates.length > 0) {
      // Salvar no localStorage para acesso offline
      const localTemplates = dbTemplates.filter(t => !t.id.toString().includes('default'));
      localStorage.setItem('siteTemplates', JSON.stringify(localTemplates));
      return dbTemplates;
    }
    
    // Caso contrário, usar localStorage como fallback
    return getColorTemplatesFromLocalStorage();
  } catch (error) {
    console.error('Erro ao buscar templates de cores:', error);
    // Em caso de erro, tentar usar localStorage como fallback
    return getColorTemplatesFromLocalStorage();
  }
}

// Função para salvar template de cores (banco e localStorage)
export async function saveColorTemplate(template: ColorTemplate): Promise<boolean> {
  console.log('Salvando template de cores:', template);
  
  try {
    // Verificar se template tem ID, se não tiver, gerar um
    if (!template.id) {
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
export { getColorTemplatesFromLocalStorage };
