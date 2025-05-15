
import React from 'react';
import { EmbedActivation } from '@/components/admin/embed/EmbedActivation';
import { EmbedCodeEditor } from '@/components/admin/embed/EmbedCodeEditor';
import { EmbedPositionSelector } from '@/components/admin/embed/EmbedPositionSelector';
import { EmbedButtonConfig } from '@/components/admin/embed/EmbedButtonConfig';
import { EmbedPreview } from '@/components/admin/embed/EmbedPreview';

interface EmbedTabProps {
  embedCode: string;
  setEmbedCode: (code: string) => void;
  embedPosition: 'left' | 'right';
  setEmbedPosition: (position: 'left' | 'right') => void;
  embedActive: boolean;
  setEmbedActive: (active: boolean) => void;
  embedButtonColor: string;
  setEmbedButtonColor: (color: string) => void;
  embedButtonIcon: string;
  setEmbedButtonIcon: (icon: string) => void;
}

export const EmbedTab: React.FC<EmbedTabProps> = ({
  embedCode,
  setEmbedCode,
  embedPosition,
  setEmbedPosition,
  embedActive,
  setEmbedActive,
  embedButtonColor,
  setEmbedButtonColor,
  embedButtonIcon,
  setEmbedButtonIcon
}) => {
  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-4">Código Embed & Botão Flutuante</h2>
      <p className="text-gray-500 mb-4">
        Configure o código embed (chatbot, widget, etc) e personalize o botão flutuante que o abre.
      </p>
      
      <div className="space-y-6">
        <EmbedActivation 
          embedActive={embedActive} 
          setEmbedActive={setEmbedActive} 
        />
        
        <EmbedCodeEditor 
          embedCode={embedCode} 
          setEmbedCode={setEmbedCode} 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <EmbedPositionSelector 
              embedPosition={embedPosition} 
              setEmbedPosition={setEmbedPosition} 
            />
            
            <EmbedButtonConfig 
              embedButtonColor={embedButtonColor}
              setEmbedButtonColor={setEmbedButtonColor}
              embedButtonIcon={embedButtonIcon}
              setEmbedButtonIcon={setEmbedButtonIcon}
            />
          </div>
          
          <EmbedPreview 
            embedActive={embedActive}
            embedPosition={embedPosition}
            embedButtonColor={embedButtonColor}
            embedButtonIcon={embedButtonIcon}
          />
        </div>
      </div>
    </div>
  );
};
