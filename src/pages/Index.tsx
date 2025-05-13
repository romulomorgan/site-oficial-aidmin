import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CustomButton } from '@/components/ui/CustomButton';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { fetchSiteTexts, fetchTestimonials, fetchFAQs, Testimonial, FAQItem, saveEmailSubscription } from '@/utils/supabaseClient';
import { toast } from 'sonner';
import YouTube from 'react-youtube';
import { supabase } from '@/integrations/supabase/client';
import { sendEmailSubscriptionWebhook } from '@/utils/webhooks';

export default function Index() {
  // Estado para armazenar textos do site
  const [siteTexts, setSiteTexts] = useState<Record<string, string | boolean | undefined>>({});
  // Estado para armazenar depoimentos
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  // Estado para armazenar FAQs
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  // Estado para armazenar email para inscrição
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        // Carregar textos do site
        const texts = await fetchSiteTexts();
        setSiteTexts(texts as Record<string, string | boolean | undefined> || {});
        
        // Extrair o ID do vídeo do YouTube se disponível
        if (texts.heroVideoUrl) {
          const videoUrl = texts.heroVideoUrl.toString();
          const videoIdMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
          if (videoIdMatch && videoIdMatch[1]) {
            setVideoId(videoIdMatch[1]);
          }
        }
        
        // Carregar depoimentos
        const testimonialData = await fetchTestimonials();
        setTestimonials(testimonialData || []);
        
        // Carregar FAQs
        const faqData = await fetchFAQs();
        setFaqs(faqData || []);
        
        // Atualizar o título da página e metadados para IAdmin
        document.title = 'IAdmin';
        
        // Atualizar metadados OG
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', 'IAdmin');
        
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', 'IAdmin - Plataforma de Inteligência Artificial para Empresas');
      } catch (error) {
        console.error('Erro ao carregar dados da página:', error);
      }
    };
    
    loadData();

    // Aplicar a cor primária ao :root
    document.documentElement.style.setProperty('--primary-color', '#FF196E');
    document.documentElement.style.setProperty('--secondary-color', '#2D0A16');
  }, []);

  const handleSubscribeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, insira seu e-mail.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await saveEmailSubscription(email, 'Página Inicial');
      
      if (success) {
        // Buscar URL do webhook para enviar a nova inscrição
        const { data } = await supabase
          .from('site_texts')
          .select('content')
          .eq('key', 'webhookUrl')
          .single();
        
        const webhookUrl = data?.content?.toString();
        
        if (webhookUrl) {
          // Usar a função de webhookSender para enviar a inscrição
          await sendEmailSubscriptionWebhook(
            webhookUrl,
            email,
            'Página Inicial'
          );
          console.log('Enviando email para webhook:', email, webhookUrl);
        }
        
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

  const youtubeOpts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section com Gradiente e Vídeo */}
      <section
        className="relative w-full pt-28 pb-20"
        style={{
          background: "linear-gradient(to bottom right, #2D0A16, #FF196E)",
        }}
      >
        {/* Navegação */}
        <NavigationBar />
        
        {/* Conteúdo Hero */}
        <div className="relative z-10 max-w-[1140px] mx-auto flex flex-col md:flex-row items-center gap-10 px-4">
          <div className="flex-1 text-white hero-content">
            <h1 className="text-white text-[56px] font-semibold leading-tight mb-2 max-md:text-[40px] slide-left animate-on-scroll">
              {siteTexts.heroTitle?.toString() || 'Destrave a fronteira da produtividade.'}
            </h1>
            <p className="text-white/90 text-lg leading-relaxed mb-8 slide-left animate-on-scroll" style={{animationDelay: '0.2s'}}>
              {siteTexts.heroSubtitle?.toString() || 'Exploramos os limites da <strong>AI Generativa</strong> para criar novos produtos, avenidas de receitas e gerar eficiência operacional.'}
            </p>
            <div className="flex flex-wrap gap-4 slide-left animate-on-scroll" style={{animationDelay: '0.4s'}}>
              <Link to={siteTexts.heroButtonLink?.toString() || '/solucoes'}>
                <CustomButton variant="primary" className="button-animate pulse-btn">
                  {siteTexts.heroButtonText?.toString() || 'Fale Conosco'}
                </CustomButton>
              </Link>
              <a href="#" className="inline-flex items-center text-white hover:text-white/80 transition-colors nav-link-animated">
                <span className="mr-2">{siteTexts.footerButtonText?.toString() || 'Contrate uma AI Poderosa!'}</span>
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                  <Play size={12} className="text-white ml-0.5" />
                </div>
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center slide-right animate-on-scroll">
            <div className="relative w-full max-w-[450px] aspect-video rounded-lg overflow-hidden shadow-lg hover-scale">
              {videoId ? (
                <YouTube videoId={videoId} opts={youtubeOpts} className="w-full h-full" />
              ) : (
                <>
                  <img
                    src="/lovable-uploads/7c1a0429-de82-405f-b7d2-1f9d08e9558e.png"
                    alt="AI Demonstração"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all pulse-btn">
                      <Play size={24} className="text-white ml-0.5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Seção "O que fazemos de melhor" */}
      <section className="w-full py-16 px-5">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-12 animate-on-scroll fade-on-scroll">
            <p className="text-[#FF196E] mb-2 font-medium">{siteTexts.whatWeDoSubtitle?.toString() || 'O QUE FAZEMOS DE MELHOR'}</p>
            <h2 className="text-[36px] font-semibold text-[#222]">
              {siteTexts.whatWeDoTitle?.toString() || 'Criamos e treinamos a sua AI'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#f8f9fa] rounded-lg overflow-hidden card-hover-effect animate-on-scroll slide-up cascade-item">
              <div className="h-48 overflow-hidden">
                <img
                  src={siteTexts.assistantCardImage?.toString() || '/lovable-uploads/c739c386-c6c9-4bb8-9996-98b3a3161fad.png'}
                  alt="Assistente IA"
                  className="w-full h-full object-cover hover-scale"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-[#222]">{siteTexts.assistantCardTitle?.toString() || 'ASSISTENTE DE IA'}</h3>
                {siteTexts.assistantCardDescription && (
                  <p className="text-[#222]/80">{siteTexts.assistantCardDescription.toString()}</p>
                )}
              </div>
            </div>
            
            <div className="bg-[#f8f9fa] rounded-lg overflow-hidden card-hover-effect animate-on-scroll slide-up cascade-item">
              <div className="h-48 overflow-hidden">
                <img
                  src={siteTexts.bpoProcessosCardImage?.toString() || '/lovable-uploads/232e98e1-6691-4748-89c8-dd6300343696.png'}
                  alt="BPO com IA"
                  className="w-full h-full object-cover hover-scale"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-[#222]">{siteTexts.bpoProcessosCardTitle?.toString() || 'BPO COM PROCESSOS DE NEGÓCIOS'}</h3>
                {siteTexts.bpoProcessosCardDescription && (
                  <p className="text-[#222]/80">{siteTexts.bpoProcessosCardDescription.toString()}</p>
                )}
              </div>
            </div>
            
            <div className="bg-[#f8f9fa] rounded-lg overflow-hidden card-hover-effect animate-on-scroll slide-up cascade-item">
              <div className="h-48 overflow-hidden">
                <img
                  src={siteTexts.bpoProjetosCardImage?.toString() || '/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png'}
                  alt="Sistema de Projetos"
                  className="w-full h-full object-cover hover-scale"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2 text-[#222]">{siteTexts.bpoProjetosCardTitle?.toString() || 'BPO COM PROJETOS E DESENVOLVIMENTO'}</h3>
                {siteTexts.bpoProjetosCardDescription && (
                  <p className="text-[#222]/80">{siteTexts.bpoProjetosCardDescription.toString()}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção "Em expansão" */}
      <section className="w-full py-16 px-5 bg-[#f8f9fa]">
        <div className="max-w-[1140px] mx-auto">
          <div className="mb-6 animate-on-scroll fade-on-scroll">
            <p className="text-[#FF196E] mb-2 font-medium">{siteTexts.expansionSubtitle?.toString() || 'A QUEM ATENDEMOS'}</p>
            <h2 className="text-[36px] font-semibold text-[#222] max-w-[500px]">
              {siteTexts.expansionTitle?.toString() || 'Em expansão para o segmento da construção civil e condomínios.'}
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 relative h-[300px] animate-on-scroll scale-on-scroll">
              <img
                src={siteTexts.expansionImage?.toString() || '/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png'}
                alt="Robô IA"
                className="w-full h-full object-contain hover-float"
              />
            </div>
            
            <div className="flex-1 animate-on-scroll slide-right-on-scroll">
              <p className="text-[#222]/80 mb-6">
                {siteTexts.expansionDescription?.toString() || 'Integração de IA com sistemas existentes de construtoras. A <strong>AI Generativa</strong> transforma seus processos corporativos e operacionais. Na Virtia, trabalhamos com processos de compras e gerenciamento de contratos, análise de dados para melhor tomada de decisões, automação de relatórios e integração com sistemas de gestão de condomínio.'}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="text-center animate-on-scroll fade-on-scroll cascade-item">
                  <h3 className="text-[#FF196E] text-3xl font-bold highlight-pulse">{siteTexts.statsYears?.toString() || '3+'}</h3>
                  <p className="text-[#222]/70 text-sm">Anos de experiência</p>
                </div>
                <div className="text-center animate-on-scroll fade-on-scroll cascade-item">
                  <h3 className="text-[#FF196E] text-3xl font-bold highlight-pulse">{siteTexts.statsProjects?.toString() || '600+'}</h3>
                  <p className="text-[#222]/70 text-sm">Projetos executados</p>
                </div>
                <div className="text-center animate-on-scroll fade-on-scroll cascade-item">
                  <h3 className="text-[#FF196E] text-3xl font-bold highlight-pulse">{siteTexts.statsCompanies?.toString() || '40+'}</h3>
                  <p className="text-[#222]/70 text-sm">Empresas atendidas</p>
                </div>
                <div className="text-center animate-on-scroll fade-on-scroll cascade-item">
                  <h3 className="text-[#FF196E] text-3xl font-bold highlight-pulse">{siteTexts.statsAutomations?.toString() || '47k+'}</h3>
                  <p className="text-[#222]/70 text-sm">Automatizações por mês</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção Depoimentos */}
      <section className="w-full py-20 px-5" style={{
        background: "linear-gradient(to bottom right, #2D0A16, #FF196E)",
      }}>
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-16 animate-on-scroll fade-on-scroll">
            <h2 className="text-[36px] font-semibold mb-4 text-white">
              {siteTexts.testimonialsTitle?.toString() || 'Veja o impacto eletrizante da nossa AI'}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="animate-on-scroll slide-up testimonial-card">
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role}
                  testimonial={testimonial.testimonial}
                  avatarUrl={testimonial.avatarUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Seção WhatsApp Integration */}
      <section className="w-full py-16 px-5">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-6 animate-on-scroll fade-on-scroll">
            <p className="text-[#FF196E] font-medium">{siteTexts.whatsappSubtitle?.toString() || 'INTEGRAÇÃO'}</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 animate-on-scroll slide-left-on-scroll">
              <h2 className="text-[36px] font-semibold mb-4 text-[#222] flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span className="ml-2">{siteTexts.whatsappTitle?.toString() || 'WhatsApp Business'}</span>
              </h2>
              <p className="text-[#222]/80 mb-6">
                {siteTexts.whatsappDescription?.toString() || 'A Virtia faz a ponte perfeita entre sua IA e o WhatsApp. A integração permite que sua assistente de IA converse diretamente com seus clientes, proporcionando atendimento personalizado e respostas instantâneas. Ganhe eficiência e escala sem perder o toque humano na comunicação.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <CustomButton variant="primary" className="button-animate pulse-btn">
                  {siteTexts.whatsappButtonText?.toString() || 'Contrate a Virtia'}
                </CustomButton>
                <a href="#" className="inline-flex items-center text-gray-800 hover:text-[#FF196E] transition-colors nav-link-animated">
                  <span className="mr-2">Contrate uma AI Poderosa!</span>
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
                    <Play size={12} className="text-gray-700 ml-0.5" />
                  </div>
                </a>
              </div>
            </div>
            
            <div className="flex-1 animate-on-scroll slide-right-on-scroll">
              <img
                src={siteTexts.whatsappImage?.toString() || '/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png'}
                alt="WhatsApp Integration"
                className="max-w-full rounded-lg shadow-lg hover-scale"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção FAQ */}
      <section className="w-full py-16 px-5 bg-[#f8f9fa]">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-12 animate-on-scroll fade-on-scroll">
            <p className="text-[#FF196E] font-medium">FAQ</p>
            <h2 className="text-[36px] font-semibold text-[#222]">
              {siteTexts.faqTitle?.toString() || 'Perguntas Frequentes'}
            </h2>
          </div>
          
          <div className="animate-on-scroll scale-on-scroll">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>
      
      {/* Seção Contato */}
      <section className="w-full py-16 px-5" style={{
        background: "linear-gradient(to bottom right, #2D0A16, #FF196E)",
      }}>
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-8 animate-on-scroll fade-on-scroll">
            <h2 className="text-[36px] font-semibold text-white">
              {siteTexts.contactTitle?.toString() || 'Deixe seu contato'}
            </h2>
            <p className="text-white/80">
              {siteTexts.contactSubtitle?.toString() || 'Fale com um especialista da nossa equipe'}
            </p>
          </div>
          
          <div className="flex justify-center animate-on-scroll scale-on-scroll">
            <form onSubmit={handleSubscribeEmail} className="w-full max-w-[444px]">
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 px-5 rounded-lg bg-transparent border border-white text-white mb-4 placeholder:text-white/70 hover:border-white/80 focus:border-white transition-colors"
              />
              <button
                type="submit"
                className="w-full h-12 bg-white text-[#FF196E] font-medium rounded-lg hover:bg-white/90 transition-colors button-animate"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Enviando..." : (siteTexts.contactButtonText?.toString() || "Enviar")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
