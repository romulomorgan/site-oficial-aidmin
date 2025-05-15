
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
import AdminLayout from '@/components/admin/AdminLayout';
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
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Seções da Página Inicial</h1>
        <Tabs defaultValue="header">
          <TabsList className="mb-4">
            <TabsTrigger value="header">Cabeçalho</TabsTrigger>
            <TabsTrigger value="hero">Hero</TabsTrigger>
            <TabsTrigger value="whatWeDo">O Que Fazemos</TabsTrigger>
            <TabsTrigger value="expansion">Em Expansão</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="footer">Rodapé</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
          </TabsList>
          
          <TabsContent value="header">
            <HeaderSection {...sectionProps} />
          </TabsContent>
          
          <TabsContent value="hero">
            <HeroSection {...sectionProps} />
          </TabsContent>
          
          <TabsContent value="whatWeDo">
            <WhatWeDoSection {...sectionProps} />
          </TabsContent>
          
          <TabsContent value="expansion">
            <ExpansionSection {...sectionProps} />
          </TabsContent>
          
          <TabsContent value="whatsapp">
            <WhatsappSection {...sectionProps} />
          </TabsContent>
          
          <TabsContent value="footer">
            <FooterSection {...sectionProps} />
          </TabsContent>
          
          <TabsContent value="contact">
            <ContactSection {...sectionProps} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default HomePageSections;
