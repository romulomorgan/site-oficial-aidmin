
import React from 'react';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { EmbedConfig } from '@/utils/supabase/types';
import EmbedHeader from './EmbedHeader';

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
        <div className="flex flex-col h-full overflow-hidden">
          <EmbedHeader 
            toggleEmbed={toggleEmbed} 
            isDesktop={false}
          />
          <div className="flex-1 overflow-hidden embed-container">
            <div 
              dangerouslySetInnerHTML={{ __html: embedConfig.code }} 
              className="w-full h-full embed-content"
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EmbedMobile;
