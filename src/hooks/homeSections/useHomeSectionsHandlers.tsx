
import { useState } from 'react';
import { toast } from 'sonner';
import { updateSiteText } from '@/utils/supabaseClient';
import { HomeSectionsState } from './types';
import { getUpdatesBySection } from './handlers';

interface HomeSectionsHandlersProps {
  sections: HomeSectionsState;
  setSections: React.Dispatch<React.SetStateAction<HomeSectionsState>>;
  loadData: () => Promise<void>;
}

/**
 * Hook to handle home sections updates, input changes and saving
 */
export const useHomeSectionsHandlers = ({ 
  sections, 
  setSections, 
  loadData 
}: HomeSectionsHandlersProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSections(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSections(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveSection = async (section: string) => {
    setIsLoading(true);
    
    try {
      const updates = getUpdatesBySection(section, sections);
      
      // Salvar cada campo
      for (const [key, value] of Object.entries(updates)) {
        await updateSiteText(key, value);
      }
      
      toast.success('Seção atualizada com sucesso!');
    } catch (error) {
      console.error(`Erro ao salvar seção ${section}:`, error);
      toast.error('Ocorreu um erro ao salvar as alterações');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleInputChange,
    handleSwitchChange,
    handleSaveSection
  };
};
