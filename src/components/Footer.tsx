
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { fetchSiteTexts } from '@/utils/supabaseClient';
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
    const loadTexts = async () => {
      try {
        const siteTexts = await fetchSiteTexts();
        setTexts({
          footerAbout: typeof siteTexts.footerAbout === 'string' ? siteTexts.footerAbout : 'A sua assistente de AI',
          footerButtonText: typeof siteTexts.footerButtonText === 'string' ? siteTexts.footerButtonText : 'Contrate uma AI Poderosa!',
          footerPhoneNumber: typeof siteTexts.footerPhoneNumber === 'string' ? siteTexts.footerPhoneNumber : '(11) 93956-965',
          footerEmail: typeof siteTexts.footerEmail === 'string' ? siteTexts.footerEmail : 'iadminassistant@gmail.com',
          copyrightText: typeof siteTexts.copyrightText === 'string' ? siteTexts.copyrightText : '© Todos os direitos reservados - IAdmin 2024'
        });
      } catch (error) {
        console.error('Erro ao carregar textos:', error);
      }
    };
    
    loadTexts();
  }, []);

  return (
    <footer className="bg-secondary-color text-white">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-bold text-lg mb-4 hover-text">IAdmin</h3>
            <p className="text-gray-300">{texts.footerAbout}</p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-white hover:text-accent-color transition-colors transform hover:scale-110 duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-color transition-colors transform hover:scale-110 duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-color transition-colors transform hover:scale-110 duration-300">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-bold text-lg mb-4 hover-text">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-accent-color transition-all duration-300 nav-link">Home</Link></li>
              <li><Link to="/solucoes" className="text-gray-300 hover:text-accent-color transition-all duration-300 nav-link">Nossas Soluções</Link></li>
              <li><Link to="/contato" className="text-gray-300 hover:text-accent-color transition-all duration-300 nav-link">Contato</Link></li>
              <li><Link to="/admin/login" className="text-gray-300 hover:text-accent-color transition-all duration-300 nav-link">Login</Link></li>
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="font-bold text-lg mb-4 hover-text">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 hover-scale">{texts.footerPhoneNumber}</li>
              <li className="text-gray-300 hover-scale">{texts.footerEmail}</li>
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="font-bold text-lg mb-4 hover-text">Newsletter</h3>
            <p className="text-gray-300 mb-4">Fique por dentro das novidades.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="px-4 py-2 rounded-l outline-none text-gray-800 flex-1 transition-all duration-300 focus:ring-2 focus:ring-primary-color"
              />
              <button className="bg-primary-color px-4 py-2 rounded-r text-button-text-color hover:bg-accent-color transition-all duration-300 transform hover:scale-105">
                Enviar
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {texts.copyrightText} | <Link to="/admin/login" className="text-primary-color hover:underline hover-text">Área Administrativa</Link>
            </p>
            <div className="mt-4 md:mt-0">
              <Link to="/contato" className="bg-primary-color px-6 py-2 rounded-full text-button-text-color hover:bg-accent-color transition-all duration-300 transform hover:scale-105 hover-shadow">
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
