
import { HomeSectionsState } from './types';

/**
 * Helper function to get updates for a specific section
 */
export const getUpdatesBySection = (section: string, sections: HomeSectionsState): Record<string, string | boolean> => {
  let updates: Record<string, string | boolean> = {};
  
  // Determinar quais campos salvar com base na seção
  switch (section) {
    case 'header':
      updates = {
        logoUrl: sections.logoUrl,
        siteTitle: sections.siteTitle,
        faviconUrl: sections.faviconUrl,
        dashboardLogoUrl: sections.dashboardLogoUrl,
        homeLogoIconUrl: sections.homeLogoIconUrl,
      };
      break;
    case 'hero':
      updates = {
        heroTitle: sections.heroTitle,
        heroSubtitle: sections.heroSubtitle,
        heroButtonText: sections.heroButtonText,
        heroButtonLink: sections.heroButtonLink,
        heroVideoUrl: sections.heroVideoUrl,
        heroSecondaryButtonText: sections.heroSecondaryButtonText,
        heroSecondaryButtonLink: sections.heroSecondaryButtonLink,
      };
      break;
    case 'whatWeDo':
      updates = {
        whatWeDoTitle: sections.whatWeDoTitle,
        whatWeDoSubtitle: sections.whatWeDoSubtitle,
        assistantCardTitle: sections.assistantCardTitle,
        assistantCardDescription: sections.assistantCardDescription,
        assistantCardImage: sections.assistantCardImage,
        bpoProcessosCardTitle: sections.bpoProcessosCardTitle,
        bpoProcessosCardDescription: sections.bpoProcessosCardDescription,
        bpoProcessosCardImage: sections.bpoProcessosCardImage,
        bpoProjetosCardTitle: sections.bpoProjetosCardTitle,
        bpoProjetosCardDescription: sections.bpoProjetosCardDescription,
        bpoProjetosCardImage: sections.bpoProjetosCardImage,
      };
      break;
    case 'expansion':
      updates = {
        expansionTitle: sections.expansionTitle,
        expansionSubtitle: sections.expansionSubtitle,
        expansionDescription: sections.expansionDescription,
        expansionImage: sections.expansionImage,
        statsYears: sections.statsYears,
        statsProjects: sections.statsProjects,
        statsCompanies: sections.statsCompanies,
        statsAutomations: sections.statsAutomations,
      };
      break;
    case 'whatsapp':
      updates = {
        whatsappTitle: sections.whatsappTitle,
        whatsappSubtitle: sections.whatsappSubtitle,
        whatsappDescription: sections.whatsappDescription,
        whatsappImage: sections.whatsappImage,
        whatsappButtonText: sections.whatsappButtonText,
        whatsappButtonLink: sections.whatsappButtonLink,
        whatsappSecondaryButtonText: sections.whatsappSecondaryButtonText,
        whatsappSecondaryButtonLink: sections.whatsappSecondaryButtonLink,
      };
      break;
    case 'footer':
      updates = {
        companyName: sections.companyName,
        footerAbout: sections.footerAbout,
        footerPhoneNumber: sections.footerPhoneNumber,
        footerEmail: sections.footerEmail,
        footerButtonText: sections.footerButtonText,
        copyrightText: sections.copyrightText,
        facebookUrl: sections.facebookUrl,
        instagramUrl: sections.instagramUrl,
        twitterUrl: sections.twitterUrl,
        linkedinUrl: sections.linkedinUrl,
        facebookActive: sections.facebookActive,
        instagramActive: sections.instagramActive,
        twitterActive: sections.twitterActive,
        linkedinActive: sections.linkedinActive,
        footerLocation: sections.footerLocation,
        footerLogoUrl: sections.footerLogoUrl,
      };
      break;
    case 'contact':
      updates = {
        contactTitle: sections.contactTitle,
        contactSubtitle: sections.contactSubtitle,
      };
      break;
    case 'contato':
      updates = {
        contatoTitle: sections.contatoTitle,
        contatoSubtitle: sections.contatoSubtitle,
        contatoDescription: sections.contatoDescription,
        contatoImageUrl: sections.contatoImageUrl,
      };
      break;
  }
  
  return updates;
};
