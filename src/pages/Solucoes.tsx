
import React from 'react';
import { useSiteTexts } from '@/hooks/useSiteTexts';
import { HeroSection } from '@/components/solucoes/HeroSection';
import { AIRobotSection } from '@/components/solucoes/AIRobotSection';
import { SolucaoItem } from '@/components/solucoes/SolucaoItem';
import { ContactSection } from '@/components/solucoes/ContactSection';

export default function Solucoes() {
  const { siteTexts, themeColors, isLoading } = useSiteTexts();
  
  return (
    <main className="flex flex-col items-center bg-white">
      {/* Hero Section with Background Gradient */}
      <HeroSection 
        solucoesTitle={siteTexts.solucoesTitle}
        solucoesDescription={siteTexts.solucoesDescription}
        primaryColor={themeColors.primaryColor}
        secondaryColor={themeColors.secondaryColor}
      />

      {/* Main Content */}
      <section className="w-full max-w-[1140px] px-5 py-16 animate-fade-in" style={{animationDelay: '0.2s'}}>
        <AIRobotSection 
          solucoesAITitle={siteTexts.solucoesAITitle}
          solucoesAISubtitle={siteTexts.solucoesAISubtitle}
          solucoesAIImage={siteTexts.solucoesAIImage}
          solucoesAIDescription1={siteTexts.solucoesAIDescription1}
          solucoesAIDescription2={siteTexts.solucoesAIDescription2}
          solucoesAIDescription3={siteTexts.solucoesAIDescription3}
          textColor={themeColors.textColor}
          primaryColor={themeColors.primaryColor}
        />
        
        {/* Soluções específicas - baseado na quantidade e dados do banco */}
        {Array.from({ length: parseInt(siteTexts.solucoesCount) || 0 }).map((_, idx) => {
          const index = idx + 1;
          return (
            <SolucaoItem
              key={`solucao-${index}`}
              titulo={siteTexts[`solucao${index}Title` as keyof typeof siteTexts] as string}
              descricao={siteTexts[`solucao${index}Description` as keyof typeof siteTexts] as string}
              imagem={siteTexts[`solucao${index}Image` as keyof typeof siteTexts] as string}
              layout={siteTexts[`solucao${index}Layout` as keyof typeof siteTexts] as string}
              textColor={themeColors.textColor}
            />
          );
        })}
      </section>

      {/* Contact Section */}
      <ContactSection 
        primaryColor={themeColors.primaryColor}
        secondaryColor={themeColors.secondaryColor}
      />
    </main>
  );
}
