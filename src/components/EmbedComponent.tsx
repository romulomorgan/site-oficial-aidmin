
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { fetchEmbedConfig } from '@/utils/supabase/embedConfig';
import { fetchSiteTexts } from '@/utils/supabaseClient';
import { EmbedConfig } from '@/utils/supabase/types';

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

  const renderButtonIcon = () => {
    switch (buttonIcon) {
      case 'chat':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
      case 'help':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'message':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        );
      case 'phone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
    }
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
              {renderButtonIcon()}
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
