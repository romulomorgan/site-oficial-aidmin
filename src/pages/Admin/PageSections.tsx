
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomButton } from '@/components/ui/CustomButton';
import { fetchSiteTexts, updateSiteText } from '@/utils/supabaseClient';

interface SectionProps {
  sections: Record<string, string | boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => void;
}

// Componente para a página de Soluções
const SolucoesPageSection: React.FC<SectionProps> = ({
  sections,
  handleInputChange,
  isLoading,
  handleSaveSection
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Seção de Soluções</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="solucoesTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Título da Página
          </label>
          <input
            id="solucoesTitle"
            name="solucoesTitle"
            type="text"
            value={sections.solucoesTitle || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="solucoesSubtitle" className="block text-sm font-medium text-gray-700 mb-1">
            Subtítulo
          </label>
          <input
            id="solucoesSubtitle"
            name="solucoesSubtitle"
            type="text"
            value={sections.solucoesSubtitle || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="solucoesDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            id="solucoesDescription"
            name="solucoesDescription"
            value={sections.solucoesDescription || ''}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">Solução 1</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="solucao1Title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                id="solucao1Title"
                name="solucao1Title"
                type="text"
                value={sections.solucao1Title || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="solucao1Image" className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem
              </label>
              <input
                id="solucao1Image"
                name="solucao1Image"
                type="text"
                value={sections.solucao1Image || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="solucao1Description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              id="solucao1Description"
              name="solucao1Description"
              value={sections.solucao1Description || ''}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">Solução 2</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="solucao2Title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                id="solucao2Title"
                name="solucao2Title"
                type="text"
                value={sections.solucao2Title || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="solucao2Image" className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem
              </label>
              <input
                id="solucao2Image"
                name="solucao2Image"
                type="text"
                value={sections.solucao2Image || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="solucao2Description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              id="solucao2Description"
              name="solucao2Description"
              value={sections.solucao2Description || ''}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">Solução 3</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="solucao3Title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                id="solucao3Title"
                name="solucao3Title"
                type="text"
                value={sections.solucao3Title || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label htmlFor="solucao3Image" className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem
              </label>
              <input
                id="solucao3Image"
                name="solucao3Image"
                type="text"
                value={sections.solucao3Image || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <div className="mt-2">
            <label htmlFor="solucao3Description" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              id="solucao3Description"
              name="solucao3Description"
              value={sections.solucao3Description || ''}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="solucoesCTATitle" className="block text-sm font-medium text-gray-700 mb-1">
            Título do CTA
          </label>
          <input
            id="solucoesCTATitle"
            name="solucoesCTATitle"
            type="text"
            value={sections.solucoesCTATitle || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="solucoesCTAButtonText" className="block text-sm font-medium text-gray-700 mb-1">
            Texto do Botão CTA
          </label>
          <input
            id="solucoesCTAButtonText"
            name="solucoesCTAButtonText"
            type="text"
            value={sections.solucoesCTAButtonText || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="solucoesCTAButtonLink" className="block text-sm font-medium text-gray-700 mb-1">
            Link do Botão CTA
          </label>
          <input
            id="solucoesCTAButtonLink"
            name="solucoesCTAButtonLink"
            type="text"
            value={sections.solucoesCTAButtonLink || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div className="mt-6">
        <CustomButton
          variant="primary"
          onClick={() => handleSaveSection('solucoes')}
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </CustomButton>
      </div>
    </div>
  );
};

// Componente para a página de Contato
const ContatoPageSection: React.FC<SectionProps> = ({
  sections,
  handleInputChange,
  isLoading,
  handleSaveSection
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Seção de Contato</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="contatoTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Título da Página
          </label>
          <input
            id="contatoTitle"
            name="contatoTitle"
            type="text"
            value={sections.contatoTitle || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="contatoSubtitle" className="block text-sm font-medium text-gray-700 mb-1">
            Subtítulo
          </label>
          <input
            id="contatoSubtitle"
            name="contatoSubtitle"
            type="text"
            value={sections.contatoSubtitle || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="contatoDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            id="contatoDescription"
            name="contatoDescription"
            value={sections.contatoDescription || ''}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="contatoImageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            URL da Imagem
          </label>
          <input
            id="contatoImageUrl"
            name="contatoImageUrl"
            type="text"
            value={sections.contatoImageUrl || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <h4 className="text-md font-medium mb-2">Informações de Contato</h4>
          
          <div className="space-y-3">
            <div>
              <label htmlFor="contatoAddress" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço
              </label>
              <input
                id="contatoAddress"
                name="contatoAddress"
                type="text"
                value={sections.contatoAddress || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="contatoPhone" className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                id="contatoPhone"
                name="contatoPhone"
                type="text"
                value={sections.contatoPhone || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label htmlFor="contatoEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="contatoEmail"
                name="contatoEmail"
                type="email"
                value={sections.contatoEmail || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="contatoFormTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Título do Formulário
          </label>
          <input
            id="contatoFormTitle"
            name="contatoFormTitle"
            type="text"
            value={sections.contatoFormTitle || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="contatoFormSubtitle" className="block text-sm font-medium text-gray-700 mb-1">
            Subtítulo do Formulário
          </label>
          <input
            id="contatoFormSubtitle"
            name="contatoFormSubtitle"
            type="text"
            value={sections.contatoFormSubtitle || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="contatoButtonText" className="block text-sm font-medium text-gray-700 mb-1">
            Texto do Botão de Envio
          </label>
          <input
            id="contatoButtonText"
            name="contatoButtonText"
            type="text"
            value={sections.contatoButtonText || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div className="mt-6">
        <CustomButton
          variant="primary"
          onClick={() => handleSaveSection('contato')}
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </CustomButton>
      </div>
    </div>
  );
};

export default function PageSections() {
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState<Record<string, string | boolean>>({
    // Solucoes page
    solucoesTitle: '',
    solucoesSubtitle: '',
    solucoesDescription: '',
    solucao1Title: '',
    solucao1Description: '',
    solucao1Image: '',
    solucao2Title: '',
    solucao2Description: '',
    solucao2Image: '',
    solucao3Title: '',
    solucao3Description: '',
    solucao3Image: '',
    solucoesCTATitle: '',
    solucoesCTAButtonText: '',
    solucoesCTAButtonLink: '',
    
    // Contato page
    contatoTitle: '',
    contatoSubtitle: '',
    contatoDescription: '',
    contatoImageUrl: '',
    contatoAddress: '',
    contatoPhone: '',
    contatoEmail: '',
    contatoFormTitle: '',
    contatoFormSubtitle: '',
    contatoButtonText: '',
  });

  const [activeTab, setActiveTab] = useState("solucoes");

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
        updatedSections[key] = value?.toString() || '';
      });
      
      // Definições padrão para campos que podem não ter valores
      if (!updatedSections.solucoesTitle) updatedSections.solucoesTitle = 'Nossas Soluções';
      if (!updatedSections.contatoTitle) updatedSections.contatoTitle = 'Entre em Contato';
      
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
      let updates: Record<string, string | boolean> = {};
      
      // Determinar quais campos salvar com base na seção
      switch (section) {
        case 'solucoes':
          updates = {
            solucoesTitle: sections.solucoesTitle,
            solucoesSubtitle: sections.solucoesSubtitle,
            solucoesDescription: sections.solucoesDescription,
            solucao1Title: sections.solucao1Title,
            solucao1Description: sections.solucao1Description,
            solucao1Image: sections.solucao1Image,
            solucao2Title: sections.solucao2Title,
            solucao2Description: sections.solucao2Description,
            solucao2Image: sections.solucao2Image,
            solucao3Title: sections.solucao3Title,
            solucao3Description: sections.solucao3Description,
            solucao3Image: sections.solucao3Image,
            solucoesCTATitle: sections.solucoesCTATitle,
            solucoesCTAButtonText: sections.solucoesCTAButtonText,
            solucoesCTAButtonLink: sections.solucoesCTAButtonLink,
          };
          break;
        case 'contato':
          updates = {
            contatoTitle: sections.contatoTitle,
            contatoSubtitle: sections.contatoSubtitle,
            contatoDescription: sections.contatoDescription,
            contatoImageUrl: sections.contatoImageUrl,
            contatoAddress: sections.contatoAddress,
            contatoPhone: sections.contatoPhone,
            contatoEmail: sections.contatoEmail,
            contatoFormTitle: sections.contatoFormTitle,
            contatoFormSubtitle: sections.contatoFormSubtitle,
            contatoButtonText: sections.contatoButtonText,
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
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Gerenciar Seções de Páginas</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="solucoes">Página de Soluções</TabsTrigger>
          <TabsTrigger value="contato">Página de Contato</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solucoes">
          <SolucoesPageSection 
            sections={sections} 
            handleInputChange={handleInputChange} 
            isLoading={isLoading}
            handleSaveSection={handleSaveSection}
          />
        </TabsContent>
        
        <TabsContent value="contato">
          <ContatoPageSection 
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
