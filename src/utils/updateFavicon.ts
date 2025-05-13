
import { useEffect } from 'react';
import { fetchSiteTexts, fetchColorTemplates } from './supabaseClient';

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

        // Aplicar as cores do template selecionado
        const selectedTemplate = localStorage.getItem('selectedTemplate');
        
        if (selectedTemplate) {
          try {
            // Buscar templates diretamente do banco de dados
            const templates = await fetchColorTemplates();
            const template = templates.find(t => t.id === selectedTemplate);
            
            if (template) {
              // Aplicar cores às variáveis CSS tanto no :root quanto no body
              const colorVars = {
                '--primary-color': template.primaryColor,
                '--secondary-color': template.secondaryColor,
                '--accent-color': template.accentColor,
                '--background-color': template.backgroundColor,
                '--text-color': template.textColor,
                '--button-text-color': template.buttonTextColor || '#FFFFFF',
                '--menu-text-color': template.menuTextColor || '#FFFFFF'
              };
              
              // Aplicar em ambos document.documentElement e document.body
              Object.entries(colorVars).forEach(([key, value]) => {
                document.documentElement.style.setProperty(key, value);
                document.body.style.setProperty(key, value);
              });
              
              console.log('Template aplicado com sucesso:', template.name);
            } else {
              console.warn('Template selecionado não encontrado:', selectedTemplate);
            }
          } catch (error) {
            console.error('Erro ao aplicar template de cores:', error);
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
    
    // Adicionar um listener para mudanças no localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'selectedTemplate') {
        loadFavicon();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return null;
}
