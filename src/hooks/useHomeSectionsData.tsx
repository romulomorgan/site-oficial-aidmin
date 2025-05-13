
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchSiteTexts } from '@/utils/supabaseClient';

export interface HomeSectionsState {
  // Header Section
  logoUrl: string;
  siteTitle: string;
  faviconUrl: string;
  dashboardLogoUrl: string;
  homeLogoIconUrl: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  heroButtonLink: string;
  heroVideoUrl: string;
  
  // O que fazemos Section
  whatWeDoTitle: string;
  whatWeDoSubtitle: string;
  
  // Assistente Section
  assistantCardTitle: string;
  assistantCardDescription: string;
  assistantCardImage: string;
  
  // BPO Processos Section
  bpoProcessosCardTitle: string;
  bpoProcessosCardDescription: string;
  bpoProcessosCardImage: string;
  
  // BPO Projetos Section
  bpoProjetosCardTitle: string;
  bpoProjetosCardDescription: string;
  bpoProjetosCardImage: string;
  
  // Em expansão Section
  expansionTitle: string;
  expansionSubtitle: string;
  expansionDescription: string;
  expansionImage: string;
  
  // Estatísticas
  statsYears: string;
  statsProjects: string;
  statsCompanies: string;
  statsAutomations: string;
  
  // WhatsApp Section
  whatsappTitle: string;
  whatsappSubtitle: string;
  whatsappDescription: string;
  whatsappImage: string;
  whatsappButtonText: string;
  whatsappButtonLink: string;
  whatsappSecondaryButtonText: string;
  whatsappSecondaryButtonLink: string;
  
  // Footer Section
  companyName: string;
  footerAbout: string;
  footerPhoneNumber: string;
  footerEmail: string;
  footerButtonText: string;
  copyrightText: string;
  footerLocation: string;
  footerLogoUrl: string;
  
  // Redes sociais
  facebookUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  facebookActive: boolean;
  instagramActive: boolean;
  twitterActive: boolean;
  linkedinActive: boolean;
  [key: string]: string | boolean;
}

export const useHomeSectionsData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<HomeSectionsState>({
    // Header Section
    logoUrl: '',
    siteTitle: '',
    faviconUrl: '',
    dashboardLogoUrl: '',
    homeLogoIconUrl: '',
    
    // Hero Section
    heroTitle: '',
    heroSubtitle: '',
    heroButtonText: '',
    heroButtonLink: '',
    heroVideoUrl: '',
    
    // O que fazemos Section
    whatWeDoTitle: '',
    whatWeDoSubtitle: '',
    
    // Assistente Section
    assistantCardTitle: '',
    assistantCardDescription: '',
    assistantCardImage: '',
    
    // BPO Processos Section
    bpoProcessosCardTitle: '',
    bpoProcessosCardDescription: '',
    bpoProcessosCardImage: '',
    
    // BPO Projetos Section
    bpoProjetosCardTitle: '',
    bpoProjetosCardDescription: '',
    bpoProjetosCardImage: '',
    
    // Em expansão Section
    expansionTitle: '',
    expansionSubtitle: '',
    expansionDescription: '',
    expansionImage: '',
    
    // Estatísticas
    statsYears: '',
    statsProjects: '',
    statsCompanies: '',
    statsAutomations: '',
    
    // WhatsApp Section
    whatsappTitle: '',
    whatsappSubtitle: '',
    whatsappDescription: '',
    whatsappImage: '',
    whatsappButtonText: '',
    whatsappButtonLink: '',
    whatsappSecondaryButtonText: '',
    whatsappSecondaryButtonLink: '',
    
    // Footer Section
    companyName: '',
    footerAbout: '',
    footerPhoneNumber: '',
    footerEmail: '',
    footerButtonText: '',
    copyrightText: '',
    footerLocation: '',
    footerLogoUrl: '',
    
    // Redes sociais
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    linkedinUrl: '',
    facebookActive: true,
    instagramActive: true,
    twitterActive: true,
    linkedinActive: true
  });

  const loadData = async () => {
    setIsLoading(true);
    try {
      const siteTexts = await fetchSiteTexts();
      const updatedSections: Record<string, string | boolean> = {};
      
      // Processar cada campo do objeto sections com os valores retornados
      Object.keys(sections).forEach(key => {
        const value = siteTexts[key];
        
        if (key === 'facebookActive' || key === 'instagramActive' || key === 'twitterActive' || key === 'linkedinActive') {
          updatedSections[key] = value === false ? false : true;
        } else {
          updatedSections[key] = value?.toString() || '';
        }
      });
      
      // Definições padrão para campos que podem não ter valores
      if (!updatedSections.siteTitle) updatedSections.siteTitle = 'IAdmin';
      if (!updatedSections.heroTitle) updatedSections.heroTitle = 'Destrave a fronteira da produtividade.';
      if (!updatedSections.heroSubtitle) updatedSections.heroSubtitle = 'Exploramos os limites da AI Generativa para criar novos produtos, avenidas de receitas e gerar eficiência operacional.';
      if (!updatedSections.heroButtonText) updatedSections.heroButtonText = 'Fale Conosco';
      if (!updatedSections.heroButtonLink) updatedSections.heroButtonLink = '/solucoes';
      if (!updatedSections.footerLocation) updatedSections.footerLocation = 'São Paulo, SP - Brasil';
      
      // Valores padrão para seção WhatsApp
      if (!updatedSections.whatsappTitle) updatedSections.whatsappTitle = 'WhatsApp Business';
      if (!updatedSections.whatsappDescription) updatedSections.whatsappDescription = 'A IAdmin faz a ponte perfeita entre sua IA e o WhatsApp. A integração permite que sua assistente de IA converse diretamente com seus clientes, proporcionando atendimento personalizado e respostas instantâneas. Ganhe eficiência e escala sem perder o toque humano na comunicação.';
      if (!updatedSections.whatsappButtonText) updatedSections.whatsappButtonText = 'Contrate a IAdmin';
      if (!updatedSections.whatsappButtonLink) updatedSections.whatsappButtonLink = '/contato';
      if (!updatedSections.whatsappSecondaryButtonText) updatedSections.whatsappSecondaryButtonText = 'Contrate uma AI Poderosa!';
      if (!updatedSections.whatsappSecondaryButtonLink) updatedSections.whatsappSecondaryButtonLink = '/contato';
      
      setSections(updatedSections as HomeSectionsState);
    } catch (error) {
      console.error('Erro ao carregar textos:', error);
      toast.error('Erro ao carregar conteúdo das seções');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    sections,
    setSections,
    loadData
  };
};
