
import React from 'react';
import { X } from 'lucide-react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { EmbedConfig } from '@/utils/supabase/types';

interface EmbedMobileProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  embedConfig: EmbedConfig;
  toggleEmbed: () => void;
}

const EmbedMobile: React.FC<EmbedMobileProps> = ({ 
  isOpen, 
  setIsOpen, 
  embedConfig,
  toggleEmbed
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="h-[85vh] p-0 rounded-t-xl">
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
          <div className="flex-1 overflow-hidden embed-content-container">
            <div dangerouslySetInnerHTML={{ __html: embedConfig.code }} className="h-full embed-iframe-wrapper" />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EmbedMobile;
