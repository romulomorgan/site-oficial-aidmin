
import React from 'react';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { CustomButton } from '@/components/ui/CustomButton';
import { ContactForm } from '@/components/ui/ContactForm';

export default function Contato() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission in the future
  };

  return (
    <main className="flex flex-col items-center bg-white">
      {/* Hero Section with Background Gradient */}
      <section className="relative w-full bg-gradient-to-br from-[#2D0A16] to-[#FF196E] py-[60px] px-5 md:px-20">
        <div className="absolute inset-0 bg-[url('/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        
        {/* Navigation */}
        <NavigationBar />
        
        <div className="relative z-10 max-w-[1140px] mx-auto mt-16 text-center">
          <h1 className="text-white text-[56px] font-semibold leading-tight mb-6 max-md:text-[40px]">
            Deixe seu contato
          </h1>
          <p className="text-white/90 max-w-[600px] mx-auto text-lg leading-relaxed">
            Preencha o formulário e entraremos em contato rapidamente.
            <br />
            Estamos prontos para entender suas necessidades e oferecer soluções personalizadas que impulsionam
            sua produtividade.
          </p>
        </div>
      </section>

      {/* Contact Form Card */}
      <section className="w-full max-w-[900px] -mt-10 px-5 z-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="w-full md:w-[400px]">
              <img 
                src="/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png" 
                alt="Atendente de contato" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Form */}
            <div className="flex-1 p-8">
              <h2 className="text-[#222] text-[32px] font-semibold mb-8">
                Contato
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
                      Primeiro Nome
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      placeholder="Primeiro Nome"
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
                      Sobrenome
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      placeholder="Sobrenome"
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="E-mail"
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="Telefone"
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    placeholder="Digite aqui sua mensagem..."
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  ></textarea>
                </div>

                <CustomButton type="submit" variant="primary" className="w-full">
                  Enviar
                </CustomButton>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-gradient-to-br from-[#2D0A16] to-[#FF196E] py-[60px] text-center mt-20">
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
            <CustomButton variant="primary" icon="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/a6a8d0c78b77435f1a23d0754afe4db5508c6bd9?placeholderIfAbsent=true" className="mt-8">
              Contrate sua AI!
            </CustomButton>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#220b13]">
              Contato
            </h3>
            <div className="mt-4">
              <p>(11) 93956-965</p>
              <p>iadminassistant@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-[#D8D0D2] mt-12 pt-8 pb-8 text-center text-[#220b13] max-w-[1140px] mx-auto">
          © Todos os direitos reservados - IAdmin 2024
        </div>
      </footer>
    </main>
  );
}
