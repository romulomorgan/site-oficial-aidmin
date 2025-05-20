
import React, { useState, useEffect } from 'react';
import { X, Maximize } from 'lucide-react';
import { fetchEmbedConfig } from '@/utils/supabase/embedConfig';
import { fetchSiteTexts } from '@/utils/supabaseClient';
import { EmbedConfig } from '@/utils/supabase/types';
import { renderEmbedButtonIcon } from '@/utils/icons/embedButtonIcons';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { useIsMobile } from '@/hooks/useIsMobile';

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

  // Componente para a versão móvel (usando Drawer)
  if (isMobile) {
    return (
      <>
        {isVisible && (
          <>
            {!isOpen && (
              <button
                onClick={toggleEmbed}
                style={{ backgroundColor: buttonColor }}
                className="fixed text-white p-3 rounded-full shadow-lg m-4 hover:scale-110 transition-all pulse-btn z-50"
                aria-label="Abrir suporte"
                id="embed-chat-button"
                style={{ 
                  backgroundColor: buttonColor,
                  [embedConfig.position === 'left' ? 'left' : 'right']: '20px',
                  bottom: '20px'
                }}
              >
                {renderEmbedButtonIcon(buttonIcon)}
              </button>
            )}

            <Drawer open={isOpen} onOpenChange={setIsOpen}>
              <DrawerContent className="h-[80vh] p-0 rounded-t-xl">
                <div className="flex flex-col h-full">
                  <div className="bg-gray-800 text-white py-3 px-4 flex items-center justify-between rounded-t-xl">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden">
                        <img 
                          src="/lovable-uploads/c739c386-c6c9-4bb8-9996-98b3a3161fad.png" 
                          alt="Suporte"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium">Suporte</h3>
                    </div>
                    <button 
                      onClick={toggleEmbed}
                      className="text-white hover:text-gray-300"
                      aria-label="Fechar"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div dangerouslySetInnerHTML={{ __html: embedConfig.code }} className="h-full" />
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </>
    );
  }

  // Componente para desktop
  return (
    <>
      {isVisible && (
        <>
          {!isOpen && (
            <button
              onClick={toggleEmbed}
              className="fixed text-white p-3 rounded-full shadow-lg m-4 hover:scale-110 transition-all pulse-btn z-50"
              aria-label="Abrir suporte"
              id="embed-chat-button"
              style={{ 
                backgroundColor: buttonColor,
                [embedConfig.position === 'left' ? 'left' : 'right']: '20px',
                bottom: '20px'
              }}
            >
              {renderEmbedButtonIcon(buttonIcon)}
            </button>
          )}

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent 
              className={`p-0 border-0 shadow-2xl ${isMaximized ? 'w-5/6 h-5/6 max-w-none' : 'w-[400px] h-[500px] max-w-none'}`}
              style={{ 
                position: 'fixed',
                [embedConfig.position === 'left' ? 'left' : 'right']: isMaximized ? '50%' : '30px',
                transform: isMaximized ? 'translateX(-50%)' : 'none',
                bottom: isMaximized ? '10%' : '120px',
                top: 'auto'
              }}
            >
              <div className="flex flex-col h-full">
                <div className="bg-gray-800 text-white py-3 px-4 flex items-center justify-between rounded-t-md">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden">
                      <img 
                        src="/lovable-uploads/c739c386-c6c9-4bb8-9996-98b3a3161fad.png" 
                        alt="Suporte"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium">Suporte</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={toggleMaximize} 
                      className="text-white hover:text-gray-300"
                      aria-label="Maximizar"
                    >
                      <Maximize size={18} />
                    </button>
                    <button 
                      onClick={toggleEmbed}
                      className="text-white hover:text-gray-300"
                      aria-label="Fechar"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <div dangerouslySetInnerHTML={{ __html: embedConfig.code }} className="h-full" />
                </div>
              </div>
            </DialogContent>
          </Dialog>
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
