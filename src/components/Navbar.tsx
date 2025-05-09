
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { getSiteTexts } from '@/utils/localStorage';
import MobileNavMenu from './MobileNavMenu';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [siteTitle, setSiteTitle] = useState('IAdmin');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    // Carrega o título do site e a URL do logo do localStorage
    const siteTexts = getSiteTexts();
    if (siteTexts.siteTitle) {
      setSiteTitle(siteTexts.siteTitle);
    }
    if (siteTexts.logoUrl) {
      setLogoUrl(siteTexts.logoUrl);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-secondary-color text-white">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-10 h-10 rounded-full object-contain" />
            ) : (
              <div className="w-10 h-10 bg-primary-color rounded-full flex items-center justify-center">
                <span className="text-white font-bold">I</span>
              </div>
            )}
            <span className="text-primary-color text-2xl font-bold">{siteTitle}</span>
          </Link>

          {/* Menu para desktop */}
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="text-menu-text-color hover:text-primary-color">Home</Link>
            <Link to="/solucoes" className="text-menu-text-color hover:text-primary-color">Soluções</Link>
            <Link to="/contato" className="text-menu-text-color hover:text-primary-color">Contato</Link>
          </nav>
          
          {/* Botão de menu para mobile */}
          <button 
            onClick={toggleMenu} 
            className="md:hidden text-white"
            aria-label="Abrir Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <MobileNavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;
