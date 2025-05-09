
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { fetchSiteTexts } from '@/utils/supabaseClient';
import { useIsMobile } from '@/hooks/useIsMobile';

export const Footer = () => {
  const [texts, setTexts] = useState({
    footerAbout: 'A sua assistente de AI',
    footerPhoneNumber: '(31) 98767-8307',
    footerEmail: 'lucas@gmail.com',
    copyrightText: '© Todos os direitos reservados - IAdmin 2025',
    companyName: 'IAdmin',
    footerButtonText: 'Contrate uma AI Poderosa!',
    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    twitterUrl: 'https://twitter.com',
    facebookActive: true,
    instagramActive: true,
    twitterActive: true
  });

  const isMobile = useIsMobile();

  useEffect(() => {
    const loadTexts = async () => {
      try {
        const siteTexts = await fetchSiteTexts();
        setTexts({
          footerAbout: typeof siteTexts.footerAbout === 'string' ? siteTexts.footerAbout : 'A sua assistente de AI',
          footerPhoneNumber: typeof siteTexts.footerPhoneNumber === 'string' ? siteTexts.footerPhoneNumber : '(31) 98767-8307',
          footerEmail: typeof siteTexts.footerEmail === 'string' ? siteTexts.footerEmail : 'lucas@gmail.com',
          copyrightText: typeof siteTexts.copyrightText === 'string' ? siteTexts.copyrightText : '© Todos os direitos reservados - IAdmin 2025',
          companyName: typeof siteTexts.companyName === 'string' ? siteTexts.companyName : 'IAdmin',
          footerButtonText: typeof siteTexts.footerButtonText === 'string' ? siteTexts.footerButtonText : 'Contrate uma AI Poderosa!',
          facebookUrl: typeof siteTexts.facebookUrl === 'string' ? siteTexts.facebookUrl : 'https://facebook.com',
          instagramUrl: typeof siteTexts.instagramUrl === 'string' ? siteTexts.instagramUrl : 'https://instagram.com', 
          twitterUrl: typeof siteTexts.twitterUrl === 'string' ? siteTexts.twitterUrl : 'https://twitter.com',
          facebookActive: siteTexts.facebookActive === false ? false : true,
          instagramActive: siteTexts.instagramActive === false ? false : true,
          twitterActive: siteTexts.twitterActive === false ? false : true
        });
      } catch (error) {
        console.error('Erro ao carregar textos:', error);
      }
    };
    
    loadTexts();
  }, []);

  const handleSocialClick = (url: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="bg-secondary-color text-white">
      <div className="container mx-auto py-8 px-4">
        {/* Parte superior do rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Coluna 1 - Sobre */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-color">{texts.companyName}</h3>
            <p className="text-gray-300 mb-4">{texts.footerAbout}</p>
            <Link to="/contato" className="bg-primary-color text-white px-4 py-2 rounded-md inline-block hover:bg-opacity-90 transition-all">
              {texts.footerButtonText}
            </Link>
          </div>
          
          {/* Coluna 2 - Links rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-color">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary-color transition-colors">Home</Link></li>
              <li><Link to="/solucoes" className="text-gray-300 hover:text-primary-color transition-colors">Nossas Soluções</Link></li>
              <li><Link to="/contato" className="text-gray-300 hover:text-primary-color transition-colors">Contato</Link></li>
              <li><Link to="/admin/login" className="text-gray-300 hover:text-primary-color transition-colors">Login</Link></li>
            </ul>
          </div>
          
          {/* Coluna 3 - Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary-color">Contato</h3>
            <div className="space-y-2 text-gray-300">
              <p>{texts.footerPhoneNumber}</p>
              <p>{texts.footerEmail}</p>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2 text-primary-color">Newsletter</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Seu e-mail" 
                  className="px-3 py-2 rounded-l outline-none text-gray-800 flex-1"
                />
                <button 
                  className="bg-primary-color px-3 py-2 rounded-r text-white hover:bg-opacity-90 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Linha divisória */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{texts.copyrightText}</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              {texts.facebookActive && (
                <button 
                  onClick={() => handleSocialClick(texts.facebookUrl)}
                  className="text-gray-400 hover:text-primary-color transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={20} />
                </button>
              )}
              {texts.instagramActive && (
                <button 
                  onClick={() => handleSocialClick(texts.instagramUrl)}
                  className="text-gray-400 hover:text-primary-color transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </button>
              )}
              {texts.twitterActive && (
                <button 
                  onClick={() => handleSocialClick(texts.twitterUrl)}
                  className="text-gray-400 hover:text-primary-color transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
