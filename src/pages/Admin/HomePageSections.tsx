
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSiteTexts, updateSiteText } from '@/utils/supabaseClient';

// Importar os componentes de seção
import HeaderSection from '@/components/admin/sections/HeaderSection';
import HeroSection from '@/components/admin/sections/HeroSection';
import WhatWeDoSection from '@/components/admin/sections/WhatWeDoSection';
import ExpansionSection from '@/components/admin/sections/ExpansionSection';
import FooterSection from '@/components/admin/sections/FooterSection';
import WhatsappSection from '@/components/admin/sections/WhatsappSection';

export default function HomePageSections() {
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<Record<string, string | boolean>>({
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
    facebookActive: true,
    instagramActive: true,
    twitterActive: true
  });

  const [activeTab, setActiveTab] = useState("header");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const siteTexts = await fetchSiteTexts();
      const updatedSections: Record<string, string | boolean> = {};
      
      // Processar cada campo do objeto sections com os valores retornados
      Object.keys(sections).forEach(key => {
        const value = siteTexts[key];
        
        if (key === 'facebookActive' || key === 'instagramActive' || key === 'twitterActive') {
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
      
      setSections(updatedSections);
    } catch (error) {
      console.error('Erro ao carregar textos:', error);
      toast.error('Erro ao carregar conteúdo das seções');
    } finally {
      setIsLoading(false);
    }
  };

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
            facebookActive: sections.facebookActive,
            instagramActive: sections.instagramActive,
            twitterActive: sections.twitterActive,
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

  if (isLoading && Object.values(sections).every(value => value === '')) {
    return <div className="p-6">Carregando conteúdo das seções...</div>;
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Gerenciar Seções da Página Inicial</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-6 overflow-x-auto">
          <TabsTrigger value="header">Cabeçalho</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="whatWeDo">O que Fazemos</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="expansion">Em Expansão</TabsTrigger>
          <TabsTrigger value="footer">Rodapé</TabsTrigger>
        </TabsList>
        
        {/* Renderizar os componentes de seção com base na aba ativa */}
        <TabsContent value="header">
          <HeaderSection 
            sections={sections} 
            handleInputChange={handleInputChange} 
            isLoading={isLoading} 
            handleSaveSection={handleSaveSection} 
          />
        </TabsContent>
        
        <TabsContent value="hero">
          <HeroSection 
            sections={sections} 
            handleInputChange={handleInputChange} 
            isLoading={isLoading} 
            handleSaveSection={handleSaveSection} 
          />
        </TabsContent>
        
        <TabsContent value="whatWeDo">
          <WhatWeDoSection 
            sections={sections} 
            handleInputChange={handleInputChange} 
            isLoading={isLoading} 
            handleSaveSection={handleSaveSection} 
          />
        </TabsContent>
        
        <TabsContent value="whatsapp">
          <WhatsappSection 
            sections={sections} 
            handleInputChange={handleInputChange} 
            isLoading={isLoading} 
            handleSaveSection={handleSaveSection} 
          />
        </TabsContent>
        
        <TabsContent value="expansion">
          <ExpansionSection 
            sections={sections} 
            handleInputChange={handleInputChange} 
            isLoading={isLoading} 
            handleSaveSection={handleSaveSection} 
          />
        </TabsContent>
        
        <TabsContent value="footer">
          <FooterSection 
            sections={sections} 
            handleInputChange={handleInputChange}
            handleSwitchChange={handleSwitchChange}
            isLoading={isLoading} 
            handleSaveSection={handleSaveSection} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
