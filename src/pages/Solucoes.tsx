import React, { useState, useEffect } from 'react';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { CustomButton } from '@/components/ui/CustomButton';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SiteTexts {
  whyUsImage: string;
}

export default function Solucoes() {
  const [siteTexts, setSiteTexts] = useState<SiteTexts>({
    whyUsImage: '/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png'
  });
  
  useEffect(() => {
    // Load saved texts from localStorage for images
    const savedTexts = localStorage.getItem('siteTexts');
    if (savedTexts) {
      const parsedTexts = JSON.parse(savedTexts);
      if (parsedTexts.whyUsImage) {
        setSiteTexts(prev => ({...prev, whyUsImage: parsedTexts.whyUsImage}));
      }
    }
  }, []);

  return (
    <main className="flex flex-col items-center bg-white">
      {/* Hero Section with Background Gradient */}
      <section className="relative w-full bg-gradient-to-br from-[#2D0A16] to-[#FF196E] py-[60px] px-5">
        {/* Navigation */}
        <NavigationBar />
        
        <div className="relative z-10 max-w-[1140px] mx-auto mt-16 text-white">
          <h1 className="text-white text-[56px] font-semibold leading-tight mb-6 max-md:text-[40px]">
            Nossas Soluções
          </h1>
          <p className="text-white/90 max-w-[600px] text-lg leading-relaxed">
            Implantamos soluções tecnológicas que envolvem tecnologia da informação e inteligência de
            software para turbinar processos operacionais de nossos parceiros.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="w-full max-w-[1140px] px-5 py-16">
        <div className="mb-16">
          <h2 className="text-[#FF196E] text-lg font-medium uppercase mb-4">
            ADOTE A NOSSA AI
          </h2>
          <h3 className="text-[#222] text-[46px] font-semibold mb-8">
            Conectamos a nossa AI aos seus<br />processos operacionais
          </h3>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-[400px] relative">
              <div className="bg-pink-50 rounded-full aspect-square flex items-center justify-center">
                <img 
                  src={siteTexts.whyUsImage}
                  alt="AI Robot" 
                  className="w-2/3 object-contain"
                />
              </div>
            </div>

            <div className="flex-1">
              <p className="text-[#222] leading-relaxed mb-4">
                Na IAdmin, conectamos nossa inteligência artificial diretamente aos seus processos
                operacionais, transformando a maneira como sua empresa executa tarefas e toma decisões.
              </p>
              
              <p className="text-[#222] leading-relaxed mb-4">
                Por meio do <strong>BPO-PN (Business Process Optimization - Processos de Negócios)</strong>, otimizamos
                fluxos administrativos, financeiros e contratuais, garantindo maior eficiência e redução de
                custos. Já com o <strong>BPO-P&D (Business Process Optimization - Projetos e Desenvolvimento)</strong>,
                nossa AI atua na gestão de projetos, aprimorando cronogramas, prevendo gargalos e gerando
                insights para um planejamento mais assertivo.
              </p>
              
              <p className="text-[#222] leading-relaxed mb-4">
                Essa integração possibilita uma automação inteligente que vai além da execução de tarefas, criando um ambiente onde dados são
                utilizados de forma estratégica para potencializar resultados e ampliar sua competitividade no
                mercado. Seja na construção civil, condomínios ou outros segmentos, nossa tecnologia
                trabalha em sintonia com seus processos, garantindo maior produtividade e inovação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-gradient-to-br from-[#2D0A16] to-[#FF196E] py-[60px] text-center">
        <div className="max-w-[1140px] mx-auto px-5">
          <h2 className="text-white text-[40px] font-semibold mb-2">
            Deixe seu contato
          </h2>
          <p className="text-white/80 mb-8">
            Entraremos em contato brevemente!
          </p>
          <div className="flex justify-center">
            <div className="w-full max-w-[444px]">
              <input
                type="email"
                placeholder="E-mail"
                className="w-full h-12 px-5 rounded-lg bg-transparent border border-white text-white mb-4"
              />
              <CustomButton type="button" variant="primary" className="w-full">
                Enviar
              </CustomButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white py-12">
        <div className="max-w-[1140px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-[32px] font-semibold text-[#ff196e]">
              IAdmin
            </h2>
            <p className="text-[#220b13] mt-2">
              A sua assistente de AI
            </p>
            <Link to="/contato">
              <CustomButton variant="primary" className="mt-8">
                Contrate uma AI Poderosa!
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
            {location.pathname === "/" && (
              <div>
                <Link to="/admin" className="text-[#220b13] hover:text-[#ff196e] transition-colors">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-[#D8D0D2] mt-12 pt-8 pb-8 text-center text-[#220b13] max-w-[1140px] mx-auto">
          © Todos os direitos reservados - IAdmin 2024
        </div>
      </footer>
    </main>
  );
}
