
import { useState } from 'react';
import { toast } from 'sonner';
import { updateSiteText } from '@/utils/supabaseClient';
import { SectionState } from './useSectionData';

interface SectionHandlersProps {
  sections: SectionState;
  setSections: React.Dispatch<React.SetStateAction<SectionState>>;
  loadData: () => Promise<void>;
}

export const useSectionHandlers = ({ 
  sections, 
  setSections,
  loadData 
}: SectionHandlersProps) => {
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
  
  const handleNumberChange = (name: string, value: number) => {
    setSections(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSection = async (section: string) => {
    setIsLoading(true);
    
    try {
      let updates: Record<string, string | boolean | number> = {};
      
      // Determinar quais campos salvar com base na seção
      switch (section) {
        case 'solucoes':
          updates = {
            solucoesTitle: sections.solucoesTitle,
            solucoesSubtitle: sections.solucoesSubtitle,
            solucoesDescription: sections.solucoesDescription,
            solucoesCount: sections.solucoesCount,
            solucoesAITitle: sections.solucoesAITitle,
            solucoesAISubtitle: sections.solucoesAISubtitle,
            solucoesAIImage: sections.solucoesAIImage,
            solucoesAIDescription1: sections.solucoesAIDescription1,
            solucoesAIDescription2: sections.solucoesAIDescription2,
            solucoesAIDescription3: sections.solucoesAIDescription3,
          };
          
          // Adicionar todas as soluções com base no número configurado
          for (let i = 1; i <= 5; i++) {
            if (i <= Number(sections.solucoesCount)) {
              updates[`solucao${i}Title`] = sections[`solucao${i}Title`];
              updates[`solucao${i}Description`] = sections[`solucao${i}Description`];
              updates[`solucao${i}Image`] = sections[`solucao${i}Image`];
              // Converter boolean para string para armazenamento
              updates[`solucao${i}Layout`] = sections[`solucao${i}Layout`] ? 'image-left' : 'image-right';
            }
          }
          break;
        case 'contato':
          updates = {
            contatoTitle: sections.contatoTitle,
            contatoSubtitle: sections.contatoSubtitle,
            contatoDescription: sections.contatoDescription,
            contatoImageUrl: sections.contatoImageUrl,
          };
          break;
      }
      
      console.log(`Salvando seção ${section} com dados:`, updates);
      
      // Salvar cada campo - convertendo números para string para compatibilidade
      const promises = Object.entries(updates).map(([key, value]) => {
        // Converter números para string antes de salvar
        const stringValue = typeof value === 'number' ? value.toString() : value;
        return updateSiteText(key, stringValue);
      });
      
      await Promise.all(promises);
      
      toast.success('Seção atualizada com sucesso!');
      
      // Recarregar os dados para garantir que tudo foi salvo corretamente
      setTimeout(() => {
        loadData();
      }, 500);
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
    handleNumberChange,
    handleSaveSection
  };
};
