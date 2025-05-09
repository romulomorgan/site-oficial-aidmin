
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { fetchEmbedConfig } from '@/utils/supabase/embedConfig';
import { EmbedConfig } from '@/utils/supabase/types';

const EmbedComponent: React.FC = () => {
  const [embedConfig, setEmbedConfig] = useState<EmbedConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadEmbedConfig = async () => {
      try {
        const config = await fetchEmbedConfig();
        setEmbedConfig(config);
      } catch (error) {
        console.error('Erro ao carregar configuração de embed:', error);
      }
    };
    
    loadEmbedConfig();
  }, []);

  // Se não tiver configuração ou não estiver ativo, não renderiza
  if (!embedConfig || !embedConfig.isActive) {
    return null;
  }

  const toggleEmbed = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed ${embedConfig.position === 'left' ? 'left-0' : 'right-0'} bottom-20 z-50`}>
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
          className={`bg-primary-color text-white p-3 rounded-full shadow-lg m-4 hover:bg-opacity-90 transition-all`}
          aria-label="Abrir suporte"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default EmbedComponent;
