
/**
 * Types for Home Sections
 */

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
  heroSecondaryButtonText: string;
  heroSecondaryButtonLink: string;
  
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
  
  // Contact Section
  contactTitle: string;
  contactSubtitle: string;
  
  // Contato Page Section
  contatoTitle: string;
  contatoSubtitle: string;
  contatoDescription: string;
  contatoImageUrl: string;
  
  // Dynamic key access
  [key: string]: string | boolean;
}

// Adding SectionData interface to fix import errors
export interface SectionData {
  id: string;
  title: string;
  content: string;
  type: string;
  visible: boolean;
  order?: number;
  [key: string]: string | boolean | number | undefined;
}

export interface UseHomeSectionsDataReturn {
  isLoading: boolean;
  sections: HomeSectionsState;
  setSections: React.Dispatch<React.SetStateAction<HomeSectionsState>>;
  loadData: () => Promise<void>;
}

export interface SectionHandlerProps {
  sections: HomeSectionsState;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => Promise<void>;
}
