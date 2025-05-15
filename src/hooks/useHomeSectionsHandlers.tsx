import { useState } from 'react';
import { toast } from 'sonner';
import { updateSiteText } from '@/utils/supabaseClient';
import { HomeSectionsState } from './homeSections';

interface HomeSectionsHandlersProps {
  sections: HomeSectionsState;
  setSections: React.Dispatch<React.SetStateAction<HomeSectionsState>>;
  loadData: () => Promise<void>;
}

export const useHomeSectionsHandlers = ({ 
  sections, 
  setSections, 
  loadData 
}: HomeSectionsHandlersProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSections(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setSections(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSaveSection = async (section: string) => {
    setIsLoading(true);
    
    try {
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
      }
      
      // Salvar cada campo
      for (const [key, value] of Object.entries(updates)) {
        await updateSiteText(key, value);
      }
      
      toast.success('Seção atualizada com sucesso!');
    } catch (error) {
      console.error(`Erro ao salvar seção ${section}:`, error);
      toast.error('Ocorreu um erro ao salvar as alterações');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleInputChange,
    handleSwitchChange,
    handleSaveSection
  };
};
