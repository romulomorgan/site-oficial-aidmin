
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { fetchEmbedConfig } from '@/utils/supabase/embedConfig';
import { fetchSiteTexts } from '@/utils/supabaseClient';
import { EmbedConfig } from '@/utils/supabase/types';
import { renderEmbedButtonIcon } from '@/utils/icons/embedButtonIcons';

const EmbedComponent: React.FC = () => {
  const [embedConfig, setEmbedConfig] = useState<EmbedConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonColor, setButtonColor] = useState("#FF196E");
  const [buttonIcon, setButtonIcon] = useState("chat");
  const [isVisible, setIsVisible] = useState(true);
  
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

  return (
    <div className={`fixed ${embedConfig.position === 'left' ? 'left-0' : 'right-0'} bottom-20 z-50`}>
      {isVisible && (
        <>
          {isOpen ? (
            <div className="bg-white shadow-lg rounded-lg p-4 m-4 max-w-md animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-lg">Suporte</h3>
                <button 
                  onClick={toggleEmbed}
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Fechar"
                >
                  <X size={20} />
                </button>
              </div>
              <div dangerouslySetInnerHTML={{ __html: embedConfig.code }} />
            </div>
          ) : (
            <button
              onClick={toggleEmbed}
              style={{ backgroundColor: buttonColor }}
              className="text-white p-3 rounded-full shadow-lg m-4 hover:scale-110 transition-all pulse-btn"
              aria-label="Abrir suporte"
              id="embed-chat-button"
            >
              {renderEmbedButtonIcon(buttonIcon)}
            </button>
          )}
        </>
      )}
    </div>
  );
};

// Declaração global para TypeScript reconhecer a função
declare global {
  interface Window {
    openEmbedChat?: () => void;
  }
}

export default EmbedComponent;
