import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchColorTemplates, saveColorTemplate, deleteColorTemplate } from '@/utils/supabase/templates';
import { ColorTemplate } from './types';

// Evento personalizado para notificar mudanças de tema
const createThemeChangeEvent = (template: ColorTemplate) => {
  const event = new CustomEvent('templateSelected', { 
    detail: {
      template: template
    }
  });
  document.dispatchEvent(event);
};

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
    const timestamp = Date.now();
    const newTemplate = {
      ...customTemplate,
      id: `custom-${timestamp}`,
      name: customTemplate.name || `Personalizado ${templates.filter(t => t.id.startsWith('custom')).length + 1}`
    };
    
    try {
      console.log('Tentando salvar novo template:', newTemplate);
      const success = await saveColorTemplate(newTemplate);
      
      if (success) {
        // Recarregar todos os templates para obter o novo ID do servidor
        await loadTemplates();
        
        // Fechar o diálogo após adicionar
        setOpenTemplateDialog(false);
        
        // Aplicar o tema
        const updatedTemplates = await fetchColorTemplates();
        const addedTemplate = updatedTemplates.find(t => t.name === newTemplate.name);
        
        if (addedTemplate) {
          setSelectedTemplate(addedTemplate.id);
          localStorage.setItem('selectedTemplate', addedTemplate.id);
          applyTemplate(addedTemplate);
        }
        
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
          
          // Se o template atualizado for o selecionado, aplicar as mudanças
          if (selectedTemplate === editingTemplate.id) {
            applyTemplate(editingTemplate);
            localStorage.setItem(`template_${editingTemplate.id}`, JSON.stringify(editingTemplate));
          }
          
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
          
          // Aplicar o tema padrão
          const defaultTemplate = templates.find(t => t.id === 'default');
          if (defaultTemplate) {
            applyTemplate(defaultTemplate);
          }
        }
        
        // Remover do localStorage
        localStorage.removeItem(`template_${templateId}`);
        
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
    
    // Buscar e aplicar o template selecionado
    const selectedTemplateObj = templates.find(t => t.id === templateId);
    if (selectedTemplateObj) {
      applyTemplate(selectedTemplateObj);
      
      // Salvar no localStorage para uso offline
      localStorage.setItem(`template_${templateId}`, JSON.stringify(selectedTemplateObj));
    }
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
  const applyTemplate = (template: ColorTemplate) => {
    if (template) {
      const colorVars = {
        '--primary-color': template.primaryColor,
        '--secondary-color': template.secondaryColor,
        '--accent-color': template.accentColor,
        '--background-color': template.backgroundColor,
        '--text-color': template.textColor,
        '--button-text-color': template.buttonTextColor || '#FFFFFF',
        '--menu-text-color': template.menuTextColor || '#FFFFFF'
      };
      
      // Aplicar em ambos document.documentElement e document.body
      Object.entries(colorVars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
        document.body.style.setProperty(key, value);
      });
      
      console.log('Template aplicado:', template.name);
      
      // Notificar outros componentes sobre a mudança de tema
      createThemeChangeEvent(template);
      
      return true;
    }
    return false;
  };
  
  // Aplicar o template selecionado
  const applySelectedTemplate = () => {
    if (templates.length > 0) {
      const selectedTemplateObj = templates.find(t => t.id === selectedTemplate);
      if (selectedTemplateObj) {
        return applyTemplate(selectedTemplateObj);
      }
    }
    return false;
  };
  
  useEffect(() => {
    // Carregar templates quando o componente for montado
    loadTemplates();
  }, []);
  
  useEffect(() => {
    // Aplicar o template selecionado quando os templates forem carregados
    if (templates.length > 0 && selectedTemplate) {
      applySelectedTemplate();
    }
  }, [templates, selectedTemplate]);
  
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
    handleUpdateTemplate: handleUpdateTemplate || (() => {}),
    handleDeleteTemplate: handleDeleteTemplate || (() => {}),
    handleSelectTemplate: handleSelectTemplate || (() => {}),
    handleEditTemplate: handleEditTemplate || (() => {}),
    applySelectedTemplate
  };
}
