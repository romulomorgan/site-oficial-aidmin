
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { EmbedConfig } from '@/utils/supabase/types';
import EmbedHeader from './EmbedHeader';
import { ScrollArea } from '@/components/ui/scroll-area';

interface EmbedDesktopProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  embedConfig: EmbedConfig;
  toggleEmbed: () => void;
  isMaximized: boolean;
  toggleMaximize: () => void;
}

const EmbedDesktop: React.FC<EmbedDesktopProps> = ({
  isOpen,
  setIsOpen,
  embedConfig,
  toggleEmbed,
  isMaximized,
  toggleMaximize
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
        className={`p-0 border-0 shadow-2xl ${isMaximized ? 'w-5/6 h-5/6 max-w-none' : 'w-[400px] h-[600px] max-w-none'}`}
        style={{ 
          position: 'fixed',
          [embedConfig.position === 'left' ? 'left' : 'right']: '20px', // Posicionado exatamente ao lado do botão
          transform: 'none',
          bottom: '80px', // Alinhado com o botão
          top: 'auto',
          display: 'flex',
          flexDirection: 'column',
          ...(isMaximized && {
            left: '50%',
            right: 'auto',
            transform: 'translateX(-50%)',
            bottom: '10%'
          })
        }}
      >
        <DialogTitle className="sr-only">Chat Dialog</DialogTitle>
        <div className="flex flex-col h-full overflow-hidden">
          <EmbedHeader 
            toggleEmbed={toggleEmbed}
            toggleMaximize={toggleMaximize}
            isMaximized={isMaximized}
            isDesktop={true}
          />
          <ScrollArea className="flex-1 embed-container">
            <div 
              dangerouslySetInnerHTML={{ __html: embedConfig.code }} 
              className="w-full h-full embed-content"
            />
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmbedDesktop;
