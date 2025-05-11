
import React from 'react';
import { NavigationBar } from '@/components/ui/NavigationBar';

interface HeroSectionProps {
  solucoesTitle: string;
  solucoesDescription: string;
  primaryColor: string;
  secondaryColor: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  solucoesTitle,
  solucoesDescription,
  primaryColor,
  secondaryColor,
}) => {
  return (
    <section className="relative w-full animate-on-scroll fade-on-scroll" 
      style={{
        background: `linear-gradient(to bottom right, ${secondaryColor}, ${primaryColor})`,
        padding: '60px 20px'
      }}
    >
      {/* Navigation */}
      <NavigationBar />
      
      <div className="relative z-10 max-w-[1140px] mx-auto mt-16 text-white">
        <h1 className="text-white text-[56px] font-semibold leading-tight mb-6 max-md:text-[40px] slide-left animate-on-scroll">
          {solucoesTitle}
        </h1>
        <p className="text-white/90 max-w-[600px] text-lg leading-relaxed slide-left animate-on-scroll" style={{animationDelay: '0.2s'}}>
          {solucoesDescription}
        </p>
      </div>
    </section>
  );
};
