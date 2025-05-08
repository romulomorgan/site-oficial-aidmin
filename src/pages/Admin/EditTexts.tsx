
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';

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
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved texts from localStorage if available
    const savedTexts = localStorage.getItem('siteTexts');
    if (savedTexts) {
      setSiteTexts(JSON.parse(savedTexts));
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
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-6">
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
            <h2 className="text-xl font-medium text-gray-800 mb-4">Seção Recursos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
          
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
          
          <div className="pt-6 flex justify-end">
            <CustomButton 
              type="submit" 
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? 'Salvando...' : 'Salvar Alterações'}
            </CustomButton>
          </div>
        </div>
      </form>
    </div>
  );
}
