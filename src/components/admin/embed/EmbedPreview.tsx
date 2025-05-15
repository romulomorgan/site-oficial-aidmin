
import React from 'react';
import { Eye } from 'lucide-react';
import { renderEmbedButtonIcon } from '@/utils/icons/embedButtonIcons';

interface EmbedPreviewProps {
  embedActive: boolean;
  embedPosition: 'left' | 'right';
  embedButtonColor: string;
  embedButtonIcon: string;
}

export const EmbedPreview: React.FC<EmbedPreviewProps> = ({
  embedActive,
  embedPosition,
  embedButtonColor,
  embedButtonIcon
}) => {
  return (
    <div>
      <h3 className="font-medium mb-3 flex items-center gap-2">
        <Eye size={18} />
        Visualização
      </h3>
      <div className="border rounded-lg p-6 bg-gray-100 h-60 relative">
        {embedActive ? (
          <div className={`absolute bottom-4 ${embedPosition === 'left' ? 'left-4' : 'right-4'}`}>
            <button
              className="rounded-full shadow-lg p-3"
              style={{ backgroundColor: embedButtonColor, color: 'white' }}
            >
              {renderEmbedButtonIcon(embedButtonIcon)}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            Embed desativado
          </div>
        )}
      </div>
      <p className="text-xs text-center mt-2 text-gray-500">
        O botão flutuante abrirá o conteúdo embed quando clicado.
      </p>
    </div>
  );
};
