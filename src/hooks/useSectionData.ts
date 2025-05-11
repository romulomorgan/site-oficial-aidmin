
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchSiteTexts } from '@/utils/supabaseClient';

export interface SectionState {
  [key: string]: string | boolean | number;
}

export const useSectionData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<SectionState>({
    // Solucoes page
    solucoesTitle: '',
    solucoesSubtitle: '',
    solucoesDescription: '',
    solucoesCount: 1,
    
    // AI Robot section
    solucoesAITitle: '',
    solucoesAISubtitle: '',
    solucoesAIImage: '',
    solucoesAIDescription1: '',
    solucoesAIDescription2: '',
    solucoesAIDescription3: '',
    
    // Soluções individuais
    solucao1Title: '',
    solucao1Description: '',
    solucao1Image: '',
    solucao1Layout: true,
    solucao2Title: '',
    solucao2Description: '',
    solucao2Image: '',
    solucao2Layout: true,
    solucao3Title: '',
    solucao3Description: '',
    solucao3Image: '',
    solucao3Layout: true,
    solucao4Title: '',
    solucao4Description: '',
    solucao4Image: '',
    solucao4Layout: true,
    solucao5Title: '',
    solucao5Description: '',
    solucao5Image: '',
    solucao5Layout: true,
    
    // Contato page
    contatoTitle: '',
    contatoSubtitle: '',
    contatoDescription: '',
    contatoImageUrl: '',
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const siteTexts = await fetchSiteTexts();
      const updatedSections: Record<string, string | boolean | number> = { ...sections };
      
      // Processar cada campo do objeto sections com os valores retornados
      Object.keys(sections).forEach(key => {
        const value = siteTexts[key];
        
        if (key === 'solucoesCount') {
          const count = Number(value) || 1;
          updatedSections[key] = count > 5 ? 5 : (count < 1 ? 1 : count);
        } else if (key.endsWith('Layout')) {
          // Layout booleans - true = imagem à esquerda, false = imagem à direita
          if (value === 'image-left') {
            updatedSections[key] = true;
          } else if (value === 'image-right') {
            updatedSections[key] = false;
          } else {
            updatedSections[key] = value === false ? false : true;
          }
        } else {
          updatedSections[key] = value !== undefined ? value.toString() : '';
        }
      });
      
      // Definições padrão para campos que podem não ter valores
      if (!updatedSections.solucoesTitle) updatedSections.solucoesTitle = 'Nossas Soluções';
      if (!updatedSections.contatoTitle) updatedSections.contatoTitle = 'Entre em Contato';
      if (!updatedSections.solucoesAITitle) updatedSections.solucoesAITitle = 'Conectamos a nossa AI aos seus processos operacionais';
      if (!updatedSections.solucoesAISubtitle) updatedSections.solucoesAISubtitle = 'ADOTE A NOSSA AI';
      
      setSections(updatedSections);
      
      console.log('Dados carregados do site:', updatedSections);
    } catch (error) {
      console.error('Erro ao carregar textos:', error);
      toast.error('Erro ao carregar conteúdo das seções');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    isLoading,
    sections,
    setSections,
    loadData
  };
};
