
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomButton } from '../ui/CustomButton';
import { NavigationBar } from '../ui/NavigationBar';
import { getSiteTexts } from '@/utils/localStorage';

export const Header: React.FC = () => {
  const [siteTitle, setSiteTitle] = useState('IAdmin');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    // Carrega o título do site e a URL do logo do localStorage
    const siteTexts = getSiteTexts();
    if (siteTexts.siteTitle) {
      setSiteTitle(siteTexts.siteTitle);
      // Também atualizar o título da página
      document.title = siteTexts.siteTitle;
    }
    if (siteTexts.logoUrl) {
      setLogoUrl(siteTexts.logoUrl);
    }
  }, []);

  return (
    <header className="items-stretch relative flex min-h-[644px] w-full gap-[57.61px] bg-gradient-to-br from-[#2D0A16] to-[#FF196E] pt-[158px] pb-[120px] px-5 lg:px-[390px] max-md:max-w-full max-md:py-[100px]">
      <NavigationBar />
      
      <div className="absolute z-0 inset-0 bg-[url('/lovable-uploads/9f855b72-1dc3-430d-a32c-5f078ffca423.png')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>

      <div className="max-w-[524.4px] z-10 min-w-60 w-full lg:w-[524px] max-md:max-w-full">
        <h1 className="text-[56px] font-semibold leading-[73px] z-10 text-white pr-[104px] pb-px max-md:max-w-full max-md:text-[40px] max-md:leading-[58px] max-md:pr-5">
          Destrave a<br />
          fronteira da<br />
          produtividade.
        </h1>
        
        <p className="text-white text-lg font-normal leading-[27.9px] mt-6">
          Exploramos os limites da <strong>AI Generativa</strong> para criar novos
          produtos, avenidas de receitas e gerar eficiência operacional.
        </p>

        <div className="flex w-full items-stretch gap-[15px] flex-wrap mt-[50px] max-md:max-w-full max-md:mt-10">
          <Link to="/contato">
            <CustomButton variant="primary" icon="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/a1248679ed61fe6b54e693d50e9e1c968633d2bd?placeholderIfAbsent=true">
              Fale Conosco
            </CustomButton>
          </Link>
          <Link to="/contato">
            <CustomButton variant="secondary">
              Contrate a IAdmin!
            </CustomButton>
          </Link>
        </div>
      </div>

      <div className="relative z-10 min-w-60 w-[558px] my-auto rounded-lg max-md:max-w-full max-md:mt-10">
        <div className="relative aspect-video w-full">
          <img
            src="/lovable-uploads/9f855b72-1dc3-430d-a32c-5f078ffca423.png"
            alt="Demo video thumbnail"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <a 
              href="https://youtu.be/fWzFvNAkHuQ" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all"
            >
              <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/91494e930bb0aaf5b5e948f35b371af07ffce75a?placeholderIfAbsent=true" alt="Play" className="w-10 h-10" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
