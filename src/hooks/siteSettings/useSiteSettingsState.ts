
import { useState, useEffect } from 'react';
import { useTemplates } from './templates';
import { useSiteTexts } from './useSiteTexts';
import { useEmbedConfig } from './useEmbedConfig';
import { useWebhookLogs } from './useWebhookLogs';
import { toast } from 'sonner';

export function useSiteSettingsState() {
  // Estados para controlar o carregamento
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Hooks individuais para cada funcionalidade
  const templateHook = useTemplates();
  const siteTextsHook = useSiteTexts();
  const embedConfigHook = useEmbedConfig();
  const webhookLogsHook = useWebhookLogs();

  // Efeito para carregar todos os dados iniciais
  useEffect(() => {
    const loadAllData = async () => {
      try {
        await Promise.all([
          templateHook.loadTemplates(),
          siteTextsHook.loadSiteTexts(),
          embedConfigHook.loadEmbedConfig(),
          webhookLogsHook.loadWebhookLogs()
        ]);
      } catch (error) {
        console.error('Erro ao carregar dados do site:', error);
        toast.error('Ocorreu um erro ao carregar as configurações');
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadAllData();
  }, []);

  // Função para salvar todas as configurações
  const saveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Salvar o template selecionado no localStorage
      localStorage.setItem('selectedTemplate', templateHook.selectedTemplate);
      
      // Aplicar o template selecionado
      const templateApplied = templateHook.applySelectedTemplate();
      
      // Salvar textos do site
      const textsSuccess = await siteTextsHook.saveSiteTexts();
      
      // Salvar configuração de embed
      const embedSuccess = await embedConfigHook.saveEmbedConfiguration();
      
      if (textsSuccess && embedSuccess) {
        toast.success('Configurações salvas com sucesso!');
        
        // Disparar um evento informando que as configurações foram atualizadas
        window.dispatchEvent(new CustomEvent('siteSettingsUpdated'));
        
        // Informar sobre o tema aplicado após um pequeno delay
        setTimeout(() => {
          toast.info('Tema aplicado com sucesso! Navegue para outras páginas para ver as mudanças.');
        }, 1000);
      } else {
        toast.error('Ocorreu um erro ao salvar algumas configurações');
      }
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast.error('Ocorreu um erro ao salvar as configurações');
    } finally {
      setIsLoading(false);
    }
  };

  // Retornar todos os estados e funções combinados
  return {
    // Estados de carregamento
    isLoading,
    isInitialLoading,
    
    // Hooks de templates
    ...templateHook,
    
    // Hooks de textos do site
    ...siteTextsHook,
    
    // Hooks de configuração de embed
    ...embedConfigHook,
    
    // Hooks de logs de webhook
    ...webhookLogsHook,
    
    // Função para salvar todas as configurações
    saveSettings
  };
}
