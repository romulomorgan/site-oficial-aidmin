
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useTemplates } from './useTemplates';
import { useSiteTexts } from './useSiteTexts';
import { useEmbedConfig } from './useEmbedConfig';
import { useWebhookLogs } from './useWebhookLogs';
import type { SiteSettingsState } from './types';

export function useSiteSettingsState() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  const templatesState = useTemplates();
  const siteTextsState = useSiteTexts();
  const embedConfigState = useEmbedConfig();
  const webhookLogsState = useWebhookLogs();

  useEffect(() => {
    // Carregar dados do site
    const loadSiteData = async () => {
      try {
        // Carregar templates de cores
        await templatesState.loadTemplates();
        
        // Carregar textos do site
        await siteTextsState.loadSiteTexts();
        
        // Carregar configuração de embed
        await embedConfigState.loadEmbedConfig();
        
        // Carregar logs de webhook
        await webhookLogsState.loadWebhookLogs();
      } catch (error) {
        console.error('Erro ao carregar dados do site:', error);
        toast.error('Erro ao carregar configurações do site');
      } finally {
        setIsInitialLoading(false);
      }
    };
    
    loadSiteData();
  }, []);

  const saveSettings = async () => {
    setIsLoading(true);
    
    try {
      // Salvar template selecionado
      localStorage.setItem('selectedTemplate', templatesState.selectedTemplate);
      console.log('Template selecionado salvo:', templatesState.selectedTemplate);
      
      // Aplicar o template selecionado imediatamente
      templatesState.applySelectedTemplate();
      
      // Salvar textos do site
      const textsSuccess = await siteTextsState.saveSiteTexts();
      
      // Salvar configuração de embed
      const embedSuccess = await embedConfigState.saveEmbedConfiguration();
      
      if (textsSuccess && embedSuccess) {
        toast.success('Configurações salvas com sucesso!');
        
        // Para aplicar as mudanças sem recarregar a página inteira
        // Dispatch um evento personalizado para que outros componentes possam reagir
        const event = new CustomEvent('themeChanged', { 
          detail: { selectedTemplate: templatesState.selectedTemplate } 
        });
        window.dispatchEvent(event);
        
        // Aguardar um pequeno intervalo para permitir que o evento seja processado
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

  // Combinando todos os estados e funções para retornar
  return {
    // Estado de templates
    templates: templatesState.templates,
    selectedTemplate: templatesState.selectedTemplate,
    customTemplate: templatesState.customTemplate,
    editingTemplate: templatesState.editingTemplate,
    openTemplateDialog: templatesState.openTemplateDialog,
    
    // Estado de textos do site
    faviconUrl: siteTextsState.faviconUrl,
    webhookUrl: siteTextsState.webhookUrl,
    robotImage: siteTextsState.robotImage,
    contactImage: siteTextsState.contactImage,
    siteTitle: siteTextsState.siteTitle,
    copyrightText: siteTextsState.copyrightText,
    
    // Estado de configuração de embed
    embedCode: embedConfigState.embedCode,
    embedPosition: embedConfigState.embedPosition,
    embedActive: embedConfigState.embedActive,
    embedButtonColor: siteTextsState.embedButtonColor,
    embedButtonIcon: siteTextsState.embedButtonIcon,
    
    // Estado de logs de webhook
    webhookLogs: webhookLogsState.webhookLogs,
    
    // Estado de carregamento
    isLoading,
    isInitialLoading,
    
    // Setters de templates
    setTemplates: templatesState.setTemplates,
    setSelectedTemplate: templatesState.setSelectedTemplate,
    setCustomTemplate: templatesState.setCustomTemplate,
    setEditingTemplate: templatesState.setEditingTemplate,
    setOpenTemplateDialog: templatesState.setOpenTemplateDialog,
    
    // Setters de textos do site
    setFaviconUrl: siteTextsState.setFaviconUrl,
    setWebhookUrl: siteTextsState.setWebhookUrl,
    setRobotImage: siteTextsState.setRobotImage,
    setContactImage: siteTextsState.setContactImage,
    setSiteTitle: siteTextsState.setSiteTitle,
    setCopyrightText: siteTextsState.setCopyrightText,
    
    // Setters de configuração de embed
    setEmbedCode: embedConfigState.setEmbedCode,
    setEmbedPosition: embedConfigState.setEmbedPosition,
    setEmbedActive: embedConfigState.setEmbedActive,
    setEmbedButtonColor: siteTextsState.setEmbedButtonColor,
    setEmbedButtonIcon: siteTextsState.setEmbedButtonIcon,
    
    // Setters de logs de webhook
    setWebhookLogs: webhookLogsState.setWebhookLogs,
    
    // Funções
    saveSettings,
    handleAddTemplate: templatesState.handleAddTemplate,
    handleUpdateTemplate: templatesState.handleUpdateTemplate,
    handleDeleteTemplate: templatesState.handleDeleteTemplate,
    handleSelectTemplate: templatesState.handleSelectTemplate,
    handleEditTemplate: templatesState.handleEditTemplate
  };
}

// Exportando também os hooks individuais para uso direto
export * from './useTemplates';
export * from './useSiteTexts';
export * from './useEmbedConfig';
export * from './useWebhookLogs';
export * from './types';
