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
    solucoesCount: '3',
    
    // AI Robot section
    solucoesAITitle: 'Conectamos a nossa AI aos seus processos operacionais',
    solucoesAISubtitle: 'ADOTE A NOSSA AI',
    solucoesAIImage: '/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png',
    solucoesAIDescription1: 'Na IAdmin, conectamos nossa inteligência artificial diretamente aos seus processos operacionais, transformando a maneira como sua empresa executa tarefas e toma decisões.',
    solucoesAIDescription2: 'Por meio do BPO-PN (Business Process Optimization - Processos de Negócios), otimizamos fluxos administrativos, financeiros e contratuais, garantindo maior eficiência e redução de custos. Já com o BPO-P&D (Business Process Optimization - Projetos e Desenvolvimento), nossa AI atua na gestão de projetos, aprimorando cronogramas, prevendo gargalos e gerando insights para um planejamento mais assertivo.',
    solucoesAIDescription3: 'Essa integração possibilita uma automação inteligente que vai além da execução de tarefas, criando um ambiente onde dados são utilizados de forma estratégica para potencializar resultados e ampliar sua competitividade no mercado. Seja na construção civil, condomínios ou outros segmentos, nossa tecnologia trabalha em sintonia com seus processos, garantindo maior produtividade e inovação.',
    
    // Soluções individuais
    solucao1Title: '',
    solucao1Description: '',
    solucao1Image: '',
    solucao1Layout: 'image-left',
    solucao2Title: '',
    solucao2Description: '',
    solucao2Image: '',
    solucao2Layout: 'image-left',
    solucao3Title: '',
    solucao3Description: '',
    solucao3Image: '',
    solucao3Layout: 'image-left',
    solucao4Title: '',
    solucao4Description: '',
    solucao4Image: '',
    solucao4Layout: 'image-left',
    solucao5Title: '',
    solucao5Description: '',
    solucao5Image: '',
    solucao5Layout: 'image-left',
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
            solucoesCount: typeof texts.solucoesCount === 'string' ? texts.solucoesCount : '3',
            
            // AI Robot section
            solucoesAITitle: typeof texts.solucoesAITitle === 'string' ? texts.solucoesAITitle : 'Conectamos a nossa AI aos seus processos operacionais',
            solucoesAISubtitle: typeof texts.solucoesAISubtitle === 'string' ? texts.solucoesAISubtitle : 'ADOTE A NOSSA AI',
            solucoesAIImage: typeof texts.solucoesAIImage === 'string' ? texts.solucoesAIImage : (typeof texts.robotImage === 'string' ? texts.robotImage : '/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png'),
            solucoesAIDescription1: typeof texts.solucoesAIDescription1 === 'string' ? texts.solucoesAIDescription1 : 'Na IAdmin, conectamos nossa inteligência artificial diretamente aos seus processos operacionais, transformando a maneira como sua empresa executa tarefas e toma decisões.',
            solucoesAIDescription2: typeof texts.solucoesAIDescription2 === 'string' ? texts.solucoesAIDescription2 : 'Por meio do BPO-PN (Business Process Optimization - Processos de Negócios), otimizamos fluxos administrativos, financeiros e contratuais, garantindo maior eficiência e redução de custos. Já com o BPO-P&D (Business Process Optimization - Projetos e Desenvolvimento), nossa AI atua na gestão de projetos, aprimorando cronogramas, prevendo gargalos e gerando insights para um planejamento mais assertivo.',
            solucoesAIDescription3: typeof texts.solucoesAIDescription3 === 'string' ? texts.solucoesAIDescription3 : 'Essa integração possibilita uma automação inteligente que vai além da execução de tarefas, criando um ambiente onde dados são utilizados de forma estratégica para potencializar resultados e ampliar sua competitividade no mercado. Seja na construção civil, condomínios ou outros segmentos, nossa tecnologia trabalha em sintonia com seus processos, garantindo maior produtividade e inovação.',
            
            // Solução 1
            solucao1Title: typeof texts.solucao1Title === 'string' ? texts.solucao1Title : '',
            solucao1Description: typeof texts.solucao1Description === 'string' ? texts.solucao1Description : '',
            solucao1Image: typeof texts.solucao1Image === 'string' ? texts.solucao1Image : '',
            solucao1Layout: typeof texts.solucao1Layout === 'string' ? texts.solucao1Layout : 'image-left',
            // Solução 2
            solucao2Title: typeof texts.solucao2Title === 'string' ? texts.solucao2Title : '',
            solucao2Description: typeof texts.solucao2Description === 'string' ? texts.solucao2Description : '',
            solucao2Image: typeof texts.solucao2Image === 'string' ? texts.solucao2Image : '',
            solucao2Layout: typeof texts.solucao2Layout === 'string' ? texts.solucao2Layout : 'image-left',
            // Solução 3
            solucao3Title: typeof texts.solucao3Title === 'string' ? texts.solucao3Title : '',
            solucao3Description: typeof texts.solucao3Description === 'string' ? texts.solucao3Description : '',
            solucao3Image: typeof texts.solucao3Image === 'string' ? texts.solucao3Image : '',
            solucao3Layout: typeof texts.solucao3Layout === 'string' ? texts.solucao3Layout : 'image-left',
            // Solução 4
            solucao4Title: typeof texts.solucao4Title === 'string' ? texts.solucao4Title : '',
            solucao4Description: typeof texts.solucao4Description === 'string' ? texts.solucao4Description : '',
            solucao4Image: typeof texts.solucao4Image === 'string' ? texts.solucao4Image : '',
            solucao4Layout: typeof texts.solucao4Layout === 'string' ? texts.solucao4Layout : 'image-left',
            // Solução 5
            solucao5Title: typeof texts.solucao5Title === 'string' ? texts.solucao5Title : '',
            solucao5Description: typeof texts.solucao5Description === 'string' ? texts.solucao5Description : '',
            solucao5Image: typeof texts.solucao5Image === 'string' ? texts.solucao5Image : '',
            solucao5Layout: typeof texts.solucao5Layout === 'string' ? texts.solucao5Layout : 'image-left',
          };
          
          setSiteTexts(updatedTexts);
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
  
  // Função para inscrição de emails
  function handleSubscribeEmail(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, insira seu e-mail.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Usar a função do supabaseClient para salvar a inscrição de email
      saveEmailSubscription(email, 'Página de Soluções')
        .then(success => {
          if (success) {
            toast.success('E-mail cadastrado com sucesso!');
            setEmail('');
          } else {
            throw new Error('Falha ao cadastrar email');
          }
        })
        .catch(error => {
          console.error('Erro ao cadastrar e-mail:', error);
          toast.error('Ocorreu um erro ao cadastrar seu e-mail. Tente novamente.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } catch (error) {
      console.error('Erro ao cadastrar e-mail:', error);
      toast.error('Ocorreu um erro ao cadastrar seu e-mail. Tente novamente.');
      setIsSubmitting(false);
    }
  }
  
  // Renderizar uma solução com base no layout
  function renderSolucao(index: number) {
    const titulo = siteTexts[`solucao${index}Title`];
    const descricao = siteTexts[`solucao${index}Description`];
    const imagem = siteTexts[`solucao${index}Image`];
    const layout = siteTexts[`solucao${index}Layout`];
    
    if (!titulo) return null;
    
    const isImageLeft = layout === 'image-left';
    
    return (
      <div className="mb-16" key={`solucao-${index}`}>
        <h2 className="text-2xl font-semibold mb-6" style={{color: themeColors.textColor}}>
          {titulo}
        </h2>
        
        <div className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
          {imagem && (
            <div className="w-full md:w-1/3">
              <img 
                src={imagem} 
                alt={titulo as string}
                className="w-full rounded-lg object-cover"
                onError={(e) => {
                  console.error(`Erro ao carregar imagem da solução ${index}:`, e);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          )}
          
          <div className={`${imagem ? 'md:w-2/3' : 'w-full'}`}>
            <p className="leading-relaxed" style={{color: themeColors.textColor}}>
              {descricao}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
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
            {siteTexts.solucoesAISubtitle}
          </h2>
          <h3 className="text-[46px] font-semibold mb-8" style={{color: themeColors.textColor}}>
            {siteTexts.solucoesAITitle}
          </h3>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-[400px] relative hover-scale">
              <div className="bg-pink-50 rounded-full aspect-square flex items-center justify-center">
                <img 
                  src={siteTexts.solucoesAIImage}
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
                {siteTexts.solucoesAIDescription1}
              </p>
              
              <p className="leading-relaxed mb-4" style={{color: themeColors.textColor}}>
                {siteTexts.solucoesAIDescription2}
              </p>
              
              <p className="leading-relaxed mb-4" style={{color: themeColors.textColor}}>
                {siteTexts.solucoesAIDescription3}
              </p>
            </div>
          </div>
        </div>
        
        {/* Soluções específicas - baseado na quantidade e dados do banco */}
        {Array.from({ length: parseInt(siteTexts.solucoesCount) || 0 }).map((_, idx) => 
          renderSolucao(idx + 1)
        )}
      </section>

      {/* Contact Section */}
      <section className="w-full py-[60px] text-center animate-fade-in" style={{
          background: `linear-gradient(to bottom right, ${themeColors.secondaryColor}, ${themeColors.primaryColor})`,
          animationDelay: '0.3s'
        }}>
        <div className="max-w-[1140px] mx-auto px-5">
          <h2 className="text-white text-[40px] font-semibold mb-2">
            Deixe seu contato
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
                {isSubmitting ? "Enviando..." : "Enviar"}
              </CustomButton>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
