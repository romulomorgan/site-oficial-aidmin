
import React, { useState, useEffect } from 'react';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { saveContactMessage, getSiteTexts } from '@/utils/localStorage';
import { ContactForm } from '@/components/ui/ContactForm';
import { fetchSiteTexts } from '@/utils/supabaseClient';

export default function Contato() {
  const [siteTexts, setSiteTexts] = useState({
    contactImage: '/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png',
    contatoTitle: 'Deixe seu contato',
    contatoSubtitle: 'Preencha o formulário e entraremos em contato rapidamente.',
    contatoDescription: 'Estamos prontos para entender suas necessidades e oferecer soluções personalizadas que impulsionam sua produtividade.'
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
    
    // Load saved texts from localStorage and then from Supabase
    const loadTexts = async () => {
      try {
        // First load from localStorage for immediate display
        const localTexts = getSiteTexts();
        setSiteTexts(prev => ({...prev, ...localTexts}));
        
        // Then load from Supabase for updated content
        const dbTexts = await fetchSiteTexts();
        setSiteTexts(prev => ({
          ...prev,
          contactImage: typeof dbTexts.contatoImageUrl === 'string' ? dbTexts.contatoImageUrl : '/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png',
          contatoTitle: typeof dbTexts.contatoTitle === 'string' ? dbTexts.contatoTitle : 'Deixe seu contato',
          contatoSubtitle: typeof dbTexts.contatoSubtitle === 'string' ? dbTexts.contatoSubtitle : 'Preencha o formulário e entraremos em contato rapidamente.',
          contatoDescription: typeof dbTexts.contatoDescription === 'string' ? dbTexts.contatoDescription : 'Estamos prontos para entender suas necessidades e oferecer soluções personalizadas que impulsionam sua produtividade.'
        }));
        
        // Load theme colors
        const selectedTemplate = localStorage.getItem('selectedTemplate');
        if (selectedTemplate) {
          // Check default templates
          const savedTemplates = localStorage.getItem('siteTemplates');
          const defaultTemplates = JSON.parse(localStorage.getItem('defaultTemplates') || '[]');
          let allTemplates = defaultTemplates;
          
          if (savedTemplates) {
            allTemplates = [...defaultTemplates, ...JSON.parse(savedTemplates)];
          }
          
          // Get the selected template
          const template = allTemplates.find(t => t.id === selectedTemplate);
          
          // If template found, apply colors
          if (template) {
            setThemeColors({
              primaryColor: template.primaryColor,
              secondaryColor: template.secondaryColor,
              accentColor: template.accentColor,
              backgroundColor: template.backgroundColor,
              textColor: template.textColor
            });
            
            // Aplicar as cores às variáveis CSS
            document.documentElement.style.setProperty('--primary-color', template.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', template.secondaryColor);
            document.documentElement.style.setProperty('--accent-color', template.accentColor);
            document.documentElement.style.setProperty('--background-color', template.backgroundColor);
            document.documentElement.style.setProperty('--text-color', template.textColor);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar textos:', error);
      }
    };
    
    loadTexts();
  }, []);

  return (
    <main className="flex flex-col items-center bg-white">
      {/* Hero Section with Background Gradient */}
      <section 
        className="relative w-full py-[60px] px-5" 
        style={{
          background: `linear-gradient(to bottom right, ${themeColors.secondaryColor}, ${themeColors.primaryColor})`
        }}
      >
        {/* Navigation */}
        <NavigationBar />
        
        <div className="relative z-10 max-w-[1140px] mx-auto mt-16 text-center">
          <h1 className="text-white text-[56px] font-semibold leading-tight mb-6 max-md:text-[40px] slide-left animate-on-scroll">
            {siteTexts.contatoTitle}
          </h1>
          <p className="text-white/90 max-w-[600px] mx-auto text-lg leading-relaxed slide-left animate-on-scroll" style={{animationDelay: '0.2s'}}>
            {siteTexts.contatoDescription}
          </p>
        </div>
      </section>

      {/* Contact Form Card */}
      <section className="w-full max-w-[900px] -mt-10 px-5 z-10 mb-16">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden hover-shadow animate-on-scroll scale-on-scroll">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="w-full md:w-[400px] p-8 animate-on-scroll slide-left-on-scroll">
              <img 
                src={siteTexts.contactImage} 
                alt="Atendente de contato" 
                className="w-full h-full object-cover rounded-lg hover-scale"
                onError={(e) => {
                  console.error("Erro ao carregar imagem:", e);
                  e.currentTarget.src = '/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png';
                }}
              />
            </div>

            {/* Right side - Form */}
            <div className="flex-1 p-8 animate-on-scroll slide-right-on-scroll">
              <h2 className="text-[#222] text-[32px] font-semibold mb-8">
                Contato
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
