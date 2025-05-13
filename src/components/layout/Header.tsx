import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { getSiteTexts } from '@/utils/localStorage';

const Header: React.FC = () => {
  const [siteTitle, setSiteTitle] = useState('IAdmin');
  const [logoUrl, setLogoUrl] = useState('');
  const [navbarBg, setNavbarBg] = useState('bg-transparent');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [primaryButtonText, setPrimaryButtonText] = useState('Contato');
  const [primaryButtonUrl, setPrimaryButtonUrl] = useState('/contato');

  useEffect(() => {
    const siteTexts = getSiteTexts();
    
    if (siteTexts.siteTitle) {
      setSiteTitle(String(siteTexts.siteTitle));
    }
    
    if (siteTexts.logoUrl) {
      setLogoUrl(String(siteTexts.logoUrl));
    }
    
    if (siteTexts.navbarBg) {
      setNavbarBg(String(siteTexts.navbarBg));
    }
    
    if (siteTexts.primaryButtonText) {
      setPrimaryButtonText(String(siteTexts.primaryButtonText));
    }
    
    if (siteTexts.primaryButtonUrl) {
      setPrimaryButtonUrl(String(siteTexts.primaryButtonUrl));
    }
  }, []);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all ${navbarBg}`}>
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={siteTitle} 
              className="w-10 h-10 object-contain"
            />
          ) : (
            <div className="w-10 h-10 bg-primary-color rounded-full flex items-center justify-center">
              <span className="text-white font-bold">I</span>
            </div>
          )}
          <span className="text-primary-color text-2xl font-bold">{siteTitle}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-primary-color transition-colors">
            Home
          </Link>
          <Link to="/solucoes" className="text-white hover:text-primary-color transition-colors">
            Soluções
          </Link>
          <Link to="/contato" className="text-white hover:text-primary-color transition-colors">
            Contato
          </Link>
          <Link
            to={primaryButtonUrl}
            className="bg-primary-color hover:bg-primary-color/90 text-white py-2 px-4 rounded-md transition-colors"
          >
            {primaryButtonText}
          </Link>
        </nav>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white focus:outline-none"
          aria-label="Menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-secondary-color p-4 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 md:hidden`}>
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-white focus:outline-none"
            aria-label="Close Menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4">
          <Link to="/" className="text-white hover:text-primary-color transition-colors block" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/solucoes" className="text-white hover:text-primary-color transition-colors block" onClick={() => setIsMenuOpen(false)}>
            Soluções
          </Link>
          <Link to="/contato" className="text-white hover:text-primary-color transition-colors block" onClick={() => setIsMenuOpen(false)}>
            Contato
          </Link>
          <Link
            to={primaryButtonUrl}
            className="bg-primary-color hover:bg-primary-color/90 text-white py-2 px-4 rounded-md transition-colors block"
            onClick={() => setIsMenuOpen(false)}
          >
            {primaryButtonText}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
