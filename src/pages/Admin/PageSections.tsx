
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomButton } from '@/components/ui/CustomButton';
import { fetchSiteTexts, updateSiteText } from '@/utils/supabaseClient';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SectionProps {
  sections: Record<string, string | boolean | number>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  handleNumberChange: (name: string, value: number) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => void;
}

// Componente para solução individual
const SolucaoItem: React.FC<{
  index: number;
  sections: Record<string, string | boolean | number>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
}> = ({
  index,
  sections,
  handleInputChange,
  handleSwitchChange
}) => {
  const baseKey = `solucao${index}`;
  const layoutKey = `${baseKey}Layout`;
  const layoutValue = sections[layoutKey];
  const isImageLeft = layoutValue === 'image-left' || layoutValue === true;
  
  return (
    <div className="p-4 border rounded-md mb-4">
      <h4 className="text-md font-medium mb-2">Solução {index}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${baseKey}Title`} className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            id={`${baseKey}Title`}
            name={`${baseKey}Title`}
            type="text"
            value={sections[`${baseKey}Title`] as string || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor={`${baseKey}Image`} className="block text-sm font-medium text-gray-700 mb-1">
            URL da Imagem
          </label>
          <input
            id={`${baseKey}Image`}
            name={`${baseKey}Image`}
            type="text"
            value={sections[`${baseKey}Image`] as string || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mt-2">
        <label htmlFor={`${baseKey}Description`} className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id={`${baseKey}Description`}
          name={`${baseKey}Description`}
          value={sections[`${baseKey}Description`] as string || ''}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-2 flex items-center">
        <div className="flex items-center gap-2">
          <Switch 
            id={layoutKey}
            checked={isImageLeft}
            onCheckedChange={(checked) => handleSwitchChange(layoutKey, checked)}
          />
          <Label htmlFor={layoutKey}>
            {isImageLeft ? 'Imagem à esquerda, texto à direita' : 'Texto à esquerda, imagem à direita'}
          </Label>
        </div>
      </div>
    </div>
  );
};

// Componente para a página de Soluções
const SolucoesPageSection: React.FC<SectionProps> = ({
  sections,
  handleInputChange,
  handleSwitchChange,
  handleNumberChange,
  isLoading,
  handleSaveSection
}) => {
  const solucoesCount = Number(sections.solucoesCount) || 1;

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
            value={sections.solucoesTitle as string || ''}
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
            value={sections.solucoesSubtitle as string || ''}
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
            value={sections.solucoesDescription as string || ''}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        {/* Seção de informações do AI Robot, conforme imagem 3 */}
        <div className="border-t pt-4 mt-6">
          <h3 className="text-lg font-medium mb-4">Seção "Adote a Nossa AI"</h3>
          
          <div>
            <label htmlFor="solucoesAITitle" className="block text-sm font-medium text-gray-700 mb-1">
              Título da Seção AI
            </label>
            <input
              id="solucoesAITitle"
              name="solucoesAITitle"
              type="text"
              value={sections.solucoesAITitle as string || 'Conectamos a nossa AI aos seus processos operacionais'}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-3">
            <label htmlFor="solucoesAISubtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Subtítulo da Seção AI
            </label>
            <input
              id="solucoesAISubtitle"
              name="solucoesAISubtitle"
              type="text"
              value={sections.solucoesAISubtitle as string || 'ADOTE A NOSSA AI'}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-3">
            <label htmlFor="solucoesAIImage" className="block text-sm font-medium text-gray-700 mb-1">
              URL da Imagem do Robô
            </label>
            <input
              id="solucoesAIImage"
              name="solucoesAIImage"
              type="text"
              value={sections.solucoesAIImage as string || sections.robotImage as string}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-3">
            <label htmlFor="solucoesAIDescription1" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição Parte 1
            </label>
            <textarea
              id="solucoesAIDescription1"
              name="solucoesAIDescription1"
              value={sections.solucoesAIDescription1 as string || 'Na IAdmin, conectamos nossa inteligência artificial diretamente aos seus processos operacionais, transformando a maneira como sua empresa executa tarefas e toma decisões.'}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-3">
            <label htmlFor="solucoesAIDescription2" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição Parte 2 (com BPO-PN)
            </label>
            <textarea
              id="solucoesAIDescription2"
              name="solucoesAIDescription2"
              value={sections.solucoesAIDescription2 as string || 'Por meio do BPO-PN (Business Process Optimization - Processos de Negócios), otimizamos fluxos administrativos, financeiros e contratuais, garantindo maior eficiência e redução de custos. Já com o BPO-P&D (Business Process Optimization - Projetos e Desenvolvimento), nossa AI atua na gestão de projetos, aprimorando cronogramas, prevendo gargalos e gerando insights para um planejamento mais assertivo.'}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-3">
            <label htmlFor="solucoesAIDescription3" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição Parte 3
            </label>
            <textarea
              id="solucoesAIDescription3"
              name="solucoesAIDescription3"
              value={sections.solucoesAIDescription3 as string || 'Essa integração possibilita uma automação inteligente que vai além da execução de tarefas, criando um ambiente onde dados são utilizados de forma estratégica para potencializar resultados e ampliar sua competitividade no mercado. Seja na construção civil, condomínios ou outros segmentos, nossa tecnologia trabalha em sintonia com seus processos, garantindo maior produtividade e inovação.'}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="border-t pt-4 mt-6">
          <h3 className="text-lg font-medium mb-4">Soluções Personalizadas</h3>
          
          <div className="mb-4">
            <label htmlFor="solucoesCount" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Soluções (máximo 5)
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={solucoesCount} 
                onChange={(e) => handleNumberChange('solucoesCount', parseInt(e.target.value))}
                className="w-40"
              />
              <span className="text-sm font-medium">{solucoesCount}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {Array.from({ length: solucoesCount }).map((_, idx) => (
              <SolucaoItem 
                key={idx} 
                index={idx + 1}
                sections={sections}
                handleInputChange={handleInputChange}
                handleSwitchChange={handleSwitchChange}
              />
            ))}
          </div>
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
            value={sections.contatoTitle as string || ''}
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
            value={sections.contatoSubtitle as string || ''}
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
            value={sections.contatoDescription as string || ''}
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
            value={sections.contatoImageUrl as string || ''}
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
  const [sections, setSections] = useState<Record<string, string | boolean | number>>({
    // Solucoes page
    solucoesTitle: '',
    solucoesSubtitle: '',
    solucoesDescription: '',
    solucoesCount: 1,
    
    // AI Robot section
    solucoesAITitle: '',
    solucoesAISubtitle: '',
    solucoesAIImage: '',
    solucoesAIDescription1: '',
    solucoesAIDescription2: '',
    solucoesAIDescription3: '',
    
    // Soluções individuais
    solucao1Title: '',
    solucao1Description: '',
    solucao1Image: '',
    solucao1Layout: true, // true = imagem à esquerda, false = imagem à direita
    solucao2Title: '',
    solucao2Description: '',
    solucao2Image: '',
    solucao2Layout: true,
    solucao3Title: '',
    solucao3Description: '',
    solucao3Image: '',
    solucao3Layout: true,
    solucao4Title: '',
    solucao4Description: '',
    solucao4Image: '',
    solucao4Layout: true,
    solucao5Title: '',
    solucao5Description: '',
    solucao5Image: '',
    solucao5Layout: true,
    
    // Contato page
    contatoTitle: '',
    contatoSubtitle: '',
    contatoDescription: '',
    contatoImageUrl: '',
  });

  const [activeTab, setActiveTab] = useState("solucoes");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const siteTexts = await fetchSiteTexts();
      const updatedSections: Record<string, string | boolean | number> = { ...sections };
      
      // Processar cada campo do objeto sections com os valores retornados
      Object.keys(sections).forEach(key => {
        const value = siteTexts[key];
        
        if (key === 'solucoesCount') {
          const count = Number(value) || 1;
          updatedSections[key] = count > 5 ? 5 : (count < 1 ? 1 : count);
        } else if (key.endsWith('Layout')) {
          // Layout booleans - true = imagem à esquerda, false = imagem à direita
          if (value === 'image-left') {
            updatedSections[key] = true;
          } else if (value === 'image-right') {
            updatedSections[key] = false;
          } else {
            updatedSections[key] = value === false ? false : true;
          }
        } else {
          updatedSections[key] = value !== undefined ? value.toString() : '';
        }
      });
      
      // Definições padrão para campos que podem não ter valores
      if (!updatedSections.solucoesTitle) updatedSections.solucoesTitle = 'Nossas Soluções';
      if (!updatedSections.contatoTitle) updatedSections.contatoTitle = 'Entre em Contato';
      if (!updatedSections.solucoesAITitle) updatedSections.solucoesAITitle = 'Conectamos a nossa AI aos seus processos operacionais';
      if (!updatedSections.solucoesAISubtitle) updatedSections.solucoesAISubtitle = 'ADOTE A NOSSA AI';
      
      setSections(updatedSections);
      
      console.log('Dados carregados do site:', updatedSections);
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
  
  const handleNumberChange = (name: string, value: number) => {
    setSections(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveSection = async (section: string) => {
    setIsLoading(true);
    
    try {
      let updates: Record<string, string | boolean | number> = {};
      
      // Determinar quais campos salvar com base na seção
      switch (section) {
        case 'solucoes':
          updates = {
            solucoesTitle: sections.solucoesTitle,
            solucoesSubtitle: sections.solucoesSubtitle,
            solucoesDescription: sections.solucoesDescription,
            solucoesCount: sections.solucoesCount,
            solucoesAITitle: sections.solucoesAITitle,
            solucoesAISubtitle: sections.solucoesAISubtitle,
            solucoesAIImage: sections.solucoesAIImage,
            solucoesAIDescription1: sections.solucoesAIDescription1,
            solucoesAIDescription2: sections.solucoesAIDescription2,
            solucoesAIDescription3: sections.solucoesAIDescription3,
          };
          
          // Adicionar todas as soluções com base no número configurado
          for (let i = 1; i <= 5; i++) {
            if (i <= Number(sections.solucoesCount)) {
              updates[`solucao${i}Title`] = sections[`solucao${i}Title`];
              updates[`solucao${i}Description`] = sections[`solucao${i}Description`];
              updates[`solucao${i}Image`] = sections[`solucao${i}Image`];
              // Converter boolean para string para armazenamento
              updates[`solucao${i}Layout`] = sections[`solucao${i}Layout`] ? 'image-left' : 'image-right';
            }
          }
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
      
      console.log(`Salvando seção ${section} com dados:`, updates);
      
      // Salvar cada campo - convertendo números para string para compatibilidade
      const promises = Object.entries(updates).map(([key, value]) => {
        // Converter números para string antes de salvar
        const stringValue = typeof value === 'number' ? value.toString() : value;
        return updateSiteText(key, stringValue);
      });
      
      await Promise.all(promises);
      
      toast.success('Seção atualizada com sucesso!');
      
      // Recarregar os dados para garantir que tudo foi salvo corretamente
      setTimeout(() => {
        loadData();
      }, 500);
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
    <div className="animate-fade-in w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Gerenciar Seções de Páginas</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6 w-full">
          <TabsTrigger value="solucoes">Página de Soluções</TabsTrigger>
          <TabsTrigger value="contato">Página de Contato</TabsTrigger>
        </TabsList>
        
        <TabsContent value="solucoes" className="w-full">
          <SolucoesPageSection 
            sections={sections} 
            handleInputChange={handleInputChange}
            handleSwitchChange={handleSwitchChange}
            handleNumberChange={handleNumberChange}
            isLoading={isLoading}
            handleSaveSection={handleSaveSection}
          />
        </TabsContent>
        
        <TabsContent value="contato" className="w-full">
          <ContatoPageSection 
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
