
import { useState, useEffect } from 'react';
import { fetchSiteTexts, fetchColorTemplates } from '@/utils/supabaseClient';
import { SiteTextsState, ThemeColors, UseSiteTextsReturn } from './types/siteTextsTypes';
import { defaultSiteTexts, defaultThemeColors } from './defaults/siteTextsDefaults';
import { processSiteTexts, applyThemeColors } from './utils/siteTextsUtils';

export const useSiteTexts = (): UseSiteTextsReturn => {
  const [siteTexts, setSiteTexts] = useState<SiteTextsState>(defaultSiteTexts);
  const [themeColors, setThemeColors] = useState<ThemeColors>(defaultThemeColors);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Função para rolar para o topo da página quando carregada
    window.scrollTo(0, 0);
    
    // Carregar textos do site do Supabase
    const loadSiteData = async () => {
      setIsLoading(true);
      try {
        // Carregar textos do site
        const texts = await fetchSiteTexts();
        if (texts) {
          const updatedTexts = processSiteTexts(texts);
          setSiteTexts(updatedTexts);
        }

        // Carregar templates de cores
        const templates = await fetchColorTemplates();
        
        // Carregar template selecionado do localStorage
        const selectedTemplate = localStorage.getItem('selectedTemplate');
        if (selectedTemplate && templates.length > 0) {
          const template = templates.find(t => t.id === selectedTemplate);
          
          if (template) {
            const newThemeColors = {
              primaryColor: template.primaryColor,
              secondaryColor: template.secondaryColor,
              accentColor: template.accentColor,
              backgroundColor: template.backgroundColor,
              textColor: template.textColor
            };
            
            setThemeColors(newThemeColors);
            
            // Aplicar cores às variáveis CSS
            applyThemeColors(newThemeColors);
          } else if (templates.length > 0) {
            // Se o template selecionado não existe, usar o primeiro da lista
            const defaultTemplate = templates.find(t => t.is_default) || templates[0];
            localStorage.setItem('selectedTemplate', defaultTemplate.id);
            
            const newThemeColors = {
              primaryColor: defaultTemplate.primaryColor,
              secondaryColor: defaultTemplate.secondaryColor,
              accentColor: defaultTemplate.accentColor,
              backgroundColor: defaultTemplate.backgroundColor,
              textColor: defaultTemplate.textColor
            };
            
            setThemeColors(newThemeColors);
            
            // Aplicar cores às variáveis CSS
            applyThemeColors(newThemeColors);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do site:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSiteData();
  }, []);

  return { siteTexts, themeColors, isLoading };
};
