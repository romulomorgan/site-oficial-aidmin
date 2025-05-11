
import React from 'react';

interface SolucaoItemProps {
  titulo: string;
  descricao: string;
  imagem: string;
  layout: string;
  textColor: string;
}

export const SolucaoItem: React.FC<SolucaoItemProps> = ({
  titulo,
  descricao,
  imagem,
  layout,
  textColor,
}) => {
  if (!titulo) return null;
  
  const isImageLeft = layout === 'image-left';
  
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-semibold mb-6" style={{color: textColor}}>
        {titulo}
      </h2>
      
      <div className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
        {imagem && (
          <div className="w-full md:w-1/3">
            <img 
              src={imagem} 
              alt={titulo}
              className="w-full rounded-lg object-cover"
              onError={(e) => {
                console.error(`Erro ao carregar imagem da solução:`, e);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
        )}
        
        <div className={`${imagem ? 'md:w-2/3' : 'w-full'}`}>
          <p className="leading-relaxed" style={{color: textColor}}>
            {descricao}
          </p>
        </div>
      </div>
    </div>
  );
};
