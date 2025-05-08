
import React from 'react';
import { Header } from '@/components/layout/Header';
import { TestimonialCard } from '@/components/ui/TestimonialCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { ContactForm } from '@/components/ui/ContactForm';
import { CustomButton } from '@/components/ui/CustomButton';

const testimonials = [
  {
    name: "Carlos M.",
    role: "Gerente de Projetos",
    testimonial: "Com a AI da Virtia, conseguimos reduzir o tempo de planejamento em 30%. Ela nos fornece insights precisos, ajustando automaticamente o cronograma de acordo com o andamento das obras. Nunca tivemos tanto controle!",
    avatarUrl: "https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/99958c2062e54bcd396af977cf7591eddd0afa70?placeholderIfAbsent=true"
  },
  // Add other testimonials...
];

const faqItems = [
  {
    question: "Como funciona a Inteligência Artificial da Virtia?",
    answer: "A Virtia utiliza tecnologia de ponta em IA para automatizar e otimizar processos na construção civil..."
  },
  // Add other FAQ items...
];

export default function Index() {
  return (
    <main className="flex flex-col px-20 max-md:pl-5">
      <div className="relative min-h-[1200px] w-full max-w-[1920px] bg-white max-md:max-w-full">
        <Header />

        <section className="flex w-full flex-col items-stretch pt-[60px] max-md:max-w-full">
          <h2 className="text-[#ff196e] text-center text-lg font-semibold leading-[25.2px]">
            O que fazemos de melhor
          </h2>
          <h3 className="text-[#220b13] text-center text-[46px] font-semibold leading-[64.4px] max-md:max-w-full max-md:text-[40px]">
            Criamos e treinamos a sua AI
          </h3>
          
          {/* Features Grid */}
          <div className="self-center w-[1140px] max-w-full mt-[69px] max-md:mt-10 grid grid-cols-3 gap-5">
            <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/549569d46b63c01644396b198dccdce85449473c?placeholderIfAbsent=true" alt="Feature 1" className="w-full aspect-square object-contain" />
            <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/a62d5a9c11017d9ae646fee86e79073b8bf329e5?placeholderIfAbsent=true" alt="Feature 2" className="w-full aspect-square object-contain" />
            <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/bf1676968402dd703834c8f0b0be70aafa252218?placeholderIfAbsent=true" alt="Feature 3" className="w-full aspect-square object-contain" />
          </div>

          {/* Testimonials Section */}
          <section className="bg-[#220B13] mt-[60px] py-[60px] relative overflow-hidden">
            <div className="absolute inset-0">
              <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/45a191a06a517f491dab576039c00c9fb124b3a3?placeholderIfAbsent=true" alt="Background pattern" className="w-full h-full object-cover" />
            </div>
            
            <div className="relative z-10 max-w-[1180px] mx-auto px-5">
              <h2 className="text-[#ff196e] text-center text-lg font-semibold mb-4">
                Depoimentos
              </h2>
              <h3 className="text-white text-center text-[46px] font-semibold mb-16">
                Veja o impacto eletrizante da nossa AI
              </h3>
              
              <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard key={index} {...testimonial} />
                ))}
              </div>
            </div>
          </section>

          {/* WhatsApp Integration Section */}
          <section className="flex justify-between items-center max-w-[1140px] mx-auto mt-[60px] gap-8">
            <div className="max-w-[524px]">
              <h4 className="text-[#ff196e] text-lg font-semibold">
                INTEGRAÇÃO
              </h4>
              <div className="flex gap-2 items-center mt-4">
                <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/2af64944c18260347ff6438d5740f05a915597c0?placeholderIfAbsent=true" alt="WhatsApp" className="w-[60px] h-[60px]" />
                <h3 className="text-[46px] font-semibold text-[#220b13]">
                  WhatsApp Business
                </h3>
              </div>
              <p className="text-[#220b13] text-base leading-[26.4px] mt-6">
                A Virtia funciona perfeitamente com o WhatsApp Business, permitindo
                que você automatize comunicações, otimize o atendimento ao cliente e
                gerencie conversas com eficiência.
              </p>
              <div className="flex gap-4 mt-8">
                <CustomButton variant="primary" icon="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/ac165d09e5068cc1de628bc20e34c4869eebef04?placeholderIfAbsent=true">
                  Soluções de AI
                </CustomButton>
                <CustomButton variant="secondary">
                  Contrate uma AI Poderosa!
                </CustomButton>
              </div>
            </div>
            <div className="shadow-lg rounded-lg overflow-hidden">
              <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/dccad8c03ab957ead54ea74804281a32eea28ea8?placeholderIfAbsent=true" alt="WhatsApp Interface" className="w-[286px]" />
            </div>
          </section>

          {/* FAQ Section */}
          <section className="bg-[#F7F7F7] mt-[60px] py-[60px]">
            <div className="max-w-[1180px] mx-auto px-5">
              <h2 className="text-[#ff196e] text-center text-lg font-semibold">
                FAQ
              </h2>
              <h3 className="text-[#220b13] text-center text-[46px] font-semibold mb-16">
                Perguntas Frequentes
              </h3>
              <FAQAccordion items={faqItems} />
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-[#220B13] py-[60px] text-center">
            <h2 className="text-white text-[40px] font-semibold mb-4">
              Deixe seu contato
            </h2>
            <p className="text-[#d8d0d2] mb-8">
              Entraremos em contato brevemente!
            </p>
            <div className="relative">
              <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/1e7db249131f782442452e761c2daff60f42f6d6?placeholderIfAbsent=true" alt="Background pattern" className="w-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <ContactForm />
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-[119px] pb-px max-md:pt-[100px]">
            <div className="max-w-[1180px] mx-auto px-5 grid grid-cols-2 gap-8">
              <div>
                <h2 className="text-[32px] font-semibold text-[#ff196e]">
                  Virtia
                </h2>
                <p className="text-[#220b13] mt-2">
                  A sua assistente de AI
                </p>
                <CustomButton variant="primary" icon="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/a6a8d0c78b77435f1a23d0754afe4db5508c6bd9?placeholderIfAbsent=true" className="mt-8">
                  Contrate sua AI!
                </CustomButton>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#220b13]">
                  Contato
                </h3>
                <div className="mt-4">
                  <p>(31) 8767-8307</p>
                  <p>oi@iadmin.app</p>
                </div>
              </div>
            </div>
            <div className="border-t border-[#D8D0D2] mt-12 pt-8 pb-8 text-center text-[#220b13]">
              © Todos os direitos reservados - IAdmin 2024
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}
