
import { useState } from 'react';
import { toast } from 'sonner';
import { fetchSiteTexts } from '@/utils/supabaseClient';
import { HomeSectionsState, UseHomeSectionsDataReturn } from './types';
import { defaultSections } from './defaults';
import { processSectionData } from './utils';

/**
 * Hook to manage home sections data
 */
export const useHomeSectionsData = (): UseHomeSectionsDataReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<HomeSectionsState>(defaultSections);

  /**
   * Load data from backend
   */
  const loadData = async () => {
    setIsLoading(true);
    try {
      const siteTexts = await fetchSiteTexts();
      const processedSections = processSectionData(siteTexts);
      
      setSections(processedSections);
    } catch (error) {
      console.error('Erro ao carregar textos:', error);
      toast.error('Erro ao carregar conteúdo das seções');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sections,
    setSections,
    loadData
  };
};

export * from './types';
