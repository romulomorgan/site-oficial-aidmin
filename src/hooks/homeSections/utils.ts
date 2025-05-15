
/**
 * Utility functions for home sections
 */
import { HomeSectionsState } from './types';

/**
 * Process the raw site texts from database into formatted section data
 */
export const processSectionData = (siteTexts: Record<string, any>): HomeSectionsState => {
  const updatedSections: Record<string, string | boolean> = {};
  
  // Process boolean fields differently
  const booleanFields = ['facebookActive', 'instagramActive', 'twitterActive', 'linkedinActive'];
  
  // Process each key from the site texts
  Object.keys(siteTexts).forEach(key => {
    const value = siteTexts[key];
    
    if (booleanFields.includes(key)) {
      updatedSections[key] = value === false ? false : true;
    } else {
      updatedSections[key] = value?.toString() || '';
    }
  });
  
  // Set default values for important fields if they're missing
  if (!updatedSections.siteTitle) updatedSections.siteTitle = 'IAdmin';
  if (!updatedSections.heroTitle) updatedSections.heroTitle = 'Destrave a fronteira da produtividade.';
  if (!updatedSections.heroSubtitle) updatedSections.heroSubtitle = 'Exploramos os limites da AI Generativa para criar novos produtos, avenidas de receitas e gerar eficiência operacional.';
  if (!updatedSections.heroButtonText) updatedSections.heroButtonText = 'Fale Conosco';
  if (!updatedSections.heroButtonLink) updatedSections.heroButtonLink = '/solucoes';
  if (!updatedSections.heroSecondaryButtonText) updatedSections.heroSecondaryButtonText = 'Contrate uma AI Poderosa!';
  if (!updatedSections.heroSecondaryButtonLink) updatedSections.heroSecondaryButtonLink = '/contato';
  if (!updatedSections.footerLocation) updatedSections.footerLocation = 'São Paulo, SP - Brasil';
  
  // Default values for WhatsApp section
  if (!updatedSections.whatsappTitle) updatedSections.whatsappTitle = 'WhatsApp Business';
  if (!updatedSections.whatsappDescription) updatedSections.whatsappDescription = 'A IAdmin faz a ponte perfeita entre sua IA e o WhatsApp. A integração permite que sua assistente de IA converse diretamente com seus clientes, proporcionando atendimento personalizado e respostas instantâneas. Ganhe eficiência e escala sem perder o toque humano na comunicação.';
  if (!updatedSections.whatsappButtonText) updatedSections.whatsappButtonText = 'Contrate a IAdmin';
  if (!updatedSections.whatsappButtonLink) updatedSections.whatsappButtonLink = '/contato';
  if (!updatedSections.whatsappSecondaryButtonText) updatedSections.whatsappSecondaryButtonText = 'Contrate uma AI Poderosa!';
  if (!updatedSections.whatsappSecondaryButtonLink) updatedSections.whatsappSecondaryButtonLink = '/contato';
  
  return updatedSections as HomeSectionsState;
};
