
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EditTexts() {
  const [siteTexts, setSiteTexts] = useState({
    heroTitle: 'Destrave a fronteira da produtividade.',
    heroSubtitle: 'Exploramos os limites da AI Generativa para criar novos produtos, avenidas de receitas e gerar eficiência operacional.',
    featuresTitle: 'O QUE FAZEMOS DE MELHOR',
    featuresSubtitle: 'Criamos e treinamos a sua AI',
    whyUsTitle: 'A QUEM ATENDEMOS',
    whyUsSubtitle: 'Em expansão para o segmento da construção civil e condomínios.',
    whyUsDescription1: 'Desenvolvendo soluções pioneiras de AI para o setor imobiliário, a AI Generativa estabeleceu-se para otimizar processos operacionais. Já foram implementados sistemas de gerenciamento para mais de 40 condomínios e projetos de construção, trazendo economia mensurável para as empresas.',
    whyUsDescription2: 'Em um mercado cada vez mais orientado por dados, nossos modelos detectam padrões em grandes volumes de informações para antecipar problemas e otimizar resultados, agregando eficiência e transparência em cada etapa.',
    testimonialTitle: 'Depoimentos',
    testimonialSubtitle: 'Veja o impacto eletrizante da nossa AI',
    whatsappTitle: 'INTEGRAÇÃO',
    whatsappSubtitle: 'WhatsApp Business',
    whatsappDescription: 'A IAdmin funciona perfeitamente com o WhatsApp Business, permitindo que você automatize comunicações, otimize o atendimento ao cliente e gerencie conversas com eficiência.',
    faqTitle: 'FAQ',
    faqSubtitle: 'Perguntas Frequentes',
    contactTitle: 'Deixe seu contato',
    contactSubtitle: 'Entraremos em contato brevemente!',
    footerAbout: 'A sua assistente de AI',
    footerButtonText: 'Contrate sua AI!',
    footerPhoneNumber: '(11) 93956-965',
    footerEmail: 'iadminassistant@gmail.com',
    feature1Description: 'Assistentes virtuais inteligentes que entendem o contexto e oferecem suporte em tempo real para suas equipes.',
    feature2Description: 'Automação de fluxos administrativos e financeiros para maior eficiência e redução de custos.',
    feature3Description: 'Transforme dados em insights acionáveis com nossa IA para visualização e análise avançada.',
    feature1Image: 'https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/549569d46b63c01644396b198dccdce85449473c?placeholderIfAbsent=true',
    feature2Image: 'https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/a62d5a9c11017d9ae646fee86e79073b8bf329e5?placeholderIfAbsent=true',
    feature3Image: 'https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/bf1676968402dd703834c8f0b0be70aafa252218?placeholderIfAbsent=true',
    whyUsImage: '/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png',
    companyLogoUrl: 'https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/5b8e380689abbb696f1a70d356bb34fb2c6e00d8?placeholderIfAbsent=true',
    contactImage: '/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png',
    whatsappImage: 'https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/dccad8c03ab957ead54ea74804281a32eea28ea8?placeholderIfAbsent=true',
    webhookUrl: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved texts from localStorage if available
    const savedTexts = localStorage.getItem('siteTexts');
    if (savedTexts) {
      setSiteTexts(prev => ({...prev, ...JSON.parse(savedTexts)}));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSiteTexts(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Save to localStorage
    localStorage.setItem('siteTexts', JSON.stringify(siteTexts));
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Textos atualizados com sucesso!');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Editar Textos do Site</h1>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm">
        <Tabs defaultValue="conteudo">
          <TabsList className="border-b w-full rounded-t-lg">
            <TabsTrigger value="conteudo">Conteúdo Geral</TabsTrigger>
            <TabsTrigger value="recursos">Recursos</TabsTrigger>
            <TabsTrigger value="sobre">Sobre Nós</TabsTrigger>
            <TabsTrigger value="imagens">Imagens</TabsTrigger>
            <TabsTrigger value="integracao">Integração</TabsTrigger>
          </TabsList>
          
          <TabsContent value="conteudo" className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Seção Hero</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título Principal
                  </label>
                  <input
                    type="text"
                    name="heroTitle"
                    value={siteTexts.heroTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    name="heroSubtitle"
                    value={siteTexts.heroSubtitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Seção FAQ</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    name="faqTitle"
                    value={siteTexts.faqTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    name="faqSubtitle"
                    value={siteTexts.faqSubtitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Seção Contato</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    name="contactTitle"
                    value={siteTexts.contactTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    name="contactSubtitle"
                    value={siteTexts.contactSubtitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Rodapé</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição da Empresa
                  </label>
                  <input
                    type="text"
                    name="footerAbout"
                    value={siteTexts.footerAbout}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Texto do Botão
                  </label>
                  <input
                    type="text"
                    name="footerButtonText"
                    value={siteTexts.footerButtonText}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="footerPhoneNumber"
                    value={siteTexts.footerPhoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    name="footerEmail"
                    value={siteTexts.footerEmail}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="recursos" className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Seção Recursos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    name="featuresTitle"
                    value={siteTexts.featuresTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    name="featuresSubtitle"
                    value={siteTexts.featuresSubtitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium mb-4">Recurso 1 - Assistente de IA</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    name="feature1Description"
                    value={siteTexts.feature1Description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL da Imagem
                  </label>
                  <input
                    type="text"
                    name="feature1Image"
                    value={siteTexts.feature1Image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium mb-4">Recurso 2 - Otimização de Processos</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    name="feature2Description"
                    value={siteTexts.feature2Description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL da Imagem
                  </label>
                  <input
                    type="text"
                    name="feature2Image"
                    value={siteTexts.feature2Image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="mt-6 border-t pt-6">
                <h3 className="font-medium mb-4">Recurso 3 - Análise de Dados</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    name="feature3Description"
                    value={siteTexts.feature3Description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    URL da Imagem
                  </label>
                  <input
                    type="text"
                    name="feature3Image"
                    value={siteTexts.feature3Image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sobre" className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Seção Por Que Nós</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    name="whyUsTitle"
                    value={siteTexts.whyUsTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    name="whyUsSubtitle"
                    value={siteTexts.whyUsSubtitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição 1
                  </label>
                  <textarea
                    name="whyUsDescription1"
                    value={siteTexts.whyUsDescription1}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição 2
                  </label>
                  <textarea
                    name="whyUsDescription2"
                    value={siteTexts.whyUsDescription2}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Seção Depoimentos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    name="testimonialTitle"
                    value={siteTexts.testimonialTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    name="testimonialSubtitle"
                    value={siteTexts.testimonialSubtitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="imagens" className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-medium text-gray-800 mb-4">Logo da Empresa</h2>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL da Logo
                </label>
                <input
                  type="text"
                  name="companyLogoUrl"
                  value={siteTexts.companyLogoUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {siteTexts.companyLogoUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Visualização:</p>
                    <img 
                      src={siteTexts.companyLogoUrl} 
                      alt="Logo preview"
                      className="w-16 h-16 object-contain border rounded-lg"
                    />
                  </div>
                )}
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-medium text-gray-800 mb-4">Imagem do Robô</h2>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  name="whyUsImage"
                  value={siteTexts.whyUsImage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {siteTexts.whyUsImage && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Visualização:</p>
                    <img 
                      src={siteTexts.whyUsImage} 
                      alt="Robot preview"
                      className="w-32 h-32 object-contain border rounded-lg"
                    />
                  </div>
                )}
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-medium text-gray-800 mb-4">Imagem de Contato</h2>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  name="contactImage"
                  value={siteTexts.contactImage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {siteTexts.contactImage && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Visualização:</p>
                    <img 
                      src={siteTexts.contactImage} 
                      alt="Contact image preview"
                      className="max-w-xs h-auto object-contain border rounded-lg"
                    />
                  </div>
                )}
              </div>
              
              <div className="border-t pt-6">
                <h2 className="text-xl font-medium text-gray-800 mb-4">Imagem do WhatsApp</h2>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL da Imagem
                </label>
                <input
                  type="text"
                  name="whatsappImage"
                  value={siteTexts.whatsappImage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                {siteTexts.whatsappImage && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Visualização:</p>
                    <img 
                      src={siteTexts.whatsappImage} 
                      alt="WhatsApp image preview"
                      className="max-w-xs h-auto object-contain border rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="integracao" className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Seção WhatsApp</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    name="whatsappTitle"
                    value={siteTexts.whatsappTitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subtítulo
                  </label>
                  <input
                    type="text"
                    name="whatsappSubtitle"
                    value={siteTexts.whatsappSubtitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea
                  name="whatsappDescription"
                  value={siteTexts.whatsappDescription}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h2 className="text-xl font-medium text-gray-800 mb-4">Webhook</h2>
              <p className="text-sm text-gray-500 mb-4">Configura um URL para envio de dados do formulário de contato</p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL do Webhook
                </label>
                <input
                  type="text"
                  name="webhookUrl"
                  value={siteTexts.webhookUrl}
                  onChange={handleInputChange}
                  placeholder="https://exemplo.com/api/webhook"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Os dados do formulário serão enviados via POST para este endpoint quando um usuário submeter o formulário de contato.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="p-6 flex justify-end border-t">
          <CustomButton 
            type="submit" 
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
