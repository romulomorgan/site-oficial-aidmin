
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchColorTemplates, saveColorTemplate, deleteColorTemplate } from '@/utils/supabase/templates';
import { ColorTemplate } from './types';

export function useTemplates() {
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

  const loadTemplates = async () => {
    setIsLoading(true);
    try {
      const colorTemplates = await fetchColorTemplates();
      if (colorTemplates.length > 0) {
        setTemplates(colorTemplates);
        console.log('Templates carregados do banco:', colorTemplates.length);
      }
      
      // Carregar template selecionado do localStorage
      const savedSelectedTemplate = localStorage.getItem('selectedTemplate');
      if (savedSelectedTemplate) {
        setSelectedTemplate(savedSelectedTemplate);
        console.log('Template selecionado carregado:', savedSelectedTemplate);
      }
    } catch (error) {
      console.error('Erro ao carregar templates:', error);
      toast.error('Erro ao carregar templates do site');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTemplate = async () => {
    setIsLoading(true);
    const newTemplate = {
      ...customTemplate,
      id: `custom-${Date.now()}`,
      name: `Personalizado ${templates.filter(t => t.id.startsWith('custom')).length + 1}`
    };
    
    try {
      console.log('Tentando salvar novo template:', newTemplate);
      const success = await saveColorTemplate(newTemplate);
      
      if (success) {
        // Atualizar estado local
        setTemplates(prev => [...prev, newTemplate]);
        setSelectedTemplate(newTemplate.id);
        setOpenTemplateDialog(false); // Fechar o diálogo após adicionar
        toast.success('Template de cores criado com sucesso!');
      } else {
        toast.error('Erro ao criar template de cores');
      }
    } catch (error) {
      console.error('Erro ao adicionar template:', error);
      toast.error('Ocorreu um erro ao criar o template de cores');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleUpdateTemplate = async () => {
    if (editingTemplate) {
      setIsLoading(true);
      try {
        const success = await saveColorTemplate(editingTemplate);
        
        if (success) {
          // Atualizar estado local
          setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? editingTemplate : t));
          setEditingTemplate(null);
          toast.success('Template atualizado com sucesso!');
        } else {
          toast.error('Erro ao atualizar template');
        }
      } catch (error) {
        console.error('Erro ao atualizar template:', error);
        toast.error('Ocorreu um erro ao atualizar o template');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteTemplate = async (templateId: string) => {
    // Impedir exclusão de templates padrão
    if (templateId === 'default' || templateId.includes('modern-')) {
      toast.error("Modelos padrão não podem ser excluídos.");
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await deleteColorTemplate(templateId);
      
      if (success) {
        // Atualizar estado local
        setTemplates(prev => prev.filter(t => t.id !== templateId));
        
        // Se o template excluído estava selecionado, selecionar o padrão
        if (selectedTemplate === templateId) {
          setSelectedTemplate("default");
          localStorage.setItem('selectedTemplate', 'default');
        }
        
        toast.success('Template removido com sucesso!');
      } else {
        toast.error('Erro ao remover template');
      }
    } catch (error) {
      console.error('Erro ao excluir template:', error);
      toast.error('Ocorreu um erro ao remover o template');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    localStorage.setItem('selectedTemplate', templateId);
  };
  
  const handleEditTemplate = (template: ColorTemplate) => {
    // Impedir edição de templates padrão
    if (template.id === 'default' || template.id.includes('modern-')) {
      toast.error("Modelos padrão não podem ser editados.");
      return;
    }
    
    setEditingTemplate({...template});
  };

  // Aplicar o template selecionado ao DOM
  const applySelectedTemplate = () => {
    if (templates.length > 0) {
      const selectedTemplateObj = templates.find(t => t.id === selectedTemplate);
      if (selectedTemplateObj) {
        const colorVars = {
          '--primary-color': selectedTemplateObj.primaryColor,
          '--secondary-color': selectedTemplateObj.secondaryColor,
          '--accent-color': selectedTemplateObj.accentColor,
          '--background-color': selectedTemplateObj.backgroundColor,
          '--text-color': selectedTemplateObj.textColor,
          '--button-text-color': selectedTemplateObj.buttonTextColor || '#FFFFFF',
          '--menu-text-color': selectedTemplateObj.menuTextColor || '#FFFFFF'
        };
        
        // Aplicar em ambos document.documentElement e document.body
        Object.entries(colorVars).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
          document.body.style.setProperty(key, value);
        });
        
        console.log('Template aplicado:', selectedTemplateObj.name);
        return true;
      }
    }
    return false;
  };
  
  return {
    templates,
    selectedTemplate,
    customTemplate,
    editingTemplate,
    openTemplateDialog,
    isLoading,
    setTemplates,
    setSelectedTemplate,
    setCustomTemplate,
    setEditingTemplate,
    setOpenTemplateDialog,
    loadTemplates,
    handleAddTemplate,
    handleUpdateTemplate,
    handleDeleteTemplate,
    handleSelectTemplate,
    handleEditTemplate,
    applySelectedTemplate
  };
}
