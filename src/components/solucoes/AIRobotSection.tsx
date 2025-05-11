
import React from 'react';

interface AIRobotSectionProps {
  solucoesAITitle: string;
  solucoesAISubtitle: string;
  solucoesAIImage: string;
  solucoesAIDescription1: string;
  solucoesAIDescription2: string;
  solucoesAIDescription3: string;
  textColor: string;
  primaryColor: string;
}

export const AIRobotSection: React.FC<AIRobotSectionProps> = ({
  solucoesAITitle,
  solucoesAISubtitle,
  solucoesAIImage,
  solucoesAIDescription1,
  solucoesAIDescription2,
  solucoesAIDescription3,
  textColor,
  primaryColor,
}) => {
  return (
    <div className="mb-16">
      <h2 className="text-lg font-medium uppercase mb-4" style={{color: primaryColor}}>
        {solucoesAISubtitle}
      </h2>
      <h3 className="text-[46px] font-semibold mb-8" style={{color: textColor}}>
        {solucoesAITitle}
      </h3>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-[400px] relative hover-scale">
          <div className="bg-pink-50 rounded-full aspect-square flex items-center justify-center">
            <img 
              src={solucoesAIImage}
              alt="AI Robot" 
              className="w-2/3 object-contain"
              onError={(e) => {
                console.error("Erro ao carregar imagem do robô:", e);
                e.currentTarget.src = '/lovable-uploads/b8b59193-2526-4f01-bce3-4af38189f726.png';
              }}
            />
          </div>
        </div>

        <div className="flex-1">
          <p className="leading-relaxed mb-4" style={{color: textColor}}>
            {solucoesAIDescription1}
          </p>
          
          <p className="leading-relaxed mb-4" style={{color: textColor}}>
            {solucoesAIDescription2}
          </p>
          
          <p className="leading-relaxed mb-4" style={{color: textColor}}>
            {solucoesAIDescription3}
          </p>
        </div>
      </div>
    </div>
  );
};
