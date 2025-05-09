
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Trash, X, Plus, Edit, Globe, Send, Code, Webhook, Logs, Eye } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  fetchSiteTexts, 
  fetchEmbedConfig,
  saveEmbedConfig,
  updateSiteText,
  fetchColorTemplates, 
  saveColorTemplate, 
  ColorTemplate
} from '@/utils/supabaseClient';
import {
  testWebhookUrl,
  getWebhookLogs,
  clearWebhookLogs
} from '@/utils/supabase/webhooks';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const [isLoading, setIsLoading] = useState(false);
  const [faviconUrl, setFaviconUrl] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");
  const [robotImage, setRobotImage] = useState("");
  const [contactImage, setContactImage] = useState("");
  const [siteTitle, setSiteTitle] = useState("");
  const [copyrightText, setCopyrightText] = useState("");
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookTestResult, setWebhookTestResult] = useState<{success: boolean, status?: number, message?: string, payload?: any} | null>(null);
  const [embedCode, setEmbedCode] = useState("");
  const [embedPosition, setEmbedPosition] = useState<'left' | 'right'>('right');
  const [embedActive, setEmbedActive] = useState(false);
  const [embedButtonColor, setEmbedButtonColor] = useState("#FF196E");
  const [embedButtonIcon, setEmbedButtonIcon] = useState("chat");
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [webhookLogs, setWebhookLogs] = useState<any[]>([]);
  const [showWebhookLogs, setShowWebhookLogs] = useState(false);

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
        const logs = getWebhookLogs();
        setWebhookLogs(logs);
      } catch (error) {
        console.error('Erro ao carregar dados do site:', error);
        toast.error('Erro ao carregar configurações do site');
      } finally {
        setIsInitialLoading(false);
      }
    };
    
    loadSiteData();
  }, []);

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFaviconUrl(e.target.value);
  };

  const handleWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookUrl(e.target.value);
  };

  const handleRobotImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRobotImage(e.target.value);
  };

  const handleContactImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactImage(e.target.value);
  };
  
  const handleSiteTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteTitle(e.target.value);
  };
  
  const handleCopyrightTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCopyrightText(e.target.value);
  };

  const handleEmbedButtonColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmbedButtonColor(e.target.value);
  };

  const handleEmbedButtonIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmbedButtonIcon(e.target.value);
  };

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
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };
  
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
  
  const handleEditTemplate = (template: ColorTemplate) => {
    // Impedir edição de templates padrão
    if (template.id === 'default') {
      toast.error("Modelos padrão não podem ser editados.");
      return;
    }
    
    setEditingTemplate({...template});
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      toast.error("Por favor, insira uma URL de webhook para testar.");
      return;
    }

    setTestingWebhook(true);
    setWebhookTestResult(null);

    try {
      const result = await testWebhookUrl(webhookUrl);
      setWebhookTestResult(result);
      
      // Atualizar logs de webhook
      const logs = getWebhookLogs();
      setWebhookLogs(logs);
      
      if (result.success) {
        toast.success("Teste de webhook bem-sucedido!");
      } else {
        toast.error("Falha ao testar o webhook.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setWebhookTestResult({
        success: false,
        message: errorMessage
      });
      toast.error("Erro ao testar o webhook.");
      console.error("Webhook test error:", error);
    } finally {
      setTestingWebhook(false);
    }
  };
  
  const handleClearWebhookLogs = () => {
    if (window.confirm("Tem certeza que deseja limpar todos os logs de webhook? Esta ação não pode ser desfeita.")) {
      clearWebhookLogs();
      setWebhookLogs([]);
      toast.success("Logs de webhook limpos com sucesso");
    }
  };

  if (isInitialLoading) {
    return <div className="p-6">Carregando configurações do site...</div>;
  }

  // Função para renderizar preview do ícone de botão
  const renderButtonIcon = () => {
    switch (embedButtonIcon) {
      case 'chat':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
      case 'help':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'message':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        );
      case 'phone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Configurações do Site</h1>
      
      <form onSubmit={(e) => { e.preventDefault(); saveSettings(); }} className="bg-white rounded-lg shadow-sm">
        <Tabs defaultValue="appearance">
          <TabsList className="border-b w-full rounded-t-lg">
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="favicon">Favicon</TabsTrigger>
            <TabsTrigger value="integration">Integração</TabsTrigger>
            <TabsTrigger value="embed">Embed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Templates de Cores</h2>
              <p className="text-gray-500 mb-6">
                Escolha um modelo de cores predefinido ou crie seu próprio tema personalizado.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {templates.map(template => (
                  <div 
                    key={template.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id ? 'ring-2 ring-[#FF196E]' : ''
                    }`}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-medium">{template.name}</h3>
                      <div className="flex items-center gap-2">
                        {selectedTemplate === template.id && (
                          <Check size={16} className="text-[#FF196E]" />
                        )}
                        {template.id !== 'default' && (
                          <>
                            <button
                              type="button"
                              className="text-blue-500 hover:text-blue-700"
                              onClick={(e) => { e.stopPropagation(); handleEditTemplate(template); }}
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              type="button"
                              className="text-red-500 hover:text-red-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm('Tem certeza que deseja excluir este template?')) {
                                  handleDeleteTemplate(template.id);
                                }
                              }}
                            >
                              <Trash size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <div
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: template.primaryColor }}
                          title="Cor Primária"
                        />
                        <div
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: template.secondaryColor }}
                          title="Cor Secundária"
                        />
                        <div
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: template.accentColor }}
                          title="Cor de Destaque"
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {template.id === "default" ? "Modelo padrão" : "Personalizado"}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div 
                  className="border border-dashed rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50"
                  onClick={() => setOpenTemplateDialog(true)}
                >
                  <div className="flex flex-col items-center gap-2 text-gray-500">
                    <Plus size={24} />
                    <span>Criar Template Personalizado</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="favicon" className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Favicon e Título do Site</h2>
              <p className="text-gray-500 mb-4">
                Defina o ícone que será exibido na aba do navegador e o título da página.
              </p>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      URL do Favicon (PNG/JPG recomendados)
                    </label>
                    <input
                      type="text"
                      value={faviconUrl}
                      onChange={handleFaviconChange}
                      placeholder="/lovable-uploads/favicon.png ou URL externa"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Recomendamos utilizar imagens quadradas em formato PNG ou JPG.
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Visualização do Favicon
                    </label>
                    <div className="border rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center">
                      <div className="border bg-white rounded p-2 mb-2 flex items-center justify-center">
                        {faviconUrl ? (
                          <img
                            src={faviconUrl}
                            alt="Favicon"
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/lovable-uploads/c739c386-c6c9-4bb8-9996-98b3a3161fad.png';
                            }}
                          />
                        ) : (
                          <div className="w-8 h-8 flex items-center justify-center text-gray-400">
                            <Globe size={24} />
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        Prévia da visualização no navegador
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700 mb-1">
                    Título do Site
                  </Label>
                  <Input
                    id="siteTitle"
                    type="text"
                    value={siteTitle}
                    onChange={handleSiteTitleChange}
                    placeholder="IAdmin"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Este título será exibido na barra de navegação e na aba do navegador.
                  </p>
                </div>
                
                <div>
                  <Label htmlFor="copyrightText" className="block text-sm font-medium text-gray-700 mb-1">
                    Texto de Copyright
                  </Label>
                  <Input
                    id="copyrightText"
                    type="text"
                    value={copyrightText}
                    onChange={handleCopyrightTextChange}
                    placeholder="© Todos os direitos reservados - IAdmin 2024"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Este texto será exibido no rodapé de todas as páginas.
                  </p>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-700 mb-2">Exemplos de URLs válidas:</p>
                  <ul className="text-xs text-gray-500 list-disc pl-4">
                    <li>/lovable-uploads/meu-favicon.png</li>
                    <li>https://exemplo.com/imagens/favicon.png</li>
                    <li>/lovable-uploads/c739c386-c6c9-4bb8-9996-98b3a3161fad.png</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="integration" className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Configurações de Integração</h2>
              <p className="text-gray-500 mb-6">
                Configure integrações com serviços externos para ampliar as funcionalidades do site.
              </p>
              
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                    <Webhook className="h-5 w-5" /> 
                    Webhook para Mensagens
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Configure um endpoint para receber automaticamente as mensagens enviadas pelo formulário de contato.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        URL do Webhook
                      </Label>
                      <Input
                        id="webhookUrl"
                        type="url"
                        value={webhookUrl}
                        onChange={handleWebhookChange}
                        placeholder="https://sua-api.com/webhook"
                        className="w-full"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Ex: https://sua-api.com/webhook, https://hooks.zapier.com/...
                      </p>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-3">
                      <CustomButton
                        type="button"
                        variant="secondary"
                        onClick={handleTestWebhook}
                        disabled={testingWebhook || !webhookUrl}
                        className="w-full md:w-auto"
                      >
                        <Webhook className="mr-2 h-4 w-4" />
                        {testingWebhook ? "Testando..." : "Testar Webhook"}
                      </CustomButton>
                      
                      <CustomButton
                        type="button"
                        variant="secondary"
                        onClick={() => setShowWebhookLogs(!showWebhookLogs)}
                        className="w-full md:w-auto"
                      >
                        <Logs className="mr-2 h-4 w-4" />
                        {showWebhookLogs ? "Ocultar Logs" : "Mostrar Logs"}
                      </CustomButton>
                      
                      {webhookTestResult !== null && (
                        <Alert className={webhookTestResult.success ? "bg-green-50" : "bg-red-50"}>
                          <AlertDescription className="text-sm">
                            {webhookTestResult.success 
                              ? "O teste foi bem-sucedido! Seu webhook está funcionando." 
                              : "Falha no teste do webhook. Verifique a URL e tente novamente."}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                    
                    {showWebhookLogs && (
                      <div className="mt-4 border rounded-md overflow-hidden">
                        <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-b">
                          <h4 className="font-medium">Logs de Webhook</h4>
                          <CustomButton
                            type="button"
                            variant="secondary"
                            onClick={handleClearWebhookLogs}
                            className="text-xs"
                          >
                            Limpar Logs
                          </CustomButton>
                        </div>
                        
                        <ScrollArea className="h-60 rounded-b-md">
                          {webhookLogs.length > 0 ? (
                            <div className="divide-y">
                              {webhookLogs.map((log, index) => (
                                <div key={index} className="p-3 text-sm">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className={`inline-block w-3 h-3 rounded-full ${log.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className="font-medium">
                                      {new Date(log.timestamp).toLocaleString()} - Status: {log.status || 'N/A'}
                                    </span>
                                  </div>
                                  <div className="ml-5 text-gray-600">
                                    <div><strong>URL:</strong> {log.url}</div>
                                    <div className="mt-1">
                                      <strong>Payload:</strong>
                                      <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto text-xs">
                                        {JSON.stringify(log.payload, null, 2)}
                                      </pre>
                                    </div>
                                    <div className="mt-1">
                                      <strong>Resposta:</strong>
                                      <div className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto text-xs whitespace-pre-wrap">
                                        {typeof log.response === 'string' ? log.response.substring(0, 500) : JSON.stringify(log.response)}
                                        {typeof log.response === 'string' && log.response.length > 500 ? '...' : ''}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 text-center text-gray-500">
                              Nenhum log de webhook disponível
                            </div>
                          )}
                        </ScrollArea>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-medium mt-3 mb-1">Formato do Payload</h4>
                      <pre className="bg-black/90 text-white rounded-md p-3 overflow-x-auto text-sm">
{`{
  "firstName": "Nome do Usuário",
  "lastName": "Sobrenome do Usuário",
  "email": "email@exemplo.com",
  "phone": "11912345678",
  "message": "Mensagem enviada pelo usuário",
  "date": "2024-05-08T14:30:00.000Z"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="embed" className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Código Embed & Botão Flutuante</h2>
              <p className="text-gray-500 mb-4">
                Configure o código embed (chatbot, widget, etc) e personalize o botão flutuante que o abre.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="embedActive" className="text-sm font-medium">
                    Ativar Embed
                  </Label>
                  <Switch
                    id="embedActive"
                    checked={embedActive}
                    onCheckedChange={setEmbedActive}
                  />
                </div>
                
                <div>
                  <Label htmlFor="embedCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Código Embed (HTML)
                  </Label>
                  <Textarea
                    id="embedCode"
                    value={embedCode}
                    onChange={(e) => setEmbedCode(e.target.value)}
                    placeholder="<script>...</script> ou <div>...</div>"
                    className="w-full h-32 font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Cole aqui o código HTML fornecido pelo serviço (chatbot, widget, etc).
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-md font-medium text-gray-800">Posição no Site</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="position-left"
                          name="embedPosition"
                          checked={embedPosition === 'left'}
                          onChange={() => setEmbedPosition('left')}
                          className="mr-2"
                        />
                        <label htmlFor="position-left">Canto Inferior Esquerdo</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="position-right"
                          name="embedPosition"
                          checked={embedPosition === 'right'}
                          onChange={() => setEmbedPosition('right')}
                          className="mr-2"
                        />
                        <label htmlFor="position-right">Canto Inferior Direito</label>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="embedButtonColor" className="block text-sm font-medium text-gray-700 mb-1">
                        Cor do Botão
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          id="embedButtonColor"
                          value={embedButtonColor}
                          onChange={handleEmbedButtonColorChange}
                          className="w-12 h-10 p-1"
                        />
                        <Input
                          type="text"
                          value={embedButtonColor}
                          onChange={handleEmbedButtonColorChange}
                          className="flex-1"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="embedButtonIcon" className="block text-sm font-medium text-gray-700 mb-1">
                        Ícone do Botão
                      </Label>
                      <select
                        id="embedButtonIcon"
                        value={embedButtonIcon}
                        onChange={handleEmbedButtonIconChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="chat">Chat / Mensagem</option>
                        <option value="help">Ajuda / Suporte</option>
                        <option value="message">Email / Mensagem</option>
                        <option value="phone">Telefone</option>
                      </select>
                    </div>
                  </div>
                  
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
                            {renderButtonIcon()}
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
                </div>
              </div>
            </div>
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
      
      {/* Dialog para criar templates */}
      <Dialog open={openTemplateDialog} onOpenChange={setOpenTemplateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Template Personalizado</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="templateName">Nome</Label>
              <Input
                id="templateName"
                value={customTemplate.name}
                onChange={(e) => setCustomTemplate({...customTemplate, name: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="primaryColor">Cor Primária</Label>
              <div className="flex col-span-3 gap-2 items-center">
                <Input
                  type="color"
                  id="primaryColor"
                  value={customTemplate.primaryColor}
                  onChange={(e) => setCustomTemplate({...customTemplate, primaryColor: e.target.value})}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={customTemplate.primaryColor}
                  onChange={(e) => setCustomTemplate({...customTemplate, primaryColor: e.target.value})}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="secondaryColor">Cor Secundária</Label>
              <div className="flex col-span-3 gap-2 items-center">
                <Input
                  type="color"
                  id="secondaryColor"
                  value={customTemplate.secondaryColor}
                  onChange={(e) => setCustomTemplate({...customTemplate, secondaryColor: e.target.value})}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={customTemplate.secondaryColor}
                  onChange={(e) => setCustomTemplate({...customTemplate, secondaryColor: e.target.value})}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="accentColor">Cor de Destaque</Label>
              <div className="flex col-span-3 gap-2 items-center">
                <Input
                  type="color"
                  id="accentColor"
                  value={customTemplate.accentColor}
                  onChange={(e) => setCustomTemplate({...customTemplate, accentColor: e.target.value})}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={customTemplate.accentColor}
                  onChange={(e) => setCustomTemplate({...customTemplate, accentColor: e.target.value})}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="backgroundColor">Cor de Fundo</Label>
              <div className="flex col-span-3 gap-2 items-center">
                <Input
                  type="color"
                  id="backgroundColor"
                  value={customTemplate.backgroundColor}
                  onChange={(e) => setCustomTemplate({...customTemplate, backgroundColor: e.target.value})}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={customTemplate.backgroundColor}
                  onChange={(e) => setCustomTemplate({...customTemplate, backgroundColor: e.target.value})}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="textColor">Cor de Texto</Label>
              <div className="flex col-span-3 gap-2 items-center">
                <Input
                  type="color"
                  id="textColor"
                  value={customTemplate.textColor}
                  onChange={(e) => setCustomTemplate({...customTemplate, textColor: e.target.value})}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={customTemplate.textColor}
                  onChange={(e) => setCustomTemplate({...customTemplate, textColor: e.target.value})}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="buttonTextColor">Cor do Texto de Botão</Label>
              <div className="flex col-span-3 gap-2 items-center">
                <Input
                  type="color"
                  id="buttonTextColor"
                  value={customTemplate.buttonTextColor || "#FFFFFF"}
                  onChange={(e) => setCustomTemplate({...customTemplate, buttonTextColor: e.target.value})}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={customTemplate.buttonTextColor || "#FFFFFF"}
                  onChange={(e) => setCustomTemplate({...customTemplate, buttonTextColor: e.target.value})}
                  className="flex-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="menuTextColor">Cor do Texto do Menu</Label>
              <div className="flex col-span-3 gap-2 items-center">
                <Input
                  type="color"
                  id="menuTextColor"
                  value={customTemplate.menuTextColor || "#FFFFFF"}
                  onChange={(e) => setCustomTemplate({...customTemplate, menuTextColor: e.target.value})}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={customTemplate.menuTextColor || "#FFFFFF"}
                  onChange={(e) => setCustomTemplate({...customTemplate, menuTextColor: e.target.value})}
                  className="flex-1"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <CustomButton type="button" variant="secondary" onClick={() => setOpenTemplateDialog(false)}>
              Cancelar
            </CustomButton>
            <CustomButton type="button" variant="primary" onClick={handleAddTemplate}>
              Adicionar Template
            </CustomButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para editar templates */}
      {editingTemplate && (
        <Dialog open={!!editingTemplate} onOpenChange={(open) => !open && setEditingTemplate(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Template</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editTemplateName">Nome</Label>
                <Input
                  id="editTemplateName"
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate({...editingTemplate, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editPrimaryColor">Cor Primária</Label>
                <div className="flex col-span-3 gap-2 items-center">
                  <Input
                    type="color"
                    id="editPrimaryColor"
                    value={editingTemplate.primaryColor}
                    onChange={(e) => setEditingTemplate({...editingTemplate, primaryColor: e.target.value})}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={editingTemplate.primaryColor}
                    onChange={(e) => setEditingTemplate({...editingTemplate, primaryColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
              {/* Mais campos de cores omitidos para brevidade */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editSecondaryColor">Cor Secundária</Label>
                <div className="flex col-span-3 gap-2 items-center">
                  <Input
                    type="color"
                    id="editSecondaryColor"
                    value={editingTemplate.secondaryColor}
                    onChange={(e) => setEditingTemplate({...editingTemplate, secondaryColor: e.target.value})}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={editingTemplate.secondaryColor}
                    onChange={(e) => setEditingTemplate({...editingTemplate, secondaryColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editAccentColor">Cor de Destaque</Label>
                <div className="flex col-span-3 gap-2 items-center">
                  <Input
                    type="color"
                    id="editAccentColor"
                    value={editingTemplate.accentColor}
                    onChange={(e) => setEditingTemplate({...editingTemplate, accentColor: e.target.value})}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={editingTemplate.accentColor}
                    onChange={(e) => setEditingTemplate({...editingTemplate, accentColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editBackgroundColor">Cor de Fundo</Label>
                <div className="flex col-span-3 gap-2 items-center">
                  <Input
                    type="color"
                    id="editBackgroundColor"
                    value={editingTemplate.backgroundColor}
                    onChange={(e) => setEditingTemplate({...editingTemplate, backgroundColor: e.target.value})}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={editingTemplate.backgroundColor}
                    onChange={(e) => setEditingTemplate({...editingTemplate, backgroundColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editTextColor">Cor de Texto</Label>
                <div className="flex col-span-3 gap-2 items-center">
                  <Input
                    type="color"
                    id="editTextColor"
                    value={editingTemplate.textColor}
                    onChange={(e) => setEditingTemplate({...editingTemplate, textColor: e.target.value})}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={editingTemplate.textColor}
                    onChange={(e) => setEditingTemplate({...editingTemplate, textColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editButtonTextColor">Cor do Texto de Botão</Label>
                <div className="flex col-span-3 gap-2 items-center">
                  <Input
                    type="color"
                    id="editButtonTextColor"
                    value={editingTemplate.buttonTextColor || "#FFFFFF"}
                    onChange={(e) => setEditingTemplate({...editingTemplate, buttonTextColor: e.target.value})}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={editingTemplate.buttonTextColor || "#FFFFFF"}
                    onChange={(e) => setEditingTemplate({...editingTemplate, buttonTextColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="editMenuTextColor">Cor do Texto do Menu</Label>
                <div className="flex col-span-3 gap-2 items-center">
                  <Input
                    type="color"
                    id="editMenuTextColor"
                    value={editingTemplate.menuTextColor || "#FFFFFF"}
                    onChange={(e) => setEditingTemplate({...editingTemplate, menuTextColor: e.target.value})}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    type="text"
                    value={editingTemplate.menuTextColor || "#FFFFFF"}
                    onChange={(e) => setEditingTemplate({...editingTemplate, menuTextColor: e.target.value})}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <CustomButton type="button" variant="secondary" onClick={() => setEditingTemplate(null)}>
                Cancelar
              </CustomButton>
              <CustomButton type="button" variant="primary" onClick={handleUpdateTemplate}>
                Salvar Alterações
              </CustomButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
