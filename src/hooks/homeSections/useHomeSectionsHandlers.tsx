
import { useState } from 'react';
import { HomeSectionsState, SectionData } from './types';
import { toast } from 'sonner';

export const useHomeSectionsHandlers = (
  sections: HomeSectionsState, 
  setSections: React.Dispatch<React.SetStateAction<HomeSectionsState>>
) => {
  const [isLoading, setIsLoading] = useState(false);
  
  // Handler para atualizar uma seção específica
  const updateSection = (id: string, data: Partial<HomeSectionsState>) => {
    setSections(prev => ({ ...prev, ...data }));
  };
  
  // Handler para inputs de texto
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSections(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handler para switches
  const handleSwitchChange = (name: string, checked: boolean) => {
    setSections(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  // Handler para salvar uma seção
  const handleSaveSection = async (sectionName: string) => {
    setIsLoading(true);
    try {
      // Aqui você implementaria a lógica real para salvar no banco de dados
      console.log(`Salvando seção ${sectionName}:`, sections);
      
      // Simulando um tempo de resposta do servidor
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success(`Seção ${sectionName} salva com sucesso!`);
    } catch (error) {
      console.error(`Erro ao salvar seção ${sectionName}:`, error);
      toast.error(`Erro ao salvar seção ${sectionName}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    updateSection,
    handleInputChange,
    handleSwitchChange,
    handleSaveSection,
    isLoading
  };
};
