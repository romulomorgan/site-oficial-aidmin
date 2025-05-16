
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Evento personalizado para notificar mudanças de tema
const themeChangeEvent = new CustomEvent('themeChanged');

// Função para aplicar o tema inicial antes mesmo do React montar
const applyInitialTheme = async () => {
  try {
    console.log('Iniciando aplicação do tema inicial');
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
          
          // Disparar evento de mudança de tema
          document.dispatchEvent(themeChangeEvent);
        } catch (e) {
          console.error('Erro ao aplicar tema inicial do cache:', e);
          
          // Se houver erro ao aplicar do localStorage, tentar aplicar cores padrão
          applyDefaultTheme();
        }
      } else {
        // Aplicar cores padrão se não houver template salvo no localStorage
        applyDefaultTheme();
      }
    } else {
      // Aplicar cores padrão se não houver template selecionado
      applyDefaultTheme();
    }
  } catch (error) {
    console.error('Erro ao aplicar tema inicial:', error);
    
    // Em caso de erro, aplicar cores padrão
    applyDefaultTheme();
  }
};

// Função para aplicar o tema padrão
const applyDefaultTheme = () => {
  const defaultColors = {
    '--primary-color': '#FF196E',
    '--secondary-color': '#2D0A16',
    '--accent-color': '#FF4F8E',
    '--background-color': '#FFFFFF',
    '--text-color': '#222222',
    '--button-text-color': '#FFFFFF',
    '--menu-text-color': '#FFFFFF'
  };
  
  // Aplicar em ambos document.documentElement e document.body
  Object.entries(defaultColors).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
    document.body.style.setProperty(key, value);
  });
  
  console.log('Tema padrão aplicado');
  
  // Disparar evento de mudança de tema
  document.dispatchEvent(themeChangeEvent);
};

// Adicionar um ouvinte para o evento de mudança de tema
document.addEventListener('templateSelected', (e: any) => {
  console.log('Evento de mudança de tema detectado:', e.detail);
  // Este evento será acionado quando um tema for selecionado no painel administrativo
  // A lógica para atualizar o tema já está implementada pela função que dispara o evento
});

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
