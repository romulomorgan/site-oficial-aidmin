
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useSiteTexts } from '@/hooks/useSiteTexts';
import FooterNewsletter from './footer/FooterNewsletter';
import { applyCascadeAnimation } from '@/utils/animations';
import { fetchSiteTexts } from '@/utils/supabase/siteTexts';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/useIsMobile';

const Footer: React.FC = () => {
  const { siteTexts, isLoading } = useSiteTexts();
  const isMobile = useIsMobile();

  const [localTexts, setLocalTexts] = useState({
    footerEmail: '',
    footerPhone: '',
    footerLocation: '',
    companyName: 'IAdmin',
    footerAbout: 'Transformando empresas através da Inteligência Artificial.'
  });
  
  useEffect(() => {
    // Aplicar animações em cascata aos elementos do rodapé
    applyCascadeAnimation('.footer-animate', 0.1);
    
    // Garantir que os dados de contato sejam carregados diretamente do banco
    const loadFooterData = async () => {
      try {
        const texts = await fetchSiteTexts();
        setLocalTexts({
          footerEmail: texts.footerEmail as string || 'contato@iadmin.com.br',
          footerPhone: texts.footerPhoneNumber as string || '+55 (11) 99999-9999',
          footerLocation: texts.footerLocation as string || 'São Paulo, SP - Brasil',
          companyName: texts.companyName as string || 'IAdmin',
          footerAbout: texts.footerAbout as string || 'Transformando empresas através da Inteligência Artificial.'
        });
      } catch (error) {
        console.error('Erro ao carregar dados do rodapé:', error);
        toast.error("Não foi possível carregar os dados do rodapé");
      }
    };
    
    loadFooterData();

    // Adicionar classes de animação aos elementos do rodapé após carregar a página
    const footerElements = document.querySelectorAll('.footer-animate');
    footerElements.forEach((el, index) => {
      if (el instanceof HTMLElement) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
        el.style.transitionDelay = `${index * 0.1}s`;
      }
    });

    // Configurar observador de interseção para animações baseadas em scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          if (el instanceof HTMLElement) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            
            // Adicionar classes de hover apenas após a animação
            setTimeout(() => {
              if (el.classList.contains('hover-scale')) {
                el.classList.add('hover-scale-active');
              }
            }, 500);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    footerElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Funções para verificar se links de redes sociais estão configurados
  const hasFacebook = siteTexts.facebookActive !== false && siteTexts.facebookUrl;
  const hasTwitter = siteTexts.twitterActive !== false && siteTexts.twitterUrl;
  const hasInstagram = siteTexts.instagramActive !== false && siteTexts.instagramUrl;
  const hasLinkedin = siteTexts.linkedinActive !== false && siteTexts.linkedinUrl;
  
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (!siteTexts) {
    toast.error("Não foi possível carregar os dados do rodapé");
    return <div>Erro ao carregar dados do rodapé</div>;
  }

  return (
    <footer className="w-full py-10 px-5 bg-gradient-to-br from-[var(--secondary-color)] to-[var(--primary-color)] animate-on-scroll">
      <div className="max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Coluna Logo */}
          <div className="flex flex-col footer-animate fade-in">
            <Link to="/" className="text-2xl font-bold mb-4 text-white hover-scale">
              {siteTexts.siteTitle || localTexts.companyName}
            </Link>
            <p className="text-white/80 text-sm mb-6 animate-on-scroll fade-in">
              {siteTexts.footerDescription || localTexts.footerAbout}
            </p>
          </div>
          
          {/* Coluna Links Rápidos */}
          <div className="footer-animate fade-in">
            <h4 className="text-lg font-semibold mb-4 text-white">Links Rápidos</h4>
            <ul className="space-y-2">
              <li className="slide-up-on-scroll cascade-item">
                <Link to="/" className="text-white/80 hover:text-white transition-colors nav-link-animated">
                  Home
                </Link>
              </li>
              <li className="slide-up-on-scroll cascade-item">
                <Link to="/solucoes" className="text-white/80 hover:text-white transition-colors nav-link-animated">
                  Soluções
                </Link>
              </li>
              <li className="slide-up-on-scroll cascade-item">
                <Link to="/contato" className="text-white/80 hover:text-white transition-colors nav-link-animated">
                  Contato
                </Link>
              </li>
              <li className="slide-up-on-scroll cascade-item">
                <Link to="/admin" className="text-white/80 hover:text-white transition-colors nav-link-animated">
                  Área Admin
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Coluna Contato */}
          <div className="footer-animate fade-in">
            <h4 className="text-lg font-semibold mb-4 text-white">Contato</h4>
            <ul className="space-y-2">
              <li className="text-white/80 slide-up-on-scroll cascade-item hover-scale">
                {siteTexts.footerEmail || localTexts.footerEmail}
              </li>
              <li className="text-white/80 slide-up-on-scroll cascade-item hover-scale">
                {siteTexts.footerPhoneNumber || localTexts.footerPhone}
              </li>
              <li className="text-white/80 slide-up-on-scroll cascade-item hover-scale">
                {siteTexts.footerLocation || localTexts.footerLocation}
              </li>
            </ul>
          </div>
          
          {/* Coluna Newsletter */}
          <div className="footer-animate fade-in">
            <h4 className="text-lg font-semibold mb-4 text-white">Newsletter</h4>
            <FooterNewsletter />
          </div>
        </div>
        
        {/* Redes Sociais */}
        <div className="flex justify-center space-x-4 mt-8 pt-6 border-t border-white/20 footer-animate fade-in">
          {hasFacebook && (
            <a href={siteTexts.facebookUrl as string} className="text-white/80 hover:text-white transition-colors hover-scale" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} className="animate-on-scroll zoom-in" />
            </a>
          )}
          {hasTwitter && (
            <a href={siteTexts.twitterUrl as string} className="text-white/80 hover:text-white transition-colors hover-scale" target="_blank" rel="noopener noreferrer">
              <Twitter size={20} className="animate-on-scroll zoom-in" />
            </a>
          )}
          {hasInstagram && (
            <a href={siteTexts.instagramUrl as string} className="text-white/80 hover:text-white transition-colors hover-scale" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} className="animate-on-scroll zoom-in" />
            </a>
          )}
          {hasLinkedin && (
            <a href={siteTexts.linkedinUrl as string} className="text-white/80 hover:text-white transition-colors hover-scale" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} className="animate-on-scroll zoom-in" />
            </a>
          )}
        </div>
        
        <div className="mt-6 text-center text-white/70 footer-animate fade-in">
          <p className="animate-on-scroll fade-on-scroll">
            {siteTexts.copyrightText || '© 2025 IAdmin. Todos os direitos reservados.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
