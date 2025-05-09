
import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Breakpoint para considerar como mobile
    };

    // Verifica o tamanho da tela inicialmente
    checkIsMobile();

    // Adiciona um event listener para detectar mudanças de tamanho
    window.addEventListener('resize', checkIsMobile);

    // Limpa o event listener quando o componente é desmontado
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return isMobile;
};
