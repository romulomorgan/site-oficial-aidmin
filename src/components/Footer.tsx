
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getSiteTexts } from '@/utils/localStorage';

const Footer: React.FC = () => {
  const [copyrightText, setCopyrightText] = useState('© 2025 IAdmin. Todos os direitos reservados.');
  const [showNewsletter, setShowNewsletter] = useState(true);
  const [siteTitle, setSiteTitle] = useState('IAdmin');
  const [contactEmail, setContactEmail] = useState('contato@iadmin.com.br');
  const [contactPhone, setContactPhone] = useState('(11) 99999-9999');
  const [contactAddress, setContactAddress] = useState('São Paulo, SP');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const siteTexts = getSiteTexts();
    
    if (siteTexts.copyrightText) {
      setCopyrightText(siteTexts.copyrightText);
    }
    
    if (siteTexts.showNewsletter !== undefined) {
      setShowNewsletter(siteTexts.showNewsletter === "true" || siteTexts.showNewsletter === true);
    }
    
    if (siteTexts.siteTitle) {
      setSiteTitle(siteTexts.siteTitle);
    }
    
    if (siteTexts.contactEmail) {
      setContactEmail(siteTexts.contactEmail);
    }
    
    if (siteTexts.contactPhone) {
      setContactPhone(siteTexts.contactPhone);
    }
    
    if (siteTexts.contactAddress) {
      setContactAddress(siteTexts.contactAddress);
    }
    
    if (siteTexts.logoUrl) {
      setLogoUrl(siteTexts.logoUrl);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para assinar a newsletter
  };

  return (
    <footer className="bg-secondary-color text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo e Sobre */}
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
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
            <p className="text-gray-300 mb-6">
              Soluções inteligentes para automatizar processos e melhorar a eficiência operacional do seu negócio.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">Links Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary-color transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/solucoes" className="text-gray-300 hover:text-primary-color transition-colors">
                  Soluções
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-primary-color transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">Contato</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary-color" />
                <span className="text-gray-300">{contactPhone}</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary-color" />
                <a href={`mailto:${contactEmail}`} className="text-gray-300 hover:text-primary-color transition-colors">
                  {contactEmail}
                </a>
              </li>
              <li className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-primary-color" />
                <span className="text-gray-300">{contactAddress}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          {showNewsletter && (
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-6 text-white">Newsletter</h3>
              <p className="text-gray-300 mb-4">
                Receba as últimas novidades e atualizações.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary-color"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-primary-color hover:bg-primary-color/90 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Inscrever-se
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
