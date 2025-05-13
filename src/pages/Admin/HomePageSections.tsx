
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Importar os hooks criados
import { useHomeSectionsData } from "@/hooks/useHomeSectionsData";
import { useHomeSectionsHandlers } from "@/hooks/useHomeSectionsHandlers";

// Importar os componentes de seção
import HeaderSection from '@/components/admin/sections/HeaderSection';
import HeroSection from '@/components/admin/sections/HeroSection';
import WhatWeDoSection from '@/components/admin/sections/WhatWeDoSection';
import ExpansionSection from '@/components/admin/sections/ExpansionSection';
import FooterSection from '@/components/admin/sections/FooterSection';
import WhatsappSection from '@/components/admin/sections/WhatsappSection';

export default function HomePageSections() {
  const { isLoading: isDataLoading, sections, setSections, loadData } = useHomeSectionsData();
  const { isLoading: isHandlerLoading, handleInputChange, handleSwitchChange, handleSaveSection } = useHomeSectionsHandlers({
    sections,
    setSections,
    loadData
  });

  const [activeTab, setActiveTab] = useState("header");
  
  const isLoading = isDataLoading || isHandlerLoading;

  useEffect(() => {
    loadData();
  }, []);

  if (isDataLoading && Object.values(sections).every(value => value === '')) {
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
