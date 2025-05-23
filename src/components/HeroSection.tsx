
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CustomButton } from './ui/CustomButton';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  bgImage?: string;
  showButtons?: boolean;
  customLogo?: {
    url: string;
    alt: string;
  };
  whatsappButtonLink?: string;
  whatsappButtonText?: string;
  whatsappSecondaryButtonLink?: string;
  whatsappSecondaryButtonText?: string;
  heroSecondaryButtonLink?: string;
  heroSecondaryButtonText?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  title = "Transforme seu atendimento com IA", 
  subtitle = "Automatize respostas, gerencie clientes e aumente suas vendas com nossa solução completa de chatbot e CRM.", 
  bgImage = "/lovable-uploads/8a89a74c-2317-4428-a2e6-c3c27e68ce7c.webp",
  showButtons = true,
  customLogo,
  whatsappButtonLink = "/contato",
  whatsappButtonText = "Fale Conosco",
  whatsappSecondaryButtonLink = "/contato",
  whatsappSecondaryButtonText = "Contrate a iAdmin",
  heroSecondaryButtonLink = "/contato",
  heroSecondaryButtonText = "Contrate uma AI Poderosa!"
}) => {
  return (
    <div className="relative overflow-hidden bg-cover bg-center py-28 md:py-36 w-full" style={{ backgroundImage: `url(${bgImage})` }}>
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      <div className="relative z-10 container mx-auto px-6 text-center md:px-12">
        {customLogo && (
          <div className="mb-8 flex justify-center">
            <img 
              src={customLogo.url} 
              alt={customLogo.alt} 
              className="h-16 md:h-20 object-contain"
            />
          </div>
        )}
        <h1 className="slide-in-right animate-on-scroll text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{title}</h1>
        <p className="fade-in animate-on-scroll text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10">{subtitle}</p>
        
        {showButtons && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up animate-on-scroll" style={{animationDelay: '0.2s'}}>
            <Link to={whatsappButtonLink || "/contato"}>
              <CustomButton size="lg" variant="primary" className="w-full sm:w-auto hover-float">
                {whatsappButtonText} <ArrowRight className="ml-2 h-5 w-5" />
              </CustomButton>
            </Link>
            <Link to={heroSecondaryButtonLink || "/contato"}>
              <CustomButton size="lg" variant="secondary" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white hover-float">
                {heroSecondaryButtonText}
              </CustomButton>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
