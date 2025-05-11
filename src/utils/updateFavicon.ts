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
        } else {
          // Fallback padrão para IAdmin
          const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
          link.type = 'image/png';
          link.rel = 'shortcut icon';
          link.href = '/lovable-uploads/c739c386-c6c9-4bb8-9996-98b3a3161fad.png';
          
          if (!document.querySelector("link[rel*='icon']")) {
            document.getElementsByTagName('head')[0].appendChild(link);
          }
        }
        
        // Atualizar título da página
        if (siteTexts && siteTexts.siteTitle && typeof siteTexts.siteTitle === 'string') {
          document.title = siteTexts.siteTitle;
          
          // Atualizar também as tags Open Graph
          const ogTitle = document.querySelector('meta[property="og:title"]');
          if (ogTitle) ogTitle.setAttribute('content', siteTexts.siteTitle);
          
          const ogDesc = document.querySelector('meta[property="og:description"]');
          if (ogDesc && siteTexts.siteDescription) {
            ogDesc.setAttribute('content', String(siteTexts.siteDescription));
          } else if (ogDesc) {
            ogDesc.setAttribute('content', 'IAdmin - Plataforma de Inteligência Artificial para Empresas');
          }
          
          // Atualizar Twitter Card
          const twitterSite = document.querySelector('meta[name="twitter:site"]');
          if (twitterSite) twitterSite.setAttribute('content', '@iadmin');
          
        } else {
          // Fallback para título padrão IAdmin
          document.title = 'IAdmin';
          
          // Atualizar tags Open Graph com valores padrão
          const ogTitle = document.querySelector('meta[property="og:title"]');
          if (ogTitle) ogTitle.setAttribute('content', 'IAdmin');
          
          const ogDesc = document.querySelector('meta[property="og:description"]');
          if (ogDesc) ogDesc.setAttribute('content', 'IAdmin - Plataforma de Inteligência Artificial para Empresas');
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
        
        // Em caso de erro, definir valores padrão de IAdmin
        document.title = 'IAdmin';
        
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', 'IAdmin');
        
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', 'IAdmin - Plataforma de Inteligência Artificial para Empresas');
      }
    };
    
    loadFavicon();
  }, []);
  
  return null;
}
