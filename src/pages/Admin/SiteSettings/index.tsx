import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomButton } from '@/components/ui/CustomButton';
import { 
  fetchSiteTexts, 
  fetchColorTemplates, 
  saveColorTemplate, 
  fetchEmbedConfig,
  updateSiteText,
  saveEmbedConfig,
  getWebhookLogs
} from '@/utils/supabaseClient';

import { AppearanceTab } from './tabs/AppearanceTab';
import { FaviconTab } from './tabs/FaviconTab';
import { IntegrationTab } from './tabs/IntegrationTab';
import { EmbedTab } from './tabs/EmbedTab';
import { TemplateEditDialog } from './dialogs/TemplateEditDialog';
import { TemplateCreateDialog } from './dialogs/TemplateCreateDialog';
import { ColorTemplate } from '@/utils/supabase/types';

export default function SiteSettings() {
  const [templates, setTemplates] = useState<ColorTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("default");
  const [customTemplate, setCustomTemplate] = useState<ColorTemplate>({
    id: "custom",
    name: "Personalizado",
    primaryColor: "#FF196E",
    secondaryColor: "#2D0A16",
    accentColor: "#FF4F8E",
    backgroundColor: "#FFFFFF",
    textColor: "#222222",
    buttonTextColor: "#FFFFFF",
    menuTextColor: "#FFFFFF"
  });
  const [editingTemplate, setEditingTemplate] = useState<ColorTemplate | null>(null);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
  // Dados do site
  const [faviconUrl, setFaviconUrl] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [robotImage, setRobotImage] = useState("");
  const [contactImage, setContactImage] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [copyrightText, setCopyrightText] = useState("");
  const [webhookLogs, setWebhookLogs] = useState<any[]>([]);
  const [embedCode, setEmbedCode] = useState("");
  const [embedPosition, setEmbedPosition] = useState<'left' | 'right'>('right');
  const [embedActive, setEmbedActive] = useState(false);
  const [embedButtonColor, setEmbedButtonColor] = useState("#FF196E");
  const [embedButtonIcon, setEmbedButtonIcon] = useState("chat");

  useEffect(() => {
    // Carregar dados do site
    const loadSiteData = async () => {
      try {
        // Carregar templates de cores
        const colorTemplates = await fetchColorTemplates();
        if (colorTemplates.length > 0) {
          setTemplates(colorTemplates);
        }
        
        // Carregar textos do site
        const texts = await fetchSiteTexts();
        if (texts) {
          if (texts.faviconUrl) setFaviconUrl(texts.faviconUrl as string);
          if (texts.webhookUrl) setWebhookUrl(texts.webhookUrl as string);
          if (texts.robotImage) setRobotImage(texts.robotImage as string);
          if (texts.contactImage) setContactImage(texts.contactImage as string);
          if (texts.siteTitle) setSiteTitle(texts.siteTitle as string);
          if (texts.copyrightText) setCopyrightText(texts.copyrightText as string);
        }
        
        // Carregar configuração de embed
        const embedConfig = await fetchEmbedConfig();
        if (embedConfig) {
          setEmbedCode(embedConfig.code);
          setEmbedPosition(embedConfig.position);
          setEmbedActive(embedConfig.isActive);
          
          // Buscar configurações extras do botão flutuante
          if (texts.embedButtonColor) setEmbedButtonColor(texts.embedButtonColor as string);
          if (texts.embedButtonIcon) setEmbedButtonIcon(texts.embedButtonIcon as string);
        }
        
        // Carregar template selecionado
        const savedSelectedTemplate = localStorage.getItem('selectedTemplate');
        if (savedSelectedTemplate) {
          setSelectedTemplate(savedSelectedTemplate);
        }
        
        // Carregar logs de webhook
        const loadWebhookLogs = async () => {
          try {
            const logs = await getWebhookLogs();
            setWebhookLogs(logs);
          } catch (error) {
            console.error('Erro ao carregar logs de webhook:', error);
            setWebhookLogs([]);
          }
        };
        
        loadWebhookLogs();
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
      localStorage.setItem('selectedTemplate', selectedTemplate);
      
      // Salvar textos do site
      await Promise.all([
        updateSiteText('faviconUrl', faviconUrl),
        updateSiteText('webhookUrl', webhookUrl),
        updateSiteText('robotImage', robotImage),
        updateSiteText('contactImage', contactImage),
        updateSiteText('siteTitle', siteTitle),
        updateSiteText('copyrightText', copyrightText),
        updateSiteText('embedButtonColor', embedButtonColor),
        updateSiteText('embedButtonIcon', embedButtonIcon)
      ]);
      
      // Salvar configuração de embed
      await saveEmbedConfig({
        code: embedCode,
        position: embedPosition,
        isActive: embedActive
      });
      
      toast.success('Configurações salvas com sucesso!');
      
      // Recarregar a página para aplicar as mudanças
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      toast.error('Ocorreu um erro ao salvar as configurações');
    } finally {
      setIsLoading(false);
    }
  };

  // Funções para gerenciamento de templates
  const handleAddTemplate = async () => {
    const newTemplate = {
      ...customTemplate,
      id: `custom-${Date.now()}`,
      name: `Personalizado ${templates.filter(t => t.id.startsWith('custom')).length + 1}`
    };
    
    try {
      const success = await saveColorTemplate(newTemplate);
      
      if (success) {
        // Atualizar estado local
        setTemplates([...templates, newTemplate]);
        setSelectedTemplate(newTemplate.id);
        setOpenTemplateDialog(false); // Fechar o diálogo após adicionar
        toast.success('Template de cores criado com sucesso!');
      } else {
        toast.error('Erro ao criar template de cores');
      }
    } catch (error) {
      console.error('Erro ao adicionar template:', error);
      toast.error('Ocorreu um erro ao criar o template de cores');
    }
  };
  
  const handleUpdateTemplate = async () => {
    if (editingTemplate) {
      try {
        const success = await saveColorTemplate(editingTemplate);
        
        if (success) {
          // Atualizar estado local
          setTemplates(templates.map(t => t.id === editingTemplate.id ? editingTemplate : t));
          setEditingTemplate(null);
          toast.success('Template atualizado com sucesso!');
        } else {
          toast.error('Erro ao atualizar template');
        }
      } catch (error) {
        console.error('Erro ao atualizar template:', error);
        toast.error('Ocorreu um erro ao atualizar o template');
      }
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    // Impedir exclusão de templates padrão
    if (templateId === 'default') {
      toast.error("Modelos padrão não podem ser excluídos.");
      return;
    }
    
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(updatedTemplates);
    
    // Se o template excluído estava selecionado, selecionar o padrão
    if (selectedTemplate === templateId) {
      setSelectedTemplate("default");
    }
    
    // Atualizar localStorage
    const customTemplates = updatedTemplates.filter(t => t.id !== 'default');
    localStorage.setItem('siteTemplates', JSON.stringify(customTemplates));
    
    toast.success('Template removido com sucesso!');
  };
  
  // Funções para passar para os componentes filhos
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };
  
  const handleEditTemplate = (template: ColorTemplate) => {
    // Impedir edição de templates padrão
    if (template.id === 'default') {
      toast.error("Modelos padrão não podem ser editados.");
      return;
    }
    
    setEditingTemplate({...template});
  };

  if (isInitialLoading) {
    return <div className="p-6">Carregando configurações do site...</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Configurações do Site</h1>
      
      <form onSubmit={(e) => { e.preventDefault(); saveSettings(); }} className="bg-white rounded-lg shadow-sm w-full">
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="border-b w-full rounded-t-lg">
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="favicon">Favicon</TabsTrigger>
            <TabsTrigger value="integration">Integração</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="p-6 space-y-6">
            <AppearanceTab 
              templates={templates}
              selectedTemplate={selectedTemplate}
              onSelectTemplate={handleSelectTemplate}
              onEditTemplate={handleEditTemplate}
              onDeleteTemplate={handleDeleteTemplate}
              onOpenCreateDialog={() => setOpenTemplateDialog(true)}
            />
          </TabsContent>
          
          <TabsContent value="favicon" className="p-6 space-y-6">
            <FaviconTab 
              faviconUrl={faviconUrl}
              setFaviconUrl={setFaviconUrl}
              siteTitle={siteTitle}
              setSiteTitle={setSiteTitle}
              copyrightText={copyrightText}
              setCopyrightText={setCopyrightText}
            />
          </TabsContent>
          
          <TabsContent value="integration" className="p-6 space-y-6">
            <IntegrationTab 
              webhookUrl={webhookUrl}
              setWebhookUrl={setWebhookUrl}
              webhookLogs={webhookLogs}
              setWebhookLogs={setWebhookLogs}
            />
          </TabsContent>
          
          <TabsContent value="embed" className="p-6 space-y-6">
            <EmbedTab 
              embedCode={embedCode}
              setEmbedCode={setEmbedCode}
              embedPosition={embedPosition}
              setEmbedPosition={setEmbedPosition}
              embedActive={embedActive}
              setEmbedActive={setEmbedActive}
              embedButtonColor={embedButtonColor}
              setEmbedButtonColor={setEmbedButtonColor}
              embedButtonIcon={embedButtonIcon}
              setEmbedButtonIcon={setEmbedButtonIcon}
            />
          </TabsContent>
        </Tabs>
        
        <div className="p-6 flex justify-end border-t">
          <CustomButton 
            type="submit" 
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </CustomButton>
        </div>
      </form>
      
      {/* Dialogs para templates */}
      <TemplateCreateDialog
        open={openTemplateDialog}
        onOpenChange={setOpenTemplateDialog}
        customTemplate={customTemplate}
        setCustomTemplate={setCustomTemplate}
        onAddTemplate={handleAddTemplate}
      />
      
      {editingTemplate && (
        <TemplateEditDialog
          open={!!editingTemplate}
          onOpenChange={(open) => !open && setEditingTemplate(null)}
          template={editingTemplate}
          setTemplate={setEditingTemplate}
          onUpdateTemplate={handleUpdateTemplate}
        />
      )}
    </div>
  );
}
