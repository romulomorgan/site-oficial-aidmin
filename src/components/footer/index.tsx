
import React, { useState, useEffect } from 'react';
import { fetchSiteTexts } from '@/utils/supabaseClient';
import FooterLogo from './FooterLogo';
import FooterLinks from './FooterLinks';
import FooterContact from './FooterContact';
import FooterNewsletter from './FooterNewsletter';
import FooterSocial from './FooterSocial';

const Footer = () => {
  const [footerData, setFooterData] = useState({
    companyName: 'iAdmin',
    footerAbout: 'Transforme seu atendimento com soluções inteligentes de IA, automatize respostas e gerencie seus clientes com eficiência.',
    footerPhoneNumber: '+55 (11) 99999-9999',
    footerEmail: 'contato@iadmin.com.br',
    copyrightText: '© 2023 iAdmin. Todos os direitos reservados.',
    logoUrl: '/lovable-uploads/3a83de09-ec2f-4458-96fa-750a22731ea4.png',
    footerLogoUrl: '',
    footerLocation: 'São Paulo, SP - Brasil'
  });
  const [socialLinks, setSocialLinks] = useState({
    facebookUrl: '#',
    instagramUrl: '#',
    twitterUrl: '#',
    facebookActive: true,
    instagramActive: true,
    twitterActive: true
  });
  
  useEffect(() => {
    // Carregar dados do footer do banco de dados
    const loadFooterData = async () => {
      try {
        const siteTexts = await fetchSiteTexts();
        
        // Atualizar dados do footer
        setFooterData({
          companyName: siteTexts.companyName?.toString() || 'iAdmin',
          footerAbout: siteTexts.footerAbout?.toString() || 'Transforme seu atendimento com soluções inteligentes de IA, automatize respostas e gerencie seus clientes com eficiência.',
          footerPhoneNumber: siteTexts.footerPhoneNumber?.toString() || '+55 (11) 99999-9999',
          footerEmail: siteTexts.footerEmail?.toString() || 'contato@iadmin.com.br',
          copyrightText: siteTexts.copyrightText?.toString() || '© 2023 iAdmin. Todos os direitos reservados.',
          logoUrl: siteTexts.logoUrl?.toString() || '/lovable-uploads/3a83de09-ec2f-4458-96fa-750a22731ea4.png',
          footerLogoUrl: siteTexts.footerLogoUrl?.toString() || '',
          footerLocation: siteTexts.footerLocation?.toString() || 'São Paulo, SP - Brasil'
        });
        
        // Atualizar links de redes sociais
        setSocialLinks({
          facebookUrl: siteTexts.facebookUrl?.toString() || '#',
          instagramUrl: siteTexts.instagramUrl?.toString() || '#',
          twitterUrl: siteTexts.twitterUrl?.toString() || '#',
          facebookActive: siteTexts.facebookActive === false ? false : true,
          instagramActive: siteTexts.instagramActive === false ? false : true,
          twitterActive: siteTexts.twitterActive === false ? false : true
        });
      } catch (error) {
        console.error('Erro ao carregar dados do rodapé:', error);
      }
    };
    
    loadFooterData();
  }, []);

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo e Sobre */}
          <FooterLogo 
            logoUrl={footerData.footerLogoUrl || footerData.logoUrl}
            companyName={footerData.companyName}
            about={footerData.footerAbout}
          />

          {/* Links Rápidos */}
          <FooterLinks />

          {/* Contato */}
          <FooterContact 
            email={footerData.footerEmail}
            phone={footerData.footerPhoneNumber}
            location={footerData.footerLocation}
          />

          {/* Newsletter */}
          <FooterNewsletter />
        </div>

        {/* Rodapé */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">{footerData.copyrightText}</p>
            <FooterSocial 
              facebookUrl={socialLinks.facebookUrl}
              instagramUrl={socialLinks.instagramUrl}
              twitterUrl={socialLinks.twitterUrl}
              facebookActive={socialLinks.facebookActive}
              instagramActive={socialLinks.instagramActive}
              twitterActive={socialLinks.twitterActive}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
