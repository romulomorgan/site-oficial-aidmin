
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SolucoesSection from '@/components/admin/sections/SolucoesSection';
import ContatoSection from '@/components/admin/sections/ContatoSection';
import { useSectionData } from '@/hooks/useSectionData';
import { useSectionHandlers } from '@/hooks/useSectionHandlers';

export default function PageSections() {
  const [activeTab, setActiveTab] = useState("solucoes");
  
  // Use custom hooks to manage section data and form handlers
  const { sections, setSections, loadData, isLoading: isDataLoading } = useSectionData();
  const { 
    isLoading: isActionLoading, 
    handleInputChange, 
    handleSwitchChange, 
    handleNumberChange, 
    handleSaveSection 
  } = useSectionHandlers({
    sections,
    setSections,
    loadData
  });
  
  // Determine if we're in a loading state
  const isLoading = isDataLoading || isActionLoading;

  if (isDataLoading && Object.values(sections).every(value => value === '')) {
    return <div className="p-6">Carregando conteúdo das seções...</div>;
  }

  return (
    <div className="animate-fade-in w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Gerenciar Seções de Páginas</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6 w-full">
          <TabsTrigger value="solucoes">Página de Soluções</TabsTrigger>
          <TabsTrigger value="contato">Página de Contato</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solucoes" className="w-full">
          <SolucoesSection 
            sections={sections} 
            handleInputChange={handleInputChange}
            handleSwitchChange={handleSwitchChange}
            handleNumberChange={handleNumberChange}
            isLoading={isLoading}
            handleSaveSection={handleSaveSection}
          />
        </TabsContent>
        
        <TabsContent value="contato" className="w-full">
          <ContatoSection 
            sections={sections} 
            handleInputChange={handleInputChange}
            handleSwitchChange={handleSwitchChange}
            handleNumberChange={handleNumberChange}
            isLoading={isLoading}
            handleSaveSection={handleSaveSection}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
