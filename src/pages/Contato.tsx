
import React, { useState, useEffect } from 'react';
import { NavigationBar } from '@/components/ui/NavigationBar';
import { CustomButton } from '@/components/ui/CustomButton';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { saveContactMessage, getSiteTexts, getWebhookUrl } from '@/utils/localStorage';
import { ContactForm } from '@/components/ui/ContactForm';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Contato() {
  const [siteTexts, setSiteTexts] = useState({
    footerPhoneNumber: '(11) 93956-965',
    footerEmail: 'iadminassistant@gmail.com',
    footerAbout: 'A sua assistente de AI',
    footerButtonText: 'Contrate uma AI Poderosa!',
    contactImage: '/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png'
  });
  const [themeColors, setThemeColors] = useState({
    primaryColor: '#FF196E',
    secondaryColor: '#2D0A16',
    accentColor: '#FF4F8E',
    backgroundColor: '#FFFFFF',
    textColor: '#222222'
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    // Load saved texts from localStorage
    const savedTexts = getSiteTexts();
    setSiteTexts(prev => ({...prev, ...savedTexts}));
    
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
      }
    }
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
                src={siteTexts.contactImage || '/lovable-uploads/99171a6e-2e02-4673-943e-1b8e633e61c4.png'} 
                alt="Atendente de contato" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Form */}
            <div className="flex-1 p-8">
              <h2 className="text-[#222] text-[32px] font-semibold mb-8">
                Contato
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white py-12 mt-20">
        <div className="max-w-[1140px] mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-[32px] font-semibold" style={{color: themeColors.primaryColor}}>
              IAdmin
            </h2>
            <p style={{color: themeColors.secondaryColor}} className="mt-2">
              {siteTexts.footerAbout}
            </p>
            <Link to="/contato">
              <CustomButton variant="primary" className="mt-8">
                {siteTexts.footerButtonText}
              </CustomButton>
            </Link>
          </div>
          <div className="flex justify-between md:justify-end">
            <div className="mr-8">
              <h3 className="text-lg font-semibold" style={{color: themeColors.secondaryColor}}>
                Contato
              </h3>
              <div className="mt-4" style={{color: themeColors.textColor}}>
                <p>{siteTexts.footerPhoneNumber}</p>
                <p>{siteTexts.footerEmail}</p>
              </div>
            </div>
            {!isMobile && (
              <div>
                <Link to="/admin" className="hover:text-[#ff196e] transition-colors" style={{color: themeColors.secondaryColor}}>
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
