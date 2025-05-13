
export interface SiteTextsState {
  robotImage: string;
  siteTitle: string;
  solucoesTitle: string;
  solucoesSubtitle: string;
  solucoesDescription: string;
  solucoesCount: string;
  
  // AI Robot section
  solucoesAITitle: string;
  solucoesAISubtitle: string;
  solucoesAIImage: string;
  solucoesAIDescription1: string;
  solucoesAIDescription2: string;
  solucoesAIDescription3: string;
  
  // Soluções individuais
  solucao1Title: string;
  solucao1Description: string;
  solucao1Image: string;
  solucao1Layout: string;
  solucao2Title: string;
  solucao2Description: string;
  solucao2Image: string;
  solucao2Layout: string;
  solucao3Title: string;
  solucao3Description: string;
  solucao3Image: string;
  solucao3Layout: string;
  solucao4Title: string;
  solucao4Description: string;
  solucao4Image: string;
  solucao4Layout: string;
  solucao5Title: string;
  solucao5Description: string;
  solucao5Image: string;
  solucao5Layout: string;

  // Footer properties
  footerDescription: string;
  footerEmail: string;
  footerPhone: string;
  footerAddress: string;
  footerLocation: string;
  footerLogoUrl: string;
  footerButtonText: string;
  footerAbout: string;
  footerPhoneNumber: string;
  companyName: string;
  
  // Social links
  facebookUrl: string;
  facebookActive: boolean;
  twitterUrl: string;
  twitterActive: boolean;
  instagramUrl: string;
  instagramActive: boolean;
  linkedinUrl: string;
  linkedinActive: boolean;
  copyrightText: string;
}

export interface ThemeColors {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

export interface UseSiteTextsReturn {
  siteTexts: SiteTextsState;
  themeColors: ThemeColors;
  isLoading: boolean;
}
