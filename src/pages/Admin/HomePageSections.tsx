
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LoaderIcon } from 'lucide-react';
import HeaderSection from '@/components/admin/sections/HeaderSection';
import HeroSection from '@/components/admin/sections/HeroSection';
import WhatWeDoSection from '@/components/admin/sections/WhatWeDoSection';
import ExpansionSection from '@/components/admin/sections/ExpansionSection';
import WhatsappSection from '@/components/admin/sections/WhatsappSection';
import FooterSection from '@/components/admin/sections/FooterSection';
import ContactSection from '@/components/admin/sections/ContactSection';
import { SectionHandlerProps } from '@/hooks/homeSections/types';
import { useHomeSectionsData, useHomeSectionsHandlers } from '@/hooks/homeSections';

const HomePageSections = () => {
  const { sections, setSections, isLoading } = useHomeSectionsData();
  const { handleInputChange, handleSwitchChange, handleSaveSection, isLoading: isSaving } = 
    useHomeSectionsHandlers(sections, setSections);
  
  const sectionProps: SectionHandlerProps = {
    sections,
    handleInputChange,
    handleSwitchChange,
    isLoading: isSaving,
    handleSaveSection
  };
  
  return (
    <div className="w-full animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Seções da Página Inicial</h1>
      <Tabs defaultValue="header" className="w-full">
        <TabsList className="mb-4 w-full flex flex-wrap">
          <TabsTrigger value="header">Cabeçalho</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="whatWeDo">O Que Fazemos</TabsTrigger>
          <TabsTrigger value="expansion">Em Expansão</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="footer">Rodapé</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
        </TabsList>
        
        <TabsContent value="header" className="w-full">
          <HeaderSection {...sectionProps} />
        </TabsContent>
        
        <TabsContent value="hero" className="w-full">
          <HeroSection {...sectionProps} />
        </TabsContent>
        
        <TabsContent value="whatWeDo" className="w-full">
          <WhatWeDoSection {...sectionProps} />
        </TabsContent>
        
        <TabsContent value="expansion" className="w-full">
          <ExpansionSection {...sectionProps} />
        </TabsContent>
        
        <TabsContent value="whatsapp" className="w-full">
          <WhatsappSection {...sectionProps} />
        </TabsContent>
        
        <TabsContent value="footer" className="w-full">
          <FooterSection {...sectionProps} />
        </TabsContent>
        
        <TabsContent value="contact" className="w-full">
          <ContactSection {...sectionProps} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HomePageSections;
