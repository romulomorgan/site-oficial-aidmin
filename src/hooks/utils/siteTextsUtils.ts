
import { SiteTextsState, ThemeColors } from '../types/siteTextsTypes';
import { defaultSiteTexts } from '../defaults/siteTextsDefaults';

export const processSiteTexts = (texts: Record<string, any>): SiteTextsState => {
  if (!texts) return { ...defaultSiteTexts };
  
  const updatedTexts: SiteTextsState = {
    // Propriedades gerais do site
    robotImage: typeof texts.robotImage === 'string' ? texts.robotImage : defaultSiteTexts.robotImage,
    siteTitle: typeof texts.siteTitle === 'string' ? texts.siteTitle : defaultSiteTexts.siteTitle,
    
    // Seção de soluções
    solucoesTitle: typeof texts.solucoesTitle === 'string' ? texts.solucoesTitle : defaultSiteTexts.solucoesTitle,
    solucoesSubtitle: typeof texts.solucoesSubtitle === 'string' ? texts.solucoesSubtitle : defaultSiteTexts.solucoesSubtitle,
    solucoesDescription: typeof texts.solucoesDescription === 'string' ? texts.solucoesDescription : defaultSiteTexts.solucoesDescription,
    solucoesCount: typeof texts.solucoesCount === 'string' ? texts.solucoesCount : defaultSiteTexts.solucoesCount,
    
    // AI Robot section
    solucoesAITitle: typeof texts.solucoesAITitle === 'string' ? texts.solucoesAITitle : defaultSiteTexts.solucoesAITitle,
    solucoesAISubtitle: typeof texts.solucoesAISubtitle === 'string' ? texts.solucoesAISubtitle : defaultSiteTexts.solucoesAISubtitle,
    solucoesAIImage: typeof texts.solucoesAIImage === 'string' ? texts.solucoesAIImage : (typeof texts.robotImage === 'string' ? texts.robotImage : defaultSiteTexts.solucoesAIImage),
    solucoesAIDescription1: typeof texts.solucoesAIDescription1 === 'string' ? texts.solucoesAIDescription1 : defaultSiteTexts.solucoesAIDescription1,
    solucoesAIDescription2: typeof texts.solucoesAIDescription2 === 'string' ? texts.solucoesAIDescription2 : defaultSiteTexts.solucoesAIDescription2,
    solucoesAIDescription3: typeof texts.solucoesAIDescription3 === 'string' ? texts.solucoesAIDescription3 : defaultSiteTexts.solucoesAIDescription3,
    
    // Solução 1
    solucao1Title: typeof texts.solucao1Title === 'string' ? texts.solucao1Title : defaultSiteTexts.solucao1Title,
    solucao1Description: typeof texts.solucao1Description === 'string' ? texts.solucao1Description : defaultSiteTexts.solucao1Description,
    solucao1Image: typeof texts.solucao1Image === 'string' ? texts.solucao1Image : defaultSiteTexts.solucao1Image,
    solucao1Layout: typeof texts.solucao1Layout === 'string' ? texts.solucao1Layout : defaultSiteTexts.solucao1Layout,
    // Solução 2
    solucao2Title: typeof texts.solucao2Title === 'string' ? texts.solucao2Title : defaultSiteTexts.solucao2Title,
    solucao2Description: typeof texts.solucao2Description === 'string' ? texts.solucao2Description : defaultSiteTexts.solucao2Description,
    solucao2Image: typeof texts.solucao2Image === 'string' ? texts.solucao2Image : defaultSiteTexts.solucao2Image,
    solucao2Layout: typeof texts.solucao2Layout === 'string' ? texts.solucao2Layout : defaultSiteTexts.solucao2Layout,
    // Solução 3
    solucao3Title: typeof texts.solucao3Title === 'string' ? texts.solucao3Title : defaultSiteTexts.solucao3Title,
    solucao3Description: typeof texts.solucao3Description === 'string' ? texts.solucao3Description : defaultSiteTexts.solucao3Description,
    solucao3Image: typeof texts.solucao3Image === 'string' ? texts.solucao3Image : defaultSiteTexts.solucao3Image,
    solucao3Layout: typeof texts.solucao3Layout === 'string' ? texts.solucao3Layout : defaultSiteTexts.solucao3Layout,
    // Solução 4
    solucao4Title: typeof texts.solucao4Title === 'string' ? texts.solucao4Title : defaultSiteTexts.solucao4Title,
    solucao4Description: typeof texts.solucao4Description === 'string' ? texts.solucao4Description : defaultSiteTexts.solucao4Description,
    solucao4Image: typeof texts.solucao4Image === 'string' ? texts.solucao4Image : defaultSiteTexts.solucao4Image,
    solucao4Layout: typeof texts.solucao4Layout === 'string' ? texts.solucao4Layout : defaultSiteTexts.solucao4Layout,
    // Solução 5
    solucao5Title: typeof texts.solucao5Title === 'string' ? texts.solucao5Title : defaultSiteTexts.solucao5Title,
    solucao5Description: typeof texts.solucao5Description === 'string' ? texts.solucao5Description : defaultSiteTexts.solucao5Description,
    solucao5Image: typeof texts.solucao5Image === 'string' ? texts.solucao5Image : defaultSiteTexts.solucao5Image,
    solucao5Layout: typeof texts.solucao5Layout === 'string' ? texts.solucao5Layout : defaultSiteTexts.solucao5Layout,
    
    // Rodapé (Footer)
    footerDescription: typeof texts.footerDescription === 'string' ? texts.footerDescription : defaultSiteTexts.footerDescription,
    footerEmail: typeof texts.footerEmail === 'string' ? texts.footerEmail : defaultSiteTexts.footerEmail,
    footerPhone: typeof texts.footerPhone === 'string' ? texts.footerPhone : defaultSiteTexts.footerPhone,
    footerAddress: typeof texts.footerAddress === 'string' ? texts.footerAddress : defaultSiteTexts.footerAddress,
    footerLocation: typeof texts.footerLocation === 'string' ? texts.footerLocation : defaultSiteTexts.footerLocation,
    footerLogoUrl: typeof texts.footerLogoUrl === 'string' ? texts.footerLogoUrl : defaultSiteTexts.footerLogoUrl,
    footerButtonText: typeof texts.footerButtonText === 'string' ? texts.footerButtonText : defaultSiteTexts.footerButtonText,
    footerAbout: typeof texts.footerAbout === 'string' ? texts.footerAbout : defaultSiteTexts.footerAbout,
    footerPhoneNumber: typeof texts.footerPhoneNumber === 'string' ? texts.footerPhoneNumber : defaultSiteTexts.footerPhoneNumber,
    companyName: typeof texts.companyName === 'string' ? texts.companyName : defaultSiteTexts.companyName,
    
    // Social links
    facebookUrl: typeof texts.facebookUrl === 'string' ? texts.facebookUrl : defaultSiteTexts.facebookUrl,
    facebookActive: typeof texts.facebookActive === 'boolean' ? texts.facebookActive : defaultSiteTexts.facebookActive,
    twitterUrl: typeof texts.twitterUrl === 'string' ? texts.twitterUrl : defaultSiteTexts.twitterUrl,
    twitterActive: typeof texts.twitterActive === 'boolean' ? texts.twitterActive : defaultSiteTexts.twitterActive,
    instagramUrl: typeof texts.instagramUrl === 'string' ? texts.instagramUrl : defaultSiteTexts.instagramUrl,
    instagramActive: typeof texts.instagramActive === 'boolean' ? texts.instagramActive : defaultSiteTexts.instagramActive,
    linkedinUrl: typeof texts.linkedinUrl === 'string' ? texts.linkedinUrl : defaultSiteTexts.linkedinUrl,
    linkedinActive: typeof texts.linkedinActive === 'boolean' ? texts.linkedinActive : defaultSiteTexts.linkedinActive,
    copyrightText: typeof texts.copyrightText === 'string' ? texts.copyrightText : defaultSiteTexts.copyrightText
  };
  
  return updatedTexts;
};

export const applyThemeColors = (colors: ThemeColors): void => {
  // Aplicar cores às variáveis CSS tanto no :root quanto no body
  Object.entries(colors).forEach(([key, value]) => {
    const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
    document.documentElement.style.setProperty(cssVarName, value);
    document.body.style.setProperty(cssVarName, value);
  });
  
  // Aplicar em variáveis Tailwind também
  document.documentElement.style.setProperty('--foreground', colors.textColor);
  document.documentElement.style.setProperty('--background', colors.backgroundColor);
  document.documentElement.style.setProperty('--primary', colors.primaryColor);
  document.documentElement.style.setProperty('--secondary', colors.secondaryColor);
  document.documentElement.style.setProperty('--accent', colors.accentColor);
  
  console.log('Cores aplicadas às variáveis CSS:', colors);
};
