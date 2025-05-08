
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { defaultTemplates, ThemeTemplate } from '@/utils/themeTemplates';
import { Check, Trash, X, Plus, Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SiteSettings() {
  const [templates, setTemplates] = useState<ThemeTemplate[]>(defaultTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("default");
  const [customTemplate, setCustomTemplate] = useState<ThemeTemplate>({
    id: "custom",
    name: "Personalizado",
    primaryColor: "#FF196E",
    secondaryColor: "#2D0A16",
    accentColor: "#FF4F8E",
    backgroundColor: "#FFFFFF",
    textColor: "#222222",
    buttonTextColor: "#FFFFFF"
  });
  const [editing, setEditing] = useState<ThemeTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [faviconUrl, setFaviconUrl] = useState("/favicon.ico");

  useEffect(() => {
    // Load saved templates and selected template from localStorage
    const savedTemplates = localStorage.getItem('siteTemplates');
    if (savedTemplates) {
      setTemplates([...defaultTemplates, ...JSON.parse(savedTemplates).filter((t: ThemeTemplate) => 
        !defaultTemplates.some(dt => dt.id === t.id)
      )]);
    }

    const savedSelectedTemplate = localStorage.getItem('selectedTemplate');
    if (savedSelectedTemplate) {
      setSelectedTemplate(savedSelectedTemplate);
    }
    
    // Load favicon URL
    const savedTexts = localStorage.getItem('siteTexts');
    if (savedTexts) {
      const parsedTexts = JSON.parse(savedTexts);
      if (parsedTexts.faviconUrl) {
        setFaviconUrl(parsedTexts.faviconUrl);
      }
    }
  }, []);

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFaviconUrl(e.target.value);
  };

  const saveSettings = () => {
    setIsLoading(true);
    
    // Save custom templates to localStorage (excluding default templates)
    const customTemplates = templates.filter(template => 
      !defaultTemplates.some(dt => dt.id === template.id)
    );
    localStorage.setItem('siteTemplates', JSON.stringify(customTemplates));
    localStorage.setItem('selectedTemplate', selectedTemplate);
    
    // Save favicon URL to siteTexts
    const savedTexts = localStorage.getItem('siteTexts');
    if (savedTexts) {
      const parsedTexts = JSON.parse(savedTexts);
      parsedTexts.faviconUrl = faviconUrl;
      localStorage.setItem('siteTexts', JSON.stringify(parsedTexts));
    } else {
      localStorage.setItem('siteTexts', JSON.stringify({
        faviconUrl: faviconUrl
      }));
    }
    
    setTimeout(() => {
      toast.success('Configurações salvas com sucesso!');
      setIsLoading(false);
    }, 1000);
  };
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };
  
  const handleAddTemplate = () => {
    const newTemplate = {
      ...customTemplate,
      id: `custom-${Date.now()}`,
      name: `Personalizado ${templates.filter(t => t.id.startsWith('custom')).length + 1}`
    };
    
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate.id);
  };
  
  const handleUpdateTemplate = () => {
    if (editing) {
      setTemplates(templates.map(t => t.id === editing.id ? editing : t));
      setEditing(null);
    }
  };
  
  const handleDeleteTemplate = (templateId: string) => {
    // Prevent deleting default templates
    if (defaultTemplates.some(dt => dt.id === templateId)) {
      toast.error("Modelos padrão não podem ser excluídos.");
      return;
    }
    
    const updatedTemplates = templates.filter(t => t.id !== templateId);
    setTemplates(updatedTemplates);
    
    // If the deleted template was selected, select the default template
    if (selectedTemplate === templateId) {
      setSelectedTemplate("default");
    }
  };
  
  const handleEditTemplate = (template: ThemeTemplate) => {
    // Prevent editing default templates
    if (defaultTemplates.some(dt => dt.id === template.id)) {
      toast.error("Modelos padrão não podem ser editados.");
      return;
    }
    
    setEditing({...template});
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Configurações do Site</h1>
      
      <form onSubmit={(e) => { e.preventDefault(); saveSettings(); }} className="bg-white rounded-lg shadow-sm">
        <Tabs defaultValue="appearance">
          <TabsList className="border-b w-full rounded-t-lg">
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="favicon">Favicon</TabsTrigger>
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
                        {!defaultTemplates.some(dt => dt.id === template.id) && (
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
                
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="border border-dashed rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Plus size={24} />
                        <span>Criar Template Personalizado</span>
                      </div>
                    </div>
                  </DialogTrigger>
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
                    </div>
                    <DialogFooter>
                      <CustomButton type="button" variant="secondary" onClick={() => {}}>
                        Cancelar
                      </CustomButton>
                      <CustomButton type="button" variant="primary" onClick={handleAddTemplate}>
                        Adicionar Template
                      </CustomButton>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="favicon" className="p-6 space-y-6">
            <div>
              <h2 className="text-xl font-medium text-gray-800 mb-4">Favicon do Site</h2>
              <p className="text-gray-500 mb-4">
                Defina o ícone que será exibido na aba do navegador.
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
                      placeholder="/favicon.png ou URL externa"
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
                        <img
                          src={faviconUrl}
                          alt="Favicon"
                          className="w-8 h-8 object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/favicon.ico';
                          }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 text-center">
                        Prévia da visualização no navegador
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <p className="text-sm text-gray-700 mb-2">Exemplos de URLs válidas:</p>
                  <ul className="text-xs text-gray-500 list-disc pl-4">
                    <li>/lovable-uploads/meu-favicon.png</li>
                    <li>https://exemplo.com/imagens/favicon.png</li>
                  </ul>
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
    </div>
  );
}

{/* Dialog for editing templates */}
{editing && (
  <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Editar Template</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="editTemplateName">Nome</Label>
          <Input
            id="editTemplateName"
            value={editing.name}
            onChange={(e) => setEditing({...editing, name: e.target.value})}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="editPrimaryColor">Cor Primária</Label>
          <div className="flex col-span-3 gap-2 items-center">
            <Input
              type="color"
              id="editPrimaryColor"
              value={editing.primaryColor}
              onChange={(e) => setEditing({...editing, primaryColor: e.target.value})}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={editing.primaryColor}
              onChange={(e) => setEditing({...editing, primaryColor: e.target.value})}
              className="flex-1"
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="editSecondaryColor">Cor Secundária</Label>
          <div className="flex col-span-3 gap-2 items-center">
            <Input
              type="color"
              id="editSecondaryColor"
              value={editing.secondaryColor}
              onChange={(e) => setEditing({...editing, secondaryColor: e.target.value})}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={editing.secondaryColor}
              onChange={(e) => setEditing({...editing, secondaryColor: e.target.value})}
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
              value={editing.accentColor}
              onChange={(e) => setEditing({...editing, accentColor: e.target.value})}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={editing.accentColor}
              onChange={(e) => setEditing({...editing, accentColor: e.target.value})}
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
              value={editing.backgroundColor}
              onChange={(e) => setEditing({...editing, backgroundColor: e.target.value})}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={editing.backgroundColor}
              onChange={(e) => setEditing({...editing, backgroundColor: e.target.value})}
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
              value={editing.textColor}
              onChange={(e) => setEditing({...editing, textColor: e.target.value})}
              className="w-12 h-10 p-1"
            />
            <Input
              type="text"
              value={editing.textColor}
              onChange={(e) => setEditing({...editing, textColor: e.target.value})}
              className="flex-1"
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <CustomButton type="button" variant="secondary" onClick={() => setEditing(null)}>
          Cancelar
        </CustomButton>
        <CustomButton type="button" variant="primary" onClick={handleUpdateTemplate}>
          Salvar Alterações
        </CustomButton>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}
