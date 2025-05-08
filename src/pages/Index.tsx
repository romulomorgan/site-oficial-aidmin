
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ContactForm } from '@/components/ui/ContactForm';
import { CustomButton } from '@/components/ui/CustomButton';

const testimonials = [
  {
    name: "Carlos M.",
    role: "Gerente de Projetos",
    testimonial: "Com a AI da IAdmin, conseguimos reduzir o tempo de planejamento em 30%. Ela nos fornece insights precisos, ajustando automaticamente o cronograma de acordo com o andamento das obras. Nunca tivemos tanto controle!",
    avatarUrl: "https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/99958c2062e54bcd396af977cf7591eddd0afa70?placeholderIfAbsent=true"
  },
  {
    name: "Mariana P.",
    role: "Diretora de operações",
    testimonial: "A IAdmin trouxe uma transformação real à nossa empresa. A rapidez com que automatiza processos e interpreta documentos é impressionante, e seu sistema de apoio à decisão nos permite ser mais estratégicos.",
    avatarUrl: "https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/09b122a661f457926e57ea75f3ccd16a13770c01?placeholderIfAbsent=true"
  },
  {
    name: "Lucas K.",
    role: "Coordenador de obras",
    testimonial: "O que a IAdmin realiza diária do nosso time com SmartCity é preciso e intuitivo. A visualização de relatórios e o gerenciamento ágil são diferenciais que nos ajudam a manter as obras no cronograma.",
    avatarUrl: "https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/8491a3ecf4b307f91edcd2d89f2c8c01096ca3cb?placeholderIfAbsent=true"
  }
];

const faqItems = [
  {
    question: "Como funciona a Inteligência Artificial da IAdmin?",
    answer: "A IAdmin utiliza tecnologia de ponta em IA para automatizar e otimizar processos na construção civil e outros setores. Nosso sistema analisa dados, identifica padrões e fornece insights valiosos para tomada de decisão."
  },
  {
    question: "Posso ter uma integração completa com nosso departamento operacional?",
    answer: "Sim, nossos sistemas de IA são desenvolvidos para integrar perfeitamente com seus sistemas existentes, garantindo uma transição suave e eficiente para processos mais automatizados."
  },
  {
    question: "A Inteligência Artificial funciona com o WhatsApp?",
    answer: "Sim! Nossa IA se integra perfeitamente com o WhatsApp Business, permitindo automação de atendimento, respostas inteligentes e gerenciamento eficiente de conversas com seus clientes."
  },
  {
    question: "Podemos integrar a IAdmin com outros sistemas que já utilizamos?",
    answer: "Absolutamente. Nossa solução foi projetada para ser flexível e se integrar a sistemas existentes através de APIs e conectores personalizados, minimizando a curva de aprendizado."
  },
  {
    question: "Teremos algum painel para gerenciar?",
    answer: "Sim, oferecemos um painel administrativo intuitivo e completo que permite configurar, monitorar e analisar o desempenho da sua IA, incluindo métricas de atendimento e automação."
  }
];

export default function Index() {
  const [isAdmin, setIsAdmin] = useState(false);

  // Scroll reveal animation effect
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          revealElements[i].classList.add('active');
        }
      }
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  // Check if user is already authenticated from localStorage
  useEffect(() => {
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');
    if (adminAuthenticated === 'true') {
      setIsAdmin(true);
    }
  }, []);

  return (
    <main className="flex flex-col bg-white">
      <div className="relative w-full max-w-[1920px] mx-auto max-md:max-w-full">
        {/* Hero Section */}
        <section className="relative w-full bg-gradient-to-br from-[#2D0A16] to-[#FF196E] min-h-[600px]">
          {/* Navigation */}
          <NavigationBar />

          <div className="max-w-[1140px] mx-auto relative px-5 pt-[150px] pb-[80px] flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Left Content */}
            <div className="max-w-[524px] z-10 w-full">
              <h1 className="text-[56px] font-semibold leading-[1.2] text-white pb-px max-md:text-[40px] max-md:leading-[1.2]">
                Destrave a<br />
                fronteira da<br />
                produtividade.
              </h1>
              
              <p className="text-white text-lg font-normal leading-[27.9px] mt-6">
                Exploramos os limites da <strong>AI Generativa</strong> para criar novos
                produtos, avenidas de receitas e gerar eficiência operacional.
              </p>

              <div className="flex w-full items-stretch gap-4 flex-wrap mt-[40px] max-md:mt-8">
                <Link to="/solucoes">
                  <CustomButton variant="primary" icon="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/a1248679ed61fe6b54e693d50e9e1c968633d2bd?placeholderIfAbsent=true">
                    Soluções de AI
                  </CustomButton>
                </Link>
                <Link to="/contato">
                  <CustomButton variant="secondary">
                    Contrate uma AI Poderosa!
                  </CustomButton>
                </Link>
              </div>
            </div>

            {/* Right Content - Embedded YouTube Video */}
            <div className="relative z-10 w-full max-w-[460px]">
              <div className="relative aspect-video w-full">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/fWzFvNAkHuQ" 
                  title="AI Generativa" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="rounded-lg shadow-lg absolute inset-0"
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="flex w-full flex-col items-center pt-[60px] px-5 reveal">
          <h2 className="text-[#ff196e] text-center text-lg font-semibold leading-[25.2px]">
            O QUE FAZEMOS DE MELHOR
          </h2>
          <h3 className="text-[#220b13] text-center text-[38px] font-semibold leading-[1.2] max-md:text-[32px] mt-3">
            Criamos e treinamos a sua AI
          </h3>
          
          {/* Features Grid */}
          <div className="w-full max-w-[1140px] mt-[50px] max-md:mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-all hover:scale-[1.01]">
              <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/549569d46b63c01644396b198dccdce85449473c?placeholderIfAbsent=true" alt="Assistente de IA" className="w-full aspect-square object-contain mb-4" />
              <h4 className="text-center font-semibold text-xl">ASSISTENTE DE IA</h4>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-all hover:scale-[1.01]">
              <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/a62d5a9c11017d9ae646fee86e79073b8bf329e5?placeholderIfAbsent=true" alt="Otimização de processos" className="w-full aspect-square object-contain mb-4" />
              <h4 className="text-center font-semibold text-xl">OTIMIZAÇÃO DE PROCESSOS</h4>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center hover:shadow-md transition-all hover:scale-[1.01]">
              <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/bf1676968402dd703834c8f0b0be70aafa252218?placeholderIfAbsent=true" alt="Análise de dados e visualização" className="w-full aspect-square object-contain mb-4" />
              <h4 className="text-center font-semibold text-xl">ANÁLISE DE DADOS E VISUALIZAÇÃO</h4>
            </div>
          </div>

          {/* Expansion Section */}
          <div className="w-full max-w-[1140px] mt-[80px] max-md:mt-12 reveal">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 md:pr-8">
                <h2 className="text-[#ff196e] text-lg font-semibold leading-[25.2px] mb-2">
                  A QUEM ATENDEMOS
                </h2>
                <h3 className="text-[#220b13] text-[34px] font-semibold mb-6 leading-[1.3]">
                  Em expansão para o segmento da<br />
                  construção civil e condomínios.
                </h3>
                
                <p className="text-[#222222] mb-6">
                  Desenvolvendo soluções pioneiras de AI para o setor imobiliário, a <strong>AI Generativa</strong> estabeleceu-se para otimizar processos operacionais. Já foram implementados sistemas de gerenciamento para mais de 40 condomínios e projetos de construção, trazendo economia mensurável para as empresas.
                </p>
                <p className="text-[#222222] mb-6">
                  Em um mercado cada vez mais orientado por dados, nossos modelos detectam padrões em grandes volumes de informações para antecipar problemas e otimizar resultados, agregando eficiência e transparência em cada etapa.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="flex flex-col items-center">
                    <div className="text-[#ff196e] text-2xl font-bold">3+</div>
                    <div className="text-sm text-center">Anos de experiência no mercado</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-[#ff196e] text-2xl font-bold">600+</div>
                    <div className="text-sm text-center">Projetos implementados com sucesso</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-[#ff196e] text-2xl font-bold">40+</div>
                    <div className="text-sm text-center">Condomínios gerenciados</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-[#ff196e] text-2xl font-bold">47k+</div>
                    <div className="text-sm text-center">Documentos processados por mês</div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 mt-6 md:mt-0 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png" 
                  alt="AI Robot" 
                  className="w-full max-w-[350px]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gradient-to-br from-[#2D0A16] to-[#FF196E] mt-[80px] py-[60px] relative reveal">
          <div className="relative z-10 max-w-[1180px] mx-auto px-5">
            <h2 className="text-white text-center text-lg font-semibold mb-2">
              Depoimentos
            </h2>
            <h3 className="text-white text-center text-[38px] font-semibold mb-12">
              Veja o impacto eletrizante da nossa AI
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* WhatsApp Integration Section */}
        <section className="flex flex-col md:flex-row justify-between items-center max-w-[1140px] mx-auto mt-[80px] gap-8 px-5 reveal">
          <div className="max-w-[524px]">
            <h4 className="text-[#ff196e] text-lg font-semibold">
              INTEGRAÇÃO
            </h4>
            <div className="flex gap-2 items-center mt-4">
              <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/2af64944c18260347ff6438d5740f05a915597c0?placeholderIfAbsent=true" alt="WhatsApp" className="w-[60px] h-[60px]" />
              <h3 className="text-[38px] font-semibold text-[#220b13]">
                WhatsApp Business
              </h3>
            </div>
            <p className="text-[#220b13] text-base leading-[26.4px] mt-6">
              A IAdmin funciona perfeitamente com o WhatsApp Business, permitindo
              que você automatize comunicações, otimize o atendimento ao cliente e
              gerencie conversas com eficiência.
            </p>
            <div className="flex gap-4 mt-8">
              <Link to="/solucoes">
                <CustomButton variant="primary" icon="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/ac165d09e5068cc1de628bc20e34c4869eebef04?placeholderIfAbsent=true">
                  Soluções de AI
                </CustomButton>
              </Link>
              <Link to="/contato">
                <CustomButton variant="secondary">
                  Contrate uma AI Poderosa!
                </CustomButton>
              </Link>
            </div>
          </div>
          <div className="shadow-lg rounded-lg overflow-hidden">
            <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/dccad8c03ab957ead54ea74804281a32eea28ea8?placeholderIfAbsent=true" alt="WhatsApp Interface" className="w-full max-w-[320px]" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-[#F7F7F7] mt-[80px] py-[60px] reveal">
          <div className="max-w-[1180px] mx-auto px-5">
            <h2 className="text-[#ff196e] text-center text-lg font-semibold">
              FAQ
            </h2>
            <h3 className="text-[#220b13] text-center text-[38px] font-semibold mb-12">
              Perguntas Frequentes
            </h3>
            <FAQAccordion items={faqItems} />
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-br from-[#2D0A16] to-[#FF196E] py-[60px] text-center reveal">
          <h2 className="text-white text-[38px] font-semibold mb-3">
            Deixe seu contato
          </h2>
          <p className="text-[#d8d0d2] mb-8">
            Entraremos em contato brevemente!
          </p>
          <div className="relative z-10 flex items-center justify-center">
            <ContactForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-[80px] pb-px max-md:pt-[60px] px-5">
          <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-[32px] font-semibold text-[#ff196e]">
                IAdmin
              </h2>
              <p className="text-[#220b13] mt-2">
                A sua assistente de AI
              </p>
              <Link to="/contato">
                <CustomButton variant="primary" icon="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/a6a8d0c78b77435f1a23d0754afe4db5508c6bd9?placeholderIfAbsent=true" className="mt-8">
                  Contrate sua AI!
                </CustomButton>
              </Link>
            </div>
            <div className="flex justify-between md:justify-end">
              <div className="mr-8">
                <h3 className="text-lg font-semibold text-[#220b13]">
                  Contato
                </h3>
                <div className="mt-4">
                  <p>(11) 93956-965</p>
                  <p>iadminassistant@gmail.com</p>
                </div>
              </div>
              <div>
                <Link to="/admin" className="text-[#220b13] hover:text-[#ff196e] transition-colors">
                  Login
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-[#D8D0D2] mt-12 pt-8 pb-8 text-center text-[#220b13] max-w-[1180px] mx-auto">
            © Todos os direitos reservados - IAdmin 2024
          </div>
        </footer>
      </div>

      {/* CSS para animações */}
      <style>
        {`
        .reveal {
          position: relative;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease;
        }
        
        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
        `}
      </style>
    </main>
  );
}
