
import { useEffect } from 'react';
import { fetchSiteTexts } from './supabaseClient';

export function useFavicon() {
  useEffect(() => {
    const loadFavicon = async () => {
      try {
        // Tentar carregar do Supabase primeiro
        const siteTexts = await fetchSiteTexts();
        
        if (siteTexts && siteTexts.faviconUrl && typeof siteTexts.faviconUrl === 'string') {
          const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
          link.type = 'image/png';
          link.rel = 'shortcut icon';
          link.href = siteTexts.faviconUrl;
          
          if (!document.querySelector("link[rel*='icon']")) {
            document.getElementsByTagName('head')[0].appendChild(link);
          }
          
          console.log("Favicon atualizado do Supabase:", siteTexts.faviconUrl);
          
          // Também atualizar o título da página se estiver disponível
          if (siteTexts.siteTitle && typeof siteTexts.siteTitle === 'string') {
            document.title = siteTexts.siteTitle;
            console.log("Título da página atualizado:", siteTexts.siteTitle);
          }
        } else {
          // Fallback para localStorage
          const savedTexts = localStorage.getItem('siteTexts');
          if (savedTexts) {
            const parsedTexts = JSON.parse(savedTexts);
            if (parsedTexts.faviconUrl && typeof parsedTexts.faviconUrl === 'string') {
              const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
              link.type = 'image/png';
              link.rel = 'shortcut icon';
              link.href = parsedTexts.faviconUrl;
              
              if (!document.querySelector("link[rel*='icon']")) {
                document.getElementsByTagName('head')[0].appendChild(link);
              }
              
              console.log("Favicon atualizado do localStorage:", parsedTexts.faviconUrl);
            }
            
            // Atualizar também o título da página do localStorage
            if (parsedTexts.siteTitle && typeof parsedTexts.siteTitle === 'string') {
              document.title = parsedTexts.siteTitle;
              console.log("Título da página atualizado do localStorage:", parsedTexts.siteTitle);
            }
          }
        }

        // Também aplica as cores do template selecionado
        const selectedTemplate = localStorage.getItem('selectedTemplate');
        
        if (selectedTemplate) {
          const savedTemplates = localStorage.getItem('siteTemplates');
          const defaultTemplates = JSON.parse(localStorage.getItem('defaultTemplates') || '[]');
          let allTemplates = defaultTemplates;
          
          if (savedTemplates) {
            allTemplates = [...defaultTemplates, ...JSON.parse(savedTemplates)];
          }
          
          const template = allTemplates.find((t: any) => t.id === selectedTemplate);
          
          if (template) {
            document.documentElement.style.setProperty('--primary-color', template.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', template.secondaryColor);
            document.documentElement.style.setProperty('--accent-color', template.accentColor);
            document.documentElement.style.setProperty('--background-color', template.backgroundColor);
            document.documentElement.style.setProperty('--text-color', template.textColor);
            document.documentElement.style.setProperty('--button-text-color', template.buttonTextColor || '#FFFFFF');
            document.documentElement.style.setProperty('--menu-text-color', template.menuTextColor || '#FFFFFF');
            
            document.body.style.setProperty('--primary-color', template.primaryColor);
            document.body.style.setProperty('--secondary-color', template.secondaryColor);
            document.body.style.setProperty('--accent-color', template.accentColor);
            document.body.style.setProperty('--background-color', template.backgroundColor);
            document.body.style.setProperty('--text-color', template.textColor);
            document.body.style.setProperty('--button-text-color', template.buttonTextColor || '#FFFFFF');
            document.body.style.setProperty('--menu-text-color', template.menuTextColor || '#FFFFFF');
          }
        }
      } catch (error) {
        console.error("Erro ao atualizar favicon e título da página:", error);
      }
    };
    
    loadFavicon();
  }, []);
  
  return null;
}
