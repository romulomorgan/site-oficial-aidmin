
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { EmbedConfig } from '@/utils/supabase/types';
import EmbedHeader from './EmbedHeader';

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
          [embedConfig.position === 'left' ? 'left' : 'right']: isMaximized ? '50%' : '30px',
          transform: isMaximized ? 'translateX(-50%)' : 'none',
          bottom: isMaximized ? '10%' : '120px',
          top: 'auto'
        }}
      >
        <div className="flex flex-col h-full">
          <EmbedHeader 
            toggleEmbed={toggleEmbed}
            toggleMaximize={toggleMaximize}
            isMaximized={isMaximized}
            isDesktop={true}
          />
          <div className="flex-1 overflow-hidden embed-content-container">
            <div dangerouslySetInnerHTML={{ __html: embedConfig.code }} className="h-full embed-iframe-wrapper" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmbedDesktop;
