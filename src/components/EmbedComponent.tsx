
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { fetchEmbedConfig } from '@/utils/supabase/embedConfig';
import { EmbedConfig } from '@/utils/supabase/types';

const EmbedComponent: React.FC = () => {
  const [embedConfig, setEmbedConfig] = useState<EmbedConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadEmbedConfig = async () => {
      const config = await fetchEmbedConfig();
      setEmbedConfig(config);
    };

    loadEmbedConfig();
  }, []);

  // Se não houver configuração ou não estiver ativo, não renderiza nada
  if (!embedConfig || !embedConfig.isActive || !embedConfig.code) {
    return null;
  }

  const toggleEmbed = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={toggleEmbed}
        className={`fixed z-50 bottom-6 ${
          embedConfig.position === 'left' ? 'left-6' : 'right-6'
        } bg-primary-color text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-color/90 transition-transform ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Abrir chat"
      >
        <span className="text-2xl">
          💬
        </span>
      </button>

      {/* Container do embed quando aberto */}
      {isOpen && (
        <div
          className={`fixed z-50 bottom-6 ${
            embedConfig.position === 'left' ? 'left-6' : 'right-6'
          } bg-white rounded-lg shadow-xl w-[350px] h-[500px] max-h-[80vh] flex flex-col overflow-hidden`}
        >
          {/* Cabeçalho do embed com botão fechar */}
          <div className="bg-primary-color text-white p-2 flex justify-between items-center">
            <h3 className="text-sm font-medium">Atendimento</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/90 hover:text-white"
              aria-label="Fechar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Conteúdo do embed */}
          <div className="flex-1 overflow-hidden">
            <div
              dangerouslySetInnerHTML={{ __html: embedConfig.code }}
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EmbedComponent;
