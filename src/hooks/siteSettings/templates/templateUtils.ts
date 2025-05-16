
import { ColorTemplate } from '@/utils/supabase/types';

// Evento personalizado para notificar mudanças de tema
export const createThemeChangeEvent = (template: ColorTemplate) => {
  const event = new CustomEvent('templateSelected', { 
    detail: {
      template: template
    }
  });
  document.dispatchEvent(event);
};

// Aplicar o template ao DOM
export const applyTemplate = (template: ColorTemplate): boolean => {
  if (template) {
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
    
    console.log('Template aplicado:', template.name);
    
    // Notificar outros componentes sobre a mudança de tema
    createThemeChangeEvent(template);
    
    return true;
  }
  return false;
};
