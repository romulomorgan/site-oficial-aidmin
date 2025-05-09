
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSiteTexts, updateSiteText } from '@/utils/supabaseClient';

// Importar os componentes de seção
import HeaderSection from '@/components/admin/sections/HeaderSection';
import HeroSection from '@/components/admin/sections/HeroSection';
import WhatWeDoSection from '@/components/admin/sections/WhatWeDoSection';
import ExpansionSection from '@/components/admin/sections/ExpansionSection';
import TestimonialsSection from '@/components/admin/sections/TestimonialsSection';
import WhatsappSection from '@/components/admin/sections/WhatsappSection';
import FAQSection from '@/components/admin/sections/FAQSection';
import ContactSection from '@/components/admin/sections/ContactSection';
import FooterSection from '@/components/admin/sections/FooterSection';

export default function HomePageSections() {
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<Record<string, string>>({
    // Header Section
    logoUrl: '',
    siteTitle: '',
    faviconUrl: '',
    
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
    
    // Depoimentos Section
    testimonialsTitle: '',
    
    // WhatsApp Section
    whatsappTitle: '',
    whatsappSubtitle: '',
    whatsappDescription: '',
    whatsappButtonText: '',
    whatsappButtonLink: '',
    whatsappImage: '',
    
    // FAQ Section
    faqTitle: '',
    
    // Contato Section
    contactTitle: '',
    contactSubtitle: '',
    contactButtonText: '',
    
    // Footer Section
    companyName: '',
    footerAbout: '',
    footerPhoneNumber: '',
    footerEmail: '',
    footerButtonText: '',
    copyrightText: ''
  });

  const [activeTab, setActiveTab] = useState("header");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const siteTexts = await fetchSiteTexts();
      const updatedSections: Record<string, string> = {};
      
      // Processar cada campo do objeto sections com os valores retornados
      Object.keys(sections).forEach(key => {
        const value = siteTexts[key];
        updatedSections[key] = value?.toString() || '';
      });
      
      // Definições padrão para campos que podem não ter valores
      if (!updatedSections.siteTitle) updatedSections.siteTitle = 'IAdmin';
      if (!updatedSections.heroTitle) updatedSections.heroTitle = 'Destrave a fronteira da produtividade.';
      if (!updatedSections.heroSubtitle) updatedSections.heroSubtitle = 'Exploramos os limites da AI Generativa para criar novos produtos, avenidas de receitas e gerar eficiência operacional.';
      if (!updatedSections.heroButtonText) updatedSections.heroButtonText = 'Fale Conosco';
      if (!updatedSections.heroButtonLink) updatedSections.heroButtonLink = '/solucoes';
      
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

  const handleSaveSection = async (section: string) => {
    setIsLoading(true);
    
    try {
      let updates: Record<string, string> = {};
      
      // Determinar quais campos salvar com base na seção
      switch (section) {
        case 'header':
          updates = {
            logoUrl: sections.logoUrl,
            siteTitle: sections.siteTitle,
            faviconUrl: sections.faviconUrl,
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
        case 'testimonials':
          updates = {
            testimonialsTitle: sections.testimonialsTitle,
          };
          break;
        case 'whatsapp':
          updates = {
            whatsappTitle: sections.whatsappTitle,
            whatsappSubtitle: sections.whatsappSubtitle,
            whatsappDescription: sections.whatsappDescription,
            whatsappButtonText: sections.whatsappButtonText,
            whatsappButtonLink: sections.whatsappButtonLink,
            whatsappImage: sections.whatsappImage,
          };
          break;
        case 'faq':
          updates = {
            faqTitle: sections.faqTitle,
          };
          break;
        case 'contact':
          updates = {
            contactTitle: sections.contactTitle,
            contactSubtitle: sections.contactSubtitle,
            contactButtonText: sections.contactButtonText,
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
        <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 mb-6 overflow-x-auto">
          <TabsTrigger value="header">Cabeçalho</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="whatWeDo">O que Fazemos</TabsTrigger>
          <TabsTrigger value="expansion">Em Expansão</TabsTrigger>
          <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
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
        
        <TabsContent value="expansion">
          <ExpansionSection 
            sections={sections} 
            handleInputChange={handleInputChange} 
            isLoading={isLoading} 
            handleSaveSection={handleSaveSection} 
          />
        </TabsContent>
        
        <TabsContent value="testimonials">
          <TestimonialsSection 
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
        
        <TabsContent value="faq">
          <FAQSection 
            sections={sections} 
            handleInputChange={handleInputChange} 
            isLoading={isLoading} 
            handleSaveSection={handleSaveSection} 
          />
        </TabsContent>
        
        <TabsContent value="contact">
          <ContactSection 
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
            isLoading={isLoading} 
            handleSaveSection={handleSaveSection} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
