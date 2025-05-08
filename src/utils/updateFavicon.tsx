
import { useEffect } from 'react';
import { getSiteTexts } from './localStorage';

export function useFavicon() {
  useEffect(() => {
    try {
      // Verificar se há um favicon personalizado
      const siteTexts = getSiteTexts();
      
      if (siteTexts.faviconUrl) {
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        
        if (link) {
          link.href = siteTexts.faviconUrl;
        } else {
          const newLink = document.createElement('link');
          newLink.rel = 'icon';
          newLink.href = siteTexts.faviconUrl;
          document.head.appendChild(newLink);
        }
        
        console.log("Favicon atualizado:", siteTexts.faviconUrl);
      } else {
        // Se não houver favicon personalizado, remover qualquer favicon existente
        const links = document.querySelectorAll("link[rel*='icon']");
        links.forEach(link => link.parentNode?.removeChild(link));
        
        console.log("Favicon padrão removido");
      }
      
      // Aplicar cores do template selecionado como variáveis CSS
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
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar favicon:", error);
    }
  }, []);
  
  return null;
}
