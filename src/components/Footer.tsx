
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { getSiteTexts } from '@/utils/localStorage';
import { useIsMobile } from '@/hooks/useIsMobile';

export const Footer = () => {
  const [texts, setTexts] = useState({
    footerAbout: 'A sua assistente de AI',
    footerButtonText: 'Contrate uma AI Poderosa!',
    footerPhoneNumber: '(11) 93956-965',
    footerEmail: 'iadminassistant@gmail.com',
    copyrightText: '© Todos os direitos reservados - IAdmin 2024'
  });

  const isMobile = useIsMobile();

  useEffect(() => {
    const siteTexts = getSiteTexts();
    setTexts({
      footerAbout: siteTexts.footerAbout || 'A sua assistente de AI',
      footerButtonText: siteTexts.footerButtonText || 'Contrate uma AI Poderosa!',
      footerPhoneNumber: siteTexts.footerPhoneNumber || '(11) 93956-965',
      footerEmail: siteTexts.footerEmail || 'iadminassistant@gmail.com',
      copyrightText: siteTexts.copyrightText || '© Todos os direitos reservados - IAdmin 2024'
    });
  }, []);

  return (
    <footer className="bg-secondary-color text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">IAdmin</h3>
            <p className="text-gray-300">{texts.footerAbout}</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-white hover:text-accent-color">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-color">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-color">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-accent-color">Home</Link></li>
              <li><Link to="/solucoes" className="text-gray-300 hover:text-accent-color">Nossas Soluções</Link></li>
              <li><Link to="/contato" className="text-gray-300 hover:text-accent-color">Contato</Link></li>
              {!isMobile && (
                <li><Link to="/admin/login" className="text-gray-300 hover:text-accent-color">Login</Link></li>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">{texts.footerPhoneNumber}</li>
              <li className="text-gray-300">{texts.footerEmail}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Fique por dentro das novidades.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="px-4 py-2 rounded-l outline-none text-gray-800 flex-1"
              />
              <button className="bg-primary-color px-4 py-2 rounded-r text-button-text-color hover:bg-accent-color transition-colors">
                Enviar
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">{texts.copyrightText}</p>
            <div className="mt-4 md:mt-0">
              <Link to="/contato" className="bg-primary-color px-6 py-2 rounded-full text-button-text-color hover:bg-accent-color transition-colors">
                {texts.footerButtonText}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
