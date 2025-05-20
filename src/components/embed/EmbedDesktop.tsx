
import React from 'react';
import { X, Maximize, Minimize } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { EmbedConfig } from '@/utils/supabase/types';

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
                aria-label={isMaximized ? "Minimizar" : "Maximizar"}
              >
                {isMaximized ? <Minimize size={18} /> : <Maximize size={18} />}
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
          <div className="flex-1 overflow-hidden embed-content-container">
            <div dangerouslySetInnerHTML={{ __html: embedConfig.code }} className="h-full embed-iframe-wrapper" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmbedDesktop;
