
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useSiteTexts } from '@/hooks/useSiteTexts';
import FooterNewsletter from './footer/FooterNewsletter';

const Footer = () => {
  const { siteTexts } = useSiteTexts();
  
  return (
    <footer className="w-full py-10 px-5 bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)]">
      <div className="max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white">
          {/* Coluna Logo */}
          <div className="flex flex-col">
            <Link to="/" className="text-2xl font-bold mb-4 text-white">
              {siteTexts.siteTitle || 'IAdmin'}
            </Link>
            <p className="text-white/80 text-sm mb-6">
              {siteTexts.footerDescription || 'Transformando empresas através da Inteligência Artificial.'}
            </p>
          </div>
          
          {/* Coluna Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/solucoes" className="text-white/80 hover:text-white transition-colors">
                  Soluções
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-white/80 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-white/80 hover:text-white transition-colors">
                  Área Admin
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contato</h4>
            <ul className="space-y-2">
              <li className="text-white/80">
                {siteTexts.footerEmail || 'contato@iadmin.com.br'}
              </li>
              <li className="text-white/80">
                {siteTexts.footerPhone || '+55 (11) 99999-9999'}
              </li>
              <li className="text-white/80">
                {siteTexts.footerAddress || 'São Paulo, SP - Brasil'}
              </li>
            </ul>
          </div>
          
          {/* Coluna Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Newsletter</h4>
            <FooterNewsletter />
          </div>
        </div>
        
        {/* Redes Sociais */}
        <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-white/20">
          <a href={siteTexts.facebookUrl || '#'} className="text-white/80 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            <Facebook size={20} />
          </a>
          <a href={siteTexts.twitterUrl || '#'} className="text-white/80 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            <Twitter size={20} />
          </a>
          <a href={siteTexts.instagramUrl || '#'} className="text-white/80 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            <Instagram size={20} />
          </a>
          <a href={siteTexts.linkedinUrl || '#'} className="text-white/80 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
            <Linkedin size={20} />
          </a>
        </div>
        
        <div className="mt-6 text-center text-white/70">
          <p>
            {siteTexts.copyrightText || '© 2025 IAdmin. Todos os direitos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
