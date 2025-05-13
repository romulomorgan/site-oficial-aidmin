
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Função para aplicar o tema inicial antes mesmo do React montar
const applyInitialTheme = async () => {
  try {
    // Tentar obter o tema salvo no localStorage
    const selectedTemplate = localStorage.getItem('selectedTemplate');
    
    if (selectedTemplate) {
      console.log('Template inicial detectado:', selectedTemplate);
      
      // Se houverem cores já salvas no localStorage, aplicá-las antes da renderização
      const templateData = localStorage.getItem(`template_${selectedTemplate}`);
      
      if (templateData) {
        try {
          const template = JSON.parse(templateData);
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
          
          console.log('Tema inicial aplicado do cache local');
        } catch (e) {
          console.error('Erro ao aplicar tema inicial do cache:', e);
        }
      }
    }
  } catch (error) {
    console.error('Erro ao aplicar tema inicial:', error);
  }
};

// Aplicar tema inicial antes de renderizar
applyInitialTheme().then(() => {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  // Garantir que o tema seja aplicado globalmente
  document.documentElement.classList.add('theme-enabled');
  document.body.classList.add('theme-enabled');
  
  createRoot(rootElement).render(<App />);
});
