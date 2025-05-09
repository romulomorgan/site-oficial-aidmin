
import React, { useEffect, useState } from 'react';
import { getSiteTexts } from '@/utils/localStorage';

const EmbedComponent: React.FC = () => {
  const [embedCode, setEmbedCode] = useState<string>('');
  const [embedPosition, setEmbedPosition] = useState<'left' | 'right'>('right');
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    // Carregar as configurações do embed do localStorage
    const siteTexts = getSiteTexts();
    if (siteTexts.embedCode) {
      setEmbedCode(siteTexts.embedCode as string);
    }
    
    if (siteTexts.embedPosition) {
      setEmbedPosition(siteTexts.embedPosition as 'left' | 'right');
    }
    
    setIsActive(!!siteTexts.embedActive);
  }, []);

  // Se não estiver ativo ou não houver código, não renderiza nada
  if (!isActive || !embedCode) {
    return null;
  }

  // Cria um contêiner para o embed com o posicionamento correto
  return (
    <div 
      className={`fixed bottom-4 ${embedPosition === 'left' ? 'left-4' : 'right-4'} z-50`}
      dangerouslySetInnerHTML={{ __html: embedCode }}
    />
  );
};

export default EmbedComponent;
