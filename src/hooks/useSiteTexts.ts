
import { useState, useEffect } from 'react';
import { fetchSiteTexts, fetchColorTemplates } from '@/utils/supabaseClient';

interface SiteTextsState {
  robotImage: string;
  solucoesTitle: string;
  solucoesSubtitle: string;
  solucoesDescription: string;
  solucoesCount: string;
  
  // AI Robot section
  solucoesAITitle: string;
  solucoesAISubtitle: string;
  solucoesAIImage: string;
  solucoesAIDescription1: string;
  solucoesAIDescription2: string;
  solucoesAIDescription3: string;
  
  // Soluções individuais
  solucao1Title: string;
  solucao1Description: string;
  solucao1Image: string;
  solucao1Layout: string;
  solucao2Title: string;
  solucao2Description: string;
  solucao2Image: string;
  solucao2Layout: string;
  solucao3Title: string;
  solucao3Description: string;
  solucao3Image: string;
  solucao3Layout: string;
  solucao4Title: string;
  solucao4Description: string;
  solucao4Image: string;
  solucao4Layout: string;
  solucao5Title: string;
  solucao5Description: string;
  solucao5Image: string;
  solucao5Layout: string;
}

interface ThemeColors {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
}

interface UseSiteTextsReturn {
  siteTexts: SiteTextsState;
  themeColors: ThemeColors;
  isLoading: boolean;
}

const defaultSiteTexts: SiteTextsState = {
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
};

const defaultThemeColors: ThemeColors = {
  primaryColor: '#FF196E',
  secondaryColor: '#2D0A16',
  accentColor: '#FF4F8E',
  backgroundColor: '#FFFFFF',
  textColor: '#222222'
};

export const useSiteTexts = (): UseSiteTextsReturn => {
  const [siteTexts, setSiteTexts] = useState<SiteTextsState>(defaultSiteTexts);
  const [themeColors, setThemeColors] = useState<ThemeColors>(defaultThemeColors);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Função para rolar para o topo da página quando carregada
    window.scrollTo(0, 0);
    
    // Carregar textos do site do Supabase
    const loadSiteData = async () => {
      setIsLoading(true);
      try {
        // Carregar textos do site
        const texts = await fetchSiteTexts();
        if (texts) {
          const updatedTexts = {
            robotImage: typeof texts.robotImage === 'string' ? texts.robotImage : defaultSiteTexts.robotImage,
            solucoesTitle: typeof texts.solucoesTitle === 'string' ? texts.solucoesTitle : defaultSiteTexts.solucoesTitle,
            solucoesSubtitle: typeof texts.solucoesSubtitle === 'string' ? texts.solucoesSubtitle : defaultSiteTexts.solucoesSubtitle,
            solucoesDescription: typeof texts.solucoesDescription === 'string' ? texts.solucoesDescription : defaultSiteTexts.solucoesDescription,
            solucoesCount: typeof texts.solucoesCount === 'string' ? texts.solucoesCount : defaultSiteTexts.solucoesCount,
            
            // AI Robot section
            solucoesAITitle: typeof texts.solucoesAITitle === 'string' ? texts.solucoesAITitle : defaultSiteTexts.solucoesAITitle,
            solucoesAISubtitle: typeof texts.solucoesAISubtitle === 'string' ? texts.solucoesAISubtitle : defaultSiteTexts.solucoesAISubtitle,
            solucoesAIImage: typeof texts.solucoesAIImage === 'string' ? texts.solucoesAIImage : (typeof texts.robotImage === 'string' ? texts.robotImage : defaultSiteTexts.solucoesAIImage),
            solucoesAIDescription1: typeof texts.solucoesAIDescription1 === 'string' ? texts.solucoesAIDescription1 : defaultSiteTexts.solucoesAIDescription1,
            solucoesAIDescription2: typeof texts.solucoesAIDescription2 === 'string' ? texts.solucoesAIDescription2 : defaultSiteTexts.solucoesAIDescription2,
            solucoesAIDescription3: typeof texts.solucoesAIDescription3 === 'string' ? texts.solucoesAIDescription3 : defaultSiteTexts.solucoesAIDescription3,
            
            // Solução 1
            solucao1Title: typeof texts.solucao1Title === 'string' ? texts.solucao1Title : defaultSiteTexts.solucao1Title,
            solucao1Description: typeof texts.solucao1Description === 'string' ? texts.solucao1Description : defaultSiteTexts.solucao1Description,
            solucao1Image: typeof texts.solucao1Image === 'string' ? texts.solucao1Image : defaultSiteTexts.solucao1Image,
            solucao1Layout: typeof texts.solucao1Layout === 'string' ? texts.solucao1Layout : defaultSiteTexts.solucao1Layout,
            // Solução 2
            solucao2Title: typeof texts.solucao2Title === 'string' ? texts.solucao2Title : defaultSiteTexts.solucao2Title,
            solucao2Description: typeof texts.solucao2Description === 'string' ? texts.solucao2Description : defaultSiteTexts.solucao2Description,
            solucao2Image: typeof texts.solucao2Image === 'string' ? texts.solucao2Image : defaultSiteTexts.solucao2Image,
            solucao2Layout: typeof texts.solucao2Layout === 'string' ? texts.solucao2Layout : defaultSiteTexts.solucao2Layout,
            // Solução 3
            solucao3Title: typeof texts.solucao3Title === 'string' ? texts.solucao3Title : defaultSiteTexts.solucao3Title,
            solucao3Description: typeof texts.solucao3Description === 'string' ? texts.solucao3Description : defaultSiteTexts.solucao3Description,
            solucao3Image: typeof texts.solucao3Image === 'string' ? texts.solucao3Image : defaultSiteTexts.solucao3Image,
            solucao3Layout: typeof texts.solucao3Layout === 'string' ? texts.solucao3Layout : defaultSiteTexts.solucao3Layout,
            // Solução 4
            solucao4Title: typeof texts.solucao4Title === 'string' ? texts.solucao4Title : defaultSiteTexts.solucao4Title,
            solucao4Description: typeof texts.solucao4Description === 'string' ? texts.solucao4Description : defaultSiteTexts.solucao4Description,
            solucao4Image: typeof texts.solucao4Image === 'string' ? texts.solucao4Image : defaultSiteTexts.solucao4Image,
            solucao4Layout: typeof texts.solucao4Layout === 'string' ? texts.solucao4Layout : defaultSiteTexts.solucao4Layout,
            // Solução 5
            solucao5Title: typeof texts.solucao5Title === 'string' ? texts.solucao5Title : defaultSiteTexts.solucao5Title,
            solucao5Description: typeof texts.solucao5Description === 'string' ? texts.solucao5Description : defaultSiteTexts.solucao5Description,
            solucao5Image: typeof texts.solucao5Image === 'string' ? texts.solucao5Image : defaultSiteTexts.solucao5Image,
            solucao5Layout: typeof texts.solucao5Layout === 'string' ? texts.solucao5Layout : defaultSiteTexts.solucao5Layout,
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
            const newThemeColors = {
              primaryColor: template.primaryColor,
              secondaryColor: template.secondaryColor,
              accentColor: template.accentColor,
              backgroundColor: template.backgroundColor,
              textColor: template.textColor
            };
            
            setThemeColors(newThemeColors);
            
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
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSiteData();
  }, []);

  return { siteTexts, themeColors, isLoading };
};
