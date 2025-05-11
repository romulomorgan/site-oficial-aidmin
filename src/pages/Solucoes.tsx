
import React, { useState, useEffect } from 'react';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { CustomButton } from '@/components/ui/CustomButton';
import { fetchSiteTexts, fetchColorTemplates, saveEmailSubscription } from '@/utils/supabaseClient';
import { toast } from 'sonner';

export default function Solucoes() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [siteTexts, setSiteTexts] = useState({
    robotImage: '/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png',
    solucoesTitle: 'Nossas Soluções',
    solucoesSubtitle: '',
    solucoesDescription: 'Implantamos soluções tecnológicas que envolvem tecnologia da informação e inteligência de software para turbinar processos operacionais de nossos parceiros.',
    solucao1Title: '',
    solucao1Description: '',
    solucao1Image: '',
    solucao2Title: '',
    solucao2Description: '',
    solucao2Image: '',
    solucao3Title: '',
    solucao3Description: '',
    solucao3Image: '',
    solucoesCTATitle: 'Deixe seu contato',
    solucoesCTAButtonText: 'Enviar',
    solucoesCTAButtonLink: '/contato'
  });
  
  const [themeColors, setThemeColors] = useState({
    primaryColor: '#FF196E',
    secondaryColor: '#2D0A16',
    accentColor: '#FF4F8E',
    backgroundColor: '#FFFFFF',
    textColor: '#222222'
  });
  
  useEffect(() => {
    // Função para rolar para o topo da página quando carregada
    window.scrollTo(0, 0);
    
    // Carregar textos do site do Supabase
    const loadSiteData = async () => {
      try {
        // Carregar textos do site
        const texts = await fetchSiteTexts();
        if (texts) {
          const updatedTexts = {
            robotImage: typeof texts.robotImage === 'string' ? texts.robotImage : '/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png',
            solucoesTitle: typeof texts.solucoesTitle === 'string' ? texts.solucoesTitle : 'Nossas Soluções',
            solucoesSubtitle: typeof texts.solucoesSubtitle === 'string' ? texts.solucoesSubtitle : '',
            solucoesDescription: typeof texts.solucoesDescription === 'string' ? texts.solucoesDescription : 'Implantamos soluções tecnológicas que envolvem tecnologia da informação e inteligência de software para turbinar processos operacionais de nossos parceiros.',
            solucao1Title: typeof texts.solucao1Title === 'string' ? texts.solucao1Title : '',
            solucao1Description: typeof texts.solucao1Description === 'string' ? texts.solucao1Description : '',
            solucao1Image: typeof texts.solucao1Image === 'string' ? texts.solucao1Image : '',
            solucao2Title: typeof texts.solucao2Title === 'string' ? texts.solucao2Title : '',
            solucao2Description: typeof texts.solucao2Description === 'string' ? texts.solucao2Description : '',
            solucao2Image: typeof texts.solucao2Image === 'string' ? texts.solucao2Image : '',
            solucao3Title: typeof texts.solucao3Title === 'string' ? texts.solucao3Title : '',
            solucao3Description: typeof texts.solucao3Description === 'string' ? texts.solucao3Description : '',
            solucao3Image: typeof texts.solucao3Image === 'string' ? texts.solucao3Image : '',
            solucoesCTATitle: typeof texts.solucoesCTATitle === 'string' ? texts.solucoesCTATitle : 'Deixe seu contato',
            solucoesCTAButtonText: typeof texts.solucoesCTAButtonText === 'string' ? texts.solucoesCTAButtonText : 'Enviar',
            solucoesCTAButtonLink: typeof texts.solucoesCTAButtonLink === 'string' ? texts.solucoesCTAButtonLink : '/contato',
          };
          
          setSiteTexts(prev => ({ ...prev, ...updatedTexts }));
        }

        // Carregar templates de cores
        const templates = await fetchColorTemplates();
        
        // Carregar template selecionado do localStorage
        const selectedTemplate = localStorage.getItem('selectedTemplate');
        if (selectedTemplate && templates.length > 0) {
          const template = templates.find(t => t.id === selectedTemplate);
          
          if (template) {
            setThemeColors({
              primaryColor: template.primaryColor,
              secondaryColor: template.secondaryColor,
              accentColor: template.accentColor,
              backgroundColor: template.backgroundColor,
              textColor: template.textColor
            });
            
            // Aplicar cores às variáveis CSS
            document.documentElement.style.setProperty('--primary-color', template.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', template.secondaryColor);
            document.documentElement.style.setProperty('--accent-color', template.accentColor);
            document.documentElement.style.setProperty('--background-color', template.backgroundColor);
            document.documentElement.style.setProperty('--text-color', template.textColor);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados do site:', error);
      }
    };
    
    loadSiteData();
  }, []);
  
  const handleSubscribeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, insira seu e-mail.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Usar a função do supabaseClient para salvar a inscrição de email
      const success = await saveEmailSubscription(email, 'Página de Soluções');
      
      if (success) {
        toast.success('E-mail cadastrado com sucesso!');
        setEmail('');
      } else {
        throw new Error('Falha ao cadastrar email');
      }
    } catch (error) {
      console.error('Erro ao cadastrar e-mail:', error);
      toast.error('Ocorreu um erro ao cadastrar seu e-mail. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <main className="flex flex-col items-center bg-white">
      {/* Hero Section with Background Gradient */}
      <section className="relative w-full animate-fade-in" 
        style={{
          background: `linear-gradient(to bottom right, ${themeColors.secondaryColor}, ${themeColors.primaryColor})`,
          padding: '60px 20px'
        }}
      >
        {/* Navigation */}
        <NavigationBar />
        
        <div className="relative z-10 max-w-[1140px] mx-auto mt-16 text-white">
          <h1 className="text-white text-[56px] font-semibold leading-tight mb-6 max-md:text-[40px]">
            {siteTexts.solucoesTitle}
          </h1>
          <p className="text-white/90 max-w-[600px] text-lg leading-relaxed">
            {siteTexts.solucoesDescription}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-[1140px] px-5 py-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
        <div className="mb-16">
          <h2 className="text-lg font-medium uppercase mb-4" style={{color: themeColors.primaryColor}}>
            ADOTE A NOSSA AI
          </h2>
          <h3 className="text-[46px] font-semibold mb-8" style={{color: themeColors.textColor}}>
            Conectamos a nossa AI aos seus<br className="hidden md:block" />processos operacionais
          </h3>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-[400px] relative hover-scale">
              <div className="bg-pink-50 rounded-full aspect-square flex items-center justify-center">
                <img 
                  src={siteTexts.robotImage as string}
                  alt="AI Robot" 
                  className="w-2/3 object-contain"
                  onError={(e) => {
                    console.error("Erro ao carregar imagem do robô:", e);
                    e.currentTarget.src = '/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png';
                  }}
                />
              </div>
            </div>

            <div className="flex-1">
              <p className="leading-relaxed mb-4" style={{color: themeColors.textColor}}>
                Na IAdmin, conectamos nossa inteligência artificial diretamente aos seus processos
                operacionais, transformando a maneira como sua empresa executa tarefas e toma decisões.
              </p>
              
              <p className="leading-relaxed mb-4" style={{color: themeColors.textColor}}>
                Por meio do <strong>BPO-PN (Business Process Optimization - Processos de Negócios)</strong>, otimizamos
                fluxos administrativos, financeiros e contratuais, garantindo maior eficiência e redução de
                custos. Já com o <strong>BPO-P&D (Business Process Optimization - Projetos e Desenvolvimento)</strong>,
                nossa AI atua na gestão de projetos, aprimorando cronogramas, prevendo gargalos e gerando
                insights para um planejamento mais assertivo.
              </p>
              
              <p className="leading-relaxed mb-4" style={{color: themeColors.textColor}}>
                Essa integração possibilita uma automação inteligente que vai além da execução de tarefas, criando um ambiente onde dados são
                utilizados de forma estratégica para potencializar resultados e ampliar sua competitividade no
                mercado. Seja na construção civil, condomínios ou outros segmentos, nossa tecnologia
                trabalha em sintonia com seus processos, garantindo maior produtividade e inovação.
              </p>
            </div>
          </div>
        </div>
        
        {/* Soluções específicas - condicional baseado nos dados do banco */}
        {siteTexts.solucao1Title && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6" style={{color: themeColors.textColor}}>
              {siteTexts.solucao1Title}
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {siteTexts.solucao1Image && (
                <div className="w-full md:w-1/3">
                  <img 
                    src={siteTexts.solucao1Image} 
                    alt={siteTexts.solucao1Title}
                    className="w-full rounded-lg object-cover"
                    onError={(e) => {
                      console.error("Erro ao carregar imagem da solução 1:", e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className={`${siteTexts.solucao1Image ? 'md:w-2/3' : 'w-full'}`}>
                <p className="leading-relaxed" style={{color: themeColors.textColor}}>
                  {siteTexts.solucao1Description}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {siteTexts.solucao2Title && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6" style={{color: themeColors.textColor}}>
              {siteTexts.solucao2Title}
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {siteTexts.solucao2Image && (
                <div className="w-full md:w-1/3">
                  <img 
                    src={siteTexts.solucao2Image} 
                    alt={siteTexts.solucao2Title}
                    className="w-full rounded-lg object-cover"
                    onError={(e) => {
                      console.error("Erro ao carregar imagem da solução 2:", e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className={`${siteTexts.solucao2Image ? 'md:w-2/3' : 'w-full'}`}>
                <p className="leading-relaxed" style={{color: themeColors.textColor}}>
                  {siteTexts.solucao2Description}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {siteTexts.solucao3Title && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6" style={{color: themeColors.textColor}}>
              {siteTexts.solucao3Title}
            </h2>
            
            <div className="flex flex-col md:flex-row gap-8">
              {siteTexts.solucao3Image && (
                <div className="w-full md:w-1/3">
                  <img 
                    src={siteTexts.solucao3Image} 
                    alt={siteTexts.solucao3Title}
                    className="w-full rounded-lg object-cover"
                    onError={(e) => {
                      console.error("Erro ao carregar imagem da solução 3:", e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className={`${siteTexts.solucao3Image ? 'md:w-2/3' : 'w-full'}`}>
                <p className="leading-relaxed" style={{color: themeColors.textColor}}>
                  {siteTexts.solucao3Description}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="w-full py-[60px] text-center animate-fade-in" style={{
          background: `linear-gradient(to bottom right, ${themeColors.secondaryColor}, ${themeColors.primaryColor})`,
          animationDelay: '0.3s'
        }}>
        <div className="max-w-[1140px] mx-auto px-5">
          <h2 className="text-white text-[40px] font-semibold mb-2">
            {siteTexts.solucoesCTATitle || 'Deixe seu contato'}
          </h2>
          <p className="text-white/80 mb-8">
            Entraremos em contato brevemente!
          </p>
          <div className="flex justify-center">
            <form onSubmit={handleSubscribeEmail} className="w-full max-w-[444px]">
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-5 rounded-lg bg-transparent border border-white text-white mb-4 placeholder:text-white/70"
              />
              <CustomButton 
                type="submit" 
                variant="primary" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : siteTexts.solucoesCTAButtonText || "Enviar"}
              </CustomButton>
            </form>
          </div>
        </div>
      </section>
      
      {/* Removida a importação e renderização do Footer aqui */}
    </main>
  );
}
