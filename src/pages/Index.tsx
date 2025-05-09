
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ContactForm } from '@/components/ui/ContactForm';
import { CustomButton } from '@/components/ui/CustomButton';
import { ArrowRight } from 'lucide-react';
import { fetchSiteTexts, fetchTestimonials, fetchFAQs, Testimonial, FAQItem } from '@/utils/supabaseClient';

export default function Index() {
  // Estado para armazenar textos do site
  const [siteTexts, setSiteTexts] = useState<Record<string, string | boolean | undefined>>({});
  // Estado para armazenar depoimentos
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  // Estado para armazenar FAQs
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        // Carregar textos do site
        const texts = await fetchSiteTexts();
        setSiteTexts(texts);
        
        // Carregar depoimentos
        const testimonialData = await fetchTestimonials();
        setTestimonials(testimonialData);
        
        // Carregar FAQs
        const faqData = await fetchFAQs();
        setFaqs(faqData);
      } catch (error) {
        console.error('Erro ao carregar dados da página:', error);
      }
    };
    
    loadData();
  }, []);

  return (
    <main className="flex flex-col items-center">
      {/* Hero Section with Background Gradient */}
      <section
        className="relative w-full"
        style={{
          background: "linear-gradient(to bottom right, #2D0A16, #FF196E)",
          padding: "60px 20px",
        }}
      >
        {/* Navigation */}
        <NavigationBar />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-[1140px] mx-auto flex flex-col md:flex-row items-center gap-10 mt-16">
          <div className="flex-1 text-white">
            <h1 className="text-white text-[56px] font-semibold leading-tight mb-6 max-md:text-[40px]">
              {siteTexts.heroTitle || "A Inteligência Artificial para seu Negócio"}
            </h1>
            <p className="text-white/90 text-lg leading-relaxed mb-8">
              {siteTexts.heroSubtitle || "Transforme a maneira como sua empresa opera com nossa IA especializada em automatizar processos e potencializar resultados."}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/solucoes">
                <CustomButton variant="primary">
                  Conheça Nossas Soluções
                </CustomButton>
              </Link>
              <Link to="/contato">
                <CustomButton variant="secondary">
                  Fale Conosco
                </CustomButton>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png"
              alt="IA IAdmin"
              className="max-w-full w-[400px] h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="w-full py-20 px-5">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-semibold mb-4 text-[#222]">
              {siteTexts.featuresTitle || "O que fazemos"}
            </h2>
            <p className="text-lg max-w-[800px] mx-auto text-[#222]/80">
              {siteTexts.featuresSubtitle || "Oferecemos soluções inteligentes que se adaptam às suas necessidades, transformando processos complexos em tarefas simples e eficientes."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#FFF] rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-5 w-14 h-14 bg-[#FF196E]/10 flex items-center justify-center rounded-full">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.0001 24.2667C19.0645 24.2667 24.0001 19.3311 24.0001 13.2667C24.0001 7.20227 19.0645 2.26666 13.0001 2.26666C6.93563 2.26666 2.00002 7.20227 2.00002 13.2667C2.00002 19.3311 6.93563 24.2667 13.0001 24.2667Z" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16.7333 17L13.3333 13.6V7.66666" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#222]">Automação de Processos</h3>
              <p className="text-[#222]/70">Automatize tarefas repetitivas e libere sua equipe para focar no que realmente importa.</p>
            </div>
            
            <div className="p-8 bg-[#FFF] rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-5 w-14 h-14 bg-[#FF196E]/10 flex items-center justify-center rounded-full">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.0001 17.6667C15.5774 17.6667 17.6667 15.5773 17.6667 13C17.6667 10.4227 15.5774 8.33334 13.0001 8.33334C10.4227 8.33334 8.33337 10.4227 8.33337 13C8.33337 15.5773 10.4227 17.6667 13.0001 17.6667Z" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 1.83334V4.33334" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13 21.6667V24.1667" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.85339 4.85333L6.62006 6.62" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.3799 19.38L21.1466 21.1467" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1.8334 13H4.3334" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.6667 13H24.1667" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.85339 21.1467L6.62006 19.38" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.3799 6.62L21.1466 4.85333" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#222]">Insights Inteligentes</h3>
              <p className="text-[#222]/70">Obtenha análises avançadas e insights valiosos para tomar decisões informadas e estratégicas.</p>
            </div>
            
            <div className="p-8 bg-[#FFF] rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-5 w-14 h-14 bg-[#FF196E]/10 flex items-center justify-center rounded-full">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.1667 3.83334H3.83333C2.73076 3.83334 1.83333 4.73077 1.83333 5.83334V20.1667C1.83333 21.2692 2.73076 22.1667 3.83333 22.1667H22.1667C23.2692 22.1667 24.1667 21.2692 24.1667 20.1667V5.83334C24.1667 4.73077 23.2692 3.83334 22.1667 3.83334Z" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1.83333 9.83334H24.1667" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.33333 22.1667V9.83334" stroke="#FF196E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#222]">Integração Completa</h3>
              <p className="text-[#222]/70">Nossas soluções se integram perfeitamente com suas ferramentas atuais, criando um ecossistema unificado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="w-full py-20 px-5 bg-[#FFFAF9]">
        <div className="max-w-[1140px] mx-auto flex flex-col-reverse md:flex-row gap-10 items-center">
          <div className="flex-1">
            <div className="mb-4 inline-block text-sm font-medium py-1 px-3 bg-[#FF196E]/10 text-[#FF196E] rounded-full">
              DIFERENCIAL
            </div>
            <h2 className="text-[42px] font-semibold mb-6 text-[#222]">
              {siteTexts.whyUsTitle || "Por que escolher a IAdmin?"}
            </h2>
            <p className="text-lg mb-8 text-[#222]/80">
              {siteTexts.whyUsSubtitle || "Nossa IA é especialmente desenvolvida para compreender o seu negócio e realizar tarefas específicas com precisão e eficiência."}
            </p>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-[#FF196E] rounded-full flex items-center justify-center text-white shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-[#222]">Especialização em múltiplos setores</h3>
                  <p className="text-[#222]/70">Nossa tecnologia é adaptável e funciona em diversos segmentos, como construção civil, gestão de condomínios e outros.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-[#FF196E] rounded-full flex items-center justify-center text-white shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-[#222]">Suporte técnico especializado</h3>
                  <p className="text-[#222]/70">Contamos com uma equipe pronta para ajudar na implementação e tirar suas dúvidas sempre que necessário.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-6 h-6 bg-[#FF196E] rounded-full flex items-center justify-center text-white shrink-0 mt-1">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1 text-[#222]">Resultados comprovados</h3>
                  <p className="text-[#222]/70">Nossos clientes relatam economia de tempo e recursos, além de melhoria significativa na eficiência operacional.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <Link to="/solucoes">
                <CustomButton variant="primary">
                  Ver todas as soluções <ArrowRight className="w-5 h-5 ml-2" />
                </CustomButton>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center">
            <img
              src={siteTexts.whyUsImage as string || "/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png"}
              alt="IA IAdmin"
              className="max-w-full w-[400px] h-auto object-contain"
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="w-full py-20 px-5" style={{
        background: "linear-gradient(to bottom right, #2D0A16, #FF196E)",
      }}>
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-semibold mb-4 text-white">
              O que dizem nossos clientes
            </h2>
            <p className="text-lg max-w-[800px] mx-auto text-white/80">
              Veja como nossa inteligência artificial está transformando negócios e melhorando resultados
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                name={testimonial.name}
                role={testimonial.role}
                testimonial={testimonial.testimonial}
                avatarUrl={testimonial.avatarUrl}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="w-full py-20 px-5 bg-[#FFFAF9]">
        <div className="max-w-[1140px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-[42px] font-semibold mb-4 text-[#222]">
              Perguntas Frequentes
            </h2>
            <p className="text-lg max-w-[800px] mx-auto text-[#222]/80">
              Tire suas dúvidas sobre nossos serviços e como podemos ajudar seu negócio
            </p>
          </div>
          
          <FAQAccordion items={faqs} />
          
          <div className="mt-12 text-center">
            <p className="mb-6 text-[#222]/70">
              Ainda tem dúvidas? Entre em contato conosco
            </p>
            <Link to="/contato">
              <CustomButton variant="primary">
                Fale Conosco
              </CustomButton>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Contact Form */}
      <section className="w-full py-20 px-5">
        <div className="max-w-[1140px] mx-auto flex flex-col md:flex-row gap-10 items-center">
          <div className="flex-1">
            <h2 className="text-[42px] font-semibold mb-6 text-[#222]">
              Entre em contato conosco
            </h2>
            <p className="text-lg mb-8 text-[#222]/80">
              Estamos prontos para ajudar a transformar seu negócio com nossas soluções inteligentes
            </p>
            
            <img
              src={siteTexts.contactImage as string || "/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png"}
              alt="Contato IAdmin"
              className="max-w-full h-auto"
            />
          </div>
          
          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="w-full py-12 bg-white">
        <div className="max-w-[1140px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-[32px] font-semibold text-[#FF196E]">
              IAdmin
            </h2>
            <p className="text-[#2D0A16] mt-2">
              {siteTexts.footerAbout as string || 'A sua assistente de AI'}
            </p>
            <Link to="/contato">
              <CustomButton variant="primary" className="mt-8">
                {siteTexts.footerButtonText as string || 'Contrate uma AI Poderosa!'}
              </CustomButton>
            </Link>
          </div>
          <div className="flex justify-between md:justify-end">
            <div className="mr-8">
              <h3 className="text-lg font-semibold text-[#2D0A16]">
                Contato
              </h3>
              <div className="mt-4 text-[#222]">
                <p>{siteTexts.footerPhoneNumber as string || '(11) 93956-965'}</p>
                <p>{siteTexts.footerEmail as string || 'iadminassistant@gmail.com'}</p>
              </div>
            </div>
            <div>
              <Link to="/admin" className="text-[#2D0A16] hover:text-[#ff196e] transition-colors">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t border-[#D8D0D2] mt-12 pt-8 pb-8 text-center max-w-[1140px] mx-auto text-[#2D0A16]">
          {siteTexts.copyrightText as string || "© Todos os direitos reservados - IAdmin 2024"}
        </div>
      </footer>
    </main>
  );
}
