
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomButton } from '@/components/ui/CustomButton';
import { fetchSiteTexts, updateSiteText } from '@/utils/supabaseClient';

export default function HomePageSections() {
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState({
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

  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const siteTexts = await fetchSiteTexts();
        setSections({
          // Hero Section
          heroTitle: siteTexts.heroTitle?.toString() || 'Destrave a fronteira da produtividade.',
          heroSubtitle: siteTexts.heroSubtitle?.toString() || 'Exploramos os limites da AI Generativa para criar novos produtos, avenidas de receitas e gerar eficiência operacional.',
          heroButtonText: siteTexts.heroButtonText?.toString() || 'Fale Conosco',
          heroButtonLink: siteTexts.heroButtonLink?.toString() || '/solucoes',
          heroVideoUrl: siteTexts.heroVideoUrl?.toString() || '',
          
          // O que fazemos Section
          whatWeDoTitle: siteTexts.whatWeDoTitle?.toString() || 'Criamos e treinamos a sua AI',
          whatWeDoSubtitle: siteTexts.whatWeDoSubtitle?.toString() || 'O QUE FAZEMOS DE MELHOR',
          
          // Assistente Section
          assistantCardTitle: siteTexts.assistantCardTitle?.toString() || 'ASSISTENTE DE IA',
          assistantCardDescription: siteTexts.assistantCardDescription?.toString() || '',
          assistantCardImage: siteTexts.assistantCardImage?.toString() || '/lovable-uploads/c739c386-c6c9-4bb8-9996-98b3a3161fad.png',
          
          // BPO Processos Section
          bpoProcessosCardTitle: siteTexts.bpoProcessosCardTitle?.toString() || 'BPO COM PROCESSOS DE NEGÓCIOS',
          bpoProcessosCardDescription: siteTexts.bpoProcessosCardDescription?.toString() || '',
          bpoProcessosCardImage: siteTexts.bpoProcessosCardImage?.toString() || '/lovable-uploads/232e98e1-6691-4748-89c8-dd6300343696.png',
          
          // BPO Projetos Section
          bpoProjetosCardTitle: siteTexts.bpoProjetosCardTitle?.toString() || 'BPO COM PROJETOS E DESENVOLVIMENTO',
          bpoProjetosCardDescription: siteTexts.bpoProjetosCardDescription?.toString() || '',
          bpoProjetosCardImage: siteTexts.bpoProjetosCardImage?.toString() || '/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png',
          
          // Em expansão Section
          expansionTitle: siteTexts.expansionTitle?.toString() || 'Em expansão para o segmento da construção civil e condomínios.',
          expansionSubtitle: siteTexts.expansionSubtitle?.toString() || 'A QUEM ATENDEMOS',
          expansionDescription: siteTexts.expansionDescription?.toString() || 'Integração de IA com sistemas existentes de construtoras. A AI Generativa transforma seus processos corporativos e operacionais. Na Virtia, trabalhamos com processos de compras e gerenciamento de contratos, análise de dados para melhor tomada de decisões, automação de relatórios e integração com sistemas de gestão de condomínio.',
          expansionImage: siteTexts.expansionImage?.toString() || '/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png',
          
          // Estatísticas
          statsYears: siteTexts.statsYears?.toString() || '3+',
          statsProjects: siteTexts.statsProjects?.toString() || '600+',
          statsCompanies: siteTexts.statsCompanies?.toString() || '40+',
          statsAutomations: siteTexts.statsAutomations?.toString() || '47k+',
          
          // Depoimentos Section
          testimonialsTitle: siteTexts.testimonialsTitle?.toString() || 'Veja o impacto eletrizante da nossa AI',
          
          // WhatsApp Section
          whatsappTitle: siteTexts.whatsappTitle?.toString() || 'WhatsApp Business',
          whatsappSubtitle: siteTexts.whatsappSubtitle?.toString() || 'INTEGRAÇÃO',
          whatsappDescription: siteTexts.whatsappDescription?.toString() || 'A Virtia faz a ponte perfeita entre sua IA e o WhatsApp. A integração permite que sua assistente de IA converse diretamente com seus clientes, proporcionando atendimento personalizado e respostas instantâneas. Ganhe eficiência e escala sem perder o toque humano na comunicação.',
          whatsappButtonText: siteTexts.whatsappButtonText?.toString() || 'Contrate a Virtia',
          whatsappButtonLink: siteTexts.whatsappButtonLink?.toString() || '#',
          whatsappImage: siteTexts.whatsappImage?.toString() || '/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png',
          
          // FAQ Section
          faqTitle: siteTexts.faqTitle?.toString() || 'Perguntas Frequentes',
          
          // Contato Section
          contactTitle: siteTexts.contactTitle?.toString() || 'Deixe seu contato',
          contactSubtitle: siteTexts.contactSubtitle?.toString() || 'Fale com um especialista da nossa equipe',
          contactButtonText: siteTexts.contactButtonText?.toString() || 'Enviar',
          
          // Footer Section
          companyName: siteTexts.companyName?.toString() || 'Virtia',
          footerAbout: siteTexts.footerAbout?.toString() || 'A sua assistente de AI',
          footerPhoneNumber: siteTexts.footerPhoneNumber?.toString() || '(11) 93956-965',
          footerEmail: siteTexts.footerEmail?.toString() || 'iadminassistant@gmail.com',
          footerButtonText: siteTexts.footerButtonText?.toString() || 'Contrate uma AI Poderosa!',
          copyrightText: siteTexts.copyrightText?.toString() || '© Todos os direitos reservados - IAdmin 2024'
        });
      } catch (error) {
        console.error('Erro ao carregar textos:', error);
        toast.error('Erro ao carregar conteúdo das seções');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

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
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 mb-6 overflow-x-auto">
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="whatWeDo">O que Fazemos</TabsTrigger>
          <TabsTrigger value="expansion">Em Expansão</TabsTrigger>
          <TabsTrigger value="testimonials">Depoimentos</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contato</TabsTrigger>
          <TabsTrigger value="footer">Rodapé</TabsTrigger>
        </TabsList>
        
        {/* Hero Section */}
        <TabsContent value="hero" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Seção Principal (Hero)</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                name="heroTitle"
                value={sections.heroTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
              <textarea
                name="heroSubtitle"
                value={sections.heroSubtitle}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
              <input
                type="text"
                name="heroButtonText"
                value={sections.heroButtonText}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link do Botão</label>
              <input
                type="text"
                name="heroButtonLink"
                value={sections.heroButtonLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL do Vídeo</label>
              <input
                type="text"
                name="heroVideoUrl"
                value={sections.heroVideoUrl}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="URL do vídeo do YouTube ou outro serviço"
              />
            </div>
            
            <div className="flex justify-end">
              <CustomButton 
                onClick={() => handleSaveSection('hero')}
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </CustomButton>
            </div>
          </div>
        </TabsContent>
        
        {/* O que Fazemos Section */}
        <TabsContent value="whatWeDo" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "O que Fazemos de Melhor"</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
                <input
                  type="text"
                  name="whatWeDoSubtitle"
                  value={sections.whatWeDoSubtitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                <input
                  type="text"
                  name="whatWeDoTitle"
                  value={sections.whatWeDoTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-800 mb-4">Cartão: Assistente de IA</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    name="assistantCardTitle"
                    value={sections.assistantCardTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                  <input
                    type="text"
                    name="assistantCardImage"
                    value={sections.assistantCardImage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  name="assistantCardDescription"
                  value={sections.assistantCardDescription}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-800 mb-4">Cartão: BPO com Processos de Negócios</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    name="bpoProcessosCardTitle"
                    value={sections.bpoProcessosCardTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                  <input
                    type="text"
                    name="bpoProcessosCardImage"
                    value={sections.bpoProcessosCardImage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  name="bpoProcessosCardDescription"
                  value={sections.bpoProcessosCardDescription}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-800 mb-4">Cartão: BPO com Projetos e Desenvolvimento</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                  <input
                    type="text"
                    name="bpoProjetosCardTitle"
                    value={sections.bpoProjetosCardTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
                  <input
                    type="text"
                    name="bpoProjetosCardImage"
                    value={sections.bpoProjetosCardImage}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  name="bpoProjetosCardDescription"
                  value={sections.bpoProjetosCardDescription}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <CustomButton 
                onClick={() => handleSaveSection('whatWeDo')}
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </CustomButton>
            </div>
          </div>
        </TabsContent>
        
        {/* Em Expansão Section */}
        <TabsContent value="expansion" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "Em Expansão"</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
              <input
                type="text"
                name="expansionSubtitle"
                value={sections.expansionSubtitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                name="expansionTitle"
                value={sections.expansionTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                name="expansionDescription"
                value={sections.expansionDescription}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
              <input
                type="text"
                name="expansionImage"
                value={sections.expansionImage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="border-t pt-6">
              <h3 className="font-medium text-gray-800 mb-4">Estatísticas</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Anos de Experiência</label>
                  <input
                    type="text"
                    name="statsYears"
                    value={sections.statsYears}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Projetos Executados</label>
                  <input
                    type="text"
                    name="statsProjects"
                    value={sections.statsProjects}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Empresas Atendidas</label>
                  <input
                    type="text"
                    name="statsCompanies"
                    value={sections.statsCompanies}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Automatizações por Mês</label>
                  <input
                    type="text"
                    name="statsAutomations"
                    value={sections.statsAutomations}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <CustomButton 
                onClick={() => handleSaveSection('expansion')}
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </CustomButton>
            </div>
          </div>
        </TabsContent>
        
        {/* Depoimentos Section */}
        <TabsContent value="testimonials" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "Depoimentos"</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                name="testimonialsTitle"
                value={sections.testimonialsTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex justify-end">
              <CustomButton 
                onClick={() => handleSaveSection('testimonials')}
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </CustomButton>
            </div>
          </div>
        </TabsContent>
        
        {/* WhatsApp Section */}
        <TabsContent value="whatsapp" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "WhatsApp Integration"</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
              <input
                type="text"
                name="whatsappSubtitle"
                value={sections.whatsappSubtitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                name="whatsappTitle"
                value={sections.whatsappTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                name="whatsappDescription"
                value={sections.whatsappDescription}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
              <input
                type="text"
                name="whatsappButtonText"
                value={sections.whatsappButtonText}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link do Botão</label>
              <input
                type="text"
                name="whatsappButtonLink"
                value={sections.whatsappButtonLink}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
              <input
                type="text"
                name="whatsappImage"
                value={sections.whatsappImage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex justify-end">
              <CustomButton 
                onClick={() => handleSaveSection('whatsapp')}
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </CustomButton>
            </div>
          </div>
        </TabsContent>
        
        {/* FAQ Section */}
        <TabsContent value="faq" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "FAQ"</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                name="faqTitle"
                value={sections.faqTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex justify-end">
              <CustomButton 
                onClick={() => handleSaveSection('faq')}
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </CustomButton>
            </div>
          </div>
        </TabsContent>
        
        {/* Contato Section */}
        <TabsContent value="contact" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "Contato"</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                name="contactTitle"
                value={sections.contactTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
              <input
                type="text"
                name="contactSubtitle"
                value={sections.contactSubtitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
              <input
                type="text"
                name="contactButtonText"
                value={sections.contactButtonText}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex justify-end">
              <CustomButton 
                onClick={() => handleSaveSection('contact')}
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </CustomButton>
            </div>
          </div>
        </TabsContent>
        
        {/* Footer Section */}
        <TabsContent value="footer" className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "Rodapé"</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
              <input
                type="text"
                name="companyName"
                value={sections.companyName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
              <textarea
                name="footerAbout"
                value={sections.footerAbout}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
              <input
                type="text"
                name="footerPhoneNumber"
                value={sections.footerPhoneNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="text"
                name="footerEmail"
                value={sections.footerEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
              <input
                type="text"
                name="footerButtonText"
                value={sections.footerButtonText}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Texto de Copyright</label>
              <input
                type="text"
                name="copyrightText"
                value={sections.copyrightText}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex justify-end">
              <CustomButton 
                onClick={() => handleSaveSection('footer')}
                variant="primary"
                disabled={isLoading}
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </CustomButton>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
