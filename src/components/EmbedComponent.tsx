import React, { useState, useEffect } from 'react';
import { fetchEmbedConfig } from '@/utils/supabase/embedConfig';
import { fetchSiteTexts } from '@/utils/supabaseClient';
import { EmbedConfig } from '@/utils/supabase/types';
import { useIsMobile } from '@/hooks/useIsMobile';
import EmbedButton from './embed/EmbedButton';
import EmbedMobile from './embed/EmbedMobile';
import EmbedDesktop from './embed/EmbedDesktop';
import '@/styles/embed.css';

const EmbedComponent: React.FC = () => {
  const [embedConfig, setEmbedConfig] = useState<EmbedConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonColor, setButtonColor] = useState("#FF196E");
  const [buttonIcon, setButtonIcon] = useState("chat");
  const [isVisible, setIsVisible] = useState(true);
  const [isMaximized, setIsMaximized] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const loadEmbedConfig = async () => {
      try {
        console.log('Carregando configuração de embed...');
        const config = await fetchEmbedConfig();
        console.log('Configuração de embed carregada:', config);
        
        if (config) {
          setEmbedConfig(config);
        } else {
          console.warn('Nenhuma configuração de embed encontrada');
        }
        
        // Carregar configurações extras do botão
        const siteTexts = await fetchSiteTexts();
        if (siteTexts.embedButtonColor) {
          setButtonColor(siteTexts.embedButtonColor as string);
        }
        if (siteTexts.embedButtonIcon) {
          setButtonIcon(siteTexts.embedButtonIcon as string);
        }
      } catch (error) {
        console.error('Erro ao carregar configuração de embed:', error);
      }
    };
    
    loadEmbedConfig();

    // Expor função para abrir o chat a partir de outros componentes
    window.openEmbedChat = () => {
      console.log('openEmbedChat chamado externamente');
      setIsOpen(true);
    };

    return () => {
      // Remover função global ao desmontar
      delete window.openEmbedChat;
    };
  }, []);

  // Se não tiver configuração ou não estiver ativo, não renderiza
  if (!embedConfig || !embedConfig.isActive) {
    return null;
  }

  const toggleEmbed = () => {
    console.log('Alterando estado do embed:', !isOpen);
    setIsOpen(!isOpen);
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  // Renderizar componente apropriado com base no dispositivo
  return (
    <>
      {isVisible && (
        <>
          {!isOpen && (
            <EmbedButton
              onClick={toggleEmbed}
              position={embedConfig.position}
              buttonColor={buttonColor}
              buttonIcon={buttonIcon}
            />
          )}

          {isMobile ? (
            <EmbedMobile
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              embedConfig={embedConfig}
              toggleEmbed={toggleEmbed}
            />
          ) : (
            <EmbedDesktop
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              embedConfig={embedConfig}
              toggleEmbed={toggleEmbed}
              isMaximized={isMaximized}
              toggleMaximize={toggleMaximize}
            />
          )}
        </>
      )}
    </>
  );
};

// Declaração global para TypeScript reconhecer a função
declare global {
  interface Window {
    openEmbedChat?: () => void;
  }
}

export default EmbedComponent;
