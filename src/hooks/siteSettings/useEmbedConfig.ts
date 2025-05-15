
import { useState } from 'react';
import { fetchEmbedConfig, saveEmbedConfig } from '@/utils/supabaseClient';
import { EmbedConfigState } from './types';

export function useEmbedConfig() {
  const [embedCode, setEmbedCode] = useState("");
  const [embedPosition, setEmbedPosition] = useState<'left' | 'right'>('right');
  const [embedActive, setEmbedActive] = useState(false);

  const loadEmbedConfig = async () => {
    try {
      const embedConfig = await fetchEmbedConfig();
      if (embedConfig) {
        setEmbedCode(embedConfig.code);
        setEmbedPosition(embedConfig.position);
        setEmbedActive(embedConfig.isActive);
      }
    } catch (error) {
      console.error('Erro ao carregar configuração de embed:', error);
    }
  };

  const saveEmbedConfiguration = async () => {
    try {
      await saveEmbedConfig({
        code: embedCode,
        position: embedPosition,
        isActive: embedActive
      });
      return true;
    } catch (error) {
      console.error('Erro ao salvar configuração de embed:', error);
      return false;
    }
  };

  return {
    embedCode,
    embedPosition,
    embedActive,
    setEmbedCode,
    setEmbedPosition,
    setEmbedActive,
    loadEmbedConfig,
    saveEmbedConfiguration
  };
}
