import React from 'react';
import { Button } from '../ui/Button';
import { NavigationBar } from '../ui/NavigationBar';

export const Header: React.FC = () => {
  return (
    <header className="items-stretch relative flex min-h-[644px] w-full gap-[57.61px] bg-[#220B13] pt-[158px] pb-[120px] px-[390px] max-md:max-w-full max-md:px-5 max-md:py-[100px]">
      <NavigationBar />
      
      <div className="absolute z-0 flex min-w-60 min-h-[644px] overflow-hidden w-[1920px] max-w-[1920px] inset-0">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/c8fe9a8f9afcf65b0a3ddfc7715f06d790312f70?placeholderIfAbsent=true"
          alt="Background pattern"
          className="aspect-[2.99] object-contain w-[1920px] min-w-60"
        />
      </div>

      <div className="max-w-[524.4px] z-0 min-w-60 w-[524px] max-md:max-w-full">
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
          <Button variant="primary" icon="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/a1248679ed61fe6b54e693d50e9e1c968633d2bd?placeholderIfAbsent=true">
            Soluções de AI
          </Button>
          <Button variant="secondary">
            Contrate uma AI Poderosa!
          </Button>
        </div>
      </div>

      <div className="relative z-0 min-w-60 w-[558px] my-auto rounded-lg max-md:max-w-full">
        <div className="relative aspect-video w-full">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/4548969f0251657af1cce38a75ca74e2a9bab490?placeholderIfAbsent=true"
            alt="Demo video thumbnail"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-white/20 backdrop-blur-sm rounded-full p-4">
              <img src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/91494e930bb0aaf5b5e948f35b371af07ffce75a?placeholderIfAbsent=true" alt="Play" className="w-10 h-10" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
