
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomButton } from '@/components/ui/CustomButton';
import { AppearanceTab } from './tabs/AppearanceTab';
import { FaviconTab } from './tabs/FaviconTab';
import { IntegrationTab } from './tabs/IntegrationTab';
import { EmbedTab } from './tabs/EmbedTab';
import { TemplateEditDialog } from './dialogs/TemplateEditDialog';
import { TemplateCreateDialog } from './dialogs/TemplateCreateDialog';
import { useSiteSettingsState } from '@/hooks/useSiteSettingsState';

export default function SiteSettings() {
  const {
    templates,
    selectedTemplate,
    customTemplate,
    editingTemplate,
    openTemplateDialog,
    isLoading,
    isInitialLoading,
    faviconUrl,
    webhookUrl,
    siteTitle,
    copyrightText,
    webhookLogs,
    embedCode,
    embedPosition,
    embedActive,
    embedButtonColor,
    embedButtonIcon,
    setCustomTemplate,
    setEditingTemplate, 
    setOpenTemplateDialog,
    setFaviconUrl,
    setWebhookUrl,
    setSiteTitle,
    setCopyrightText,
    setWebhookLogs,
    setEmbedCode,
    setEmbedPosition,
    setEmbedActive,
    setEmbedButtonColor,
    setEmbedButtonIcon,
    saveSettings,
    handleAddTemplate,
    handleUpdateTemplate,
    handleDeleteTemplate,
    handleSelectTemplate,
    handleEditTemplate
  } = useSiteSettingsState();

  if (isInitialLoading) {
    return <div className="p-6">Carregando configurações do site...</div>;
  }

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Configurações do Site</h1>
      
      <form onSubmit={(e) => { e.preventDefault(); saveSettings(); }} className="bg-white rounded-lg shadow-sm w-full">
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="border-b w-full rounded-t-lg bg-gray-50">
            <TabsTrigger value="appearance" className="font-medium">Aparência</TabsTrigger>
            <TabsTrigger value="favicon" className="font-medium">Favicon</TabsTrigger>
            <TabsTrigger value="integration" className="font-medium">Integração</TabsTrigger>
            <TabsTrigger value="embed" className="font-medium">Embed</TabsTrigger>
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
            className="px-6"
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
