
import React from 'react';
import { X, Maximize, Minimize } from 'lucide-react';

interface EmbedHeaderProps {
  toggleEmbed: () => void;
  toggleMaximize?: () => void;
  isMaximized?: boolean;
  isDesktop?: boolean;
}

const EmbedHeader: React.FC<EmbedHeaderProps> = ({ 
  toggleEmbed, 
  toggleMaximize, 
  isMaximized = false,
  isDesktop = false 
}) => {
  return (
    <div className={`bg-gray-800 text-white py-3 px-4 flex items-center justify-between ${isDesktop ? 'rounded-t-md' : 'rounded-t-xl'}`}>
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
        {isDesktop && toggleMaximize && (
          <button 
            onClick={toggleMaximize} 
            className="text-white hover:text-gray-300"
            aria-label={isMaximized ? "Minimizar" : "Maximizar"}
          >
            {isMaximized ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        )}
        <button 
          onClick={toggleEmbed}
          className="text-white hover:text-gray-300"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default EmbedHeader;
