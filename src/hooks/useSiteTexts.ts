
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

        // Carregar templates de cores diretamente do banco
        const templates = await fetchColorTemplates();
        console.log('Templates carregados em useSiteTexts:', templates.length);
        
        // Carregar template selecionado do localStorage
        const selectedTemplate = localStorage.getItem('selectedTemplate');
        if (selectedTemplate && templates.length > 0) {
          const template = templates.find(t => t.id === selectedTemplate);
          
          if (template) {
            console.log('Aplicando template de useSiteTexts:', template.name);
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
            
            // Aplicar cores adicionais que podem não estar no tipo ThemeColors
            document.documentElement.style.setProperty('--button-text-color', template.buttonTextColor || '#FFFFFF');
            document.documentElement.style.setProperty('--menu-text-color', template.menuTextColor || '#FFFFFF');
            document.body.style.setProperty('--button-text-color', template.buttonTextColor || '#FFFFFF');
            document.body.style.setProperty('--menu-text-color', template.menuTextColor || '#FFFFFF');
          } else if (templates.length > 0) {
            // Se o template selecionado não existe, usar um template default ou o primeiro da lista
            const defaultTemplate = templates.find(t => t.is_default) || templates[0];
            localStorage.setItem('selectedTemplate', defaultTemplate.id);
            console.log('Template não encontrado, usando padrão:', defaultTemplate.name);
            
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
            
            // Aplicar cores adicionais
            document.documentElement.style.setProperty('--button-text-color', defaultTemplate.buttonTextColor || '#FFFFFF');
            document.documentElement.style.setProperty('--menu-text-color', defaultTemplate.menuTextColor || '#FFFFFF');
            document.body.style.setProperty('--button-text-color', defaultTemplate.buttonTextColor || '#FFFFFF');
            document.body.style.setProperty('--menu-text-color', defaultTemplate.menuTextColor || '#FFFFFF');
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do site:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSiteData();

    // Adicionar event listener para mudanças de tema
    const handleThemeChange = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail && customEvent.detail.selectedTemplate) {
        console.log('Evento de mudança de tema detectado:', customEvent.detail.selectedTemplate);
        // Recarregar os dados do site para aplicar o novo tema
        loadSiteData();
      }
    };

    window.addEventListener('themeChanged', handleThemeChange);

    // Limpar event listener ao desmontar
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
    };
  }, []);

  return { siteTexts, themeColors, isLoading };
};
