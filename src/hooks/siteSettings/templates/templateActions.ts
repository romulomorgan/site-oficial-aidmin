
import { toast } from 'sonner';
import { ColorTemplate } from '@/utils/supabase/types';
import { TemplateState, TemplateActions } from './types';
import { applyTemplate } from './templateUtils';
import { fetchColorTemplates, saveColorTemplate, deleteColorTemplate } from '@/utils/supabase/templates';

export const useTemplateActions = (state: TemplateState): TemplateActions => {
  const { 
    templates,
    selectedTemplate,
    customTemplate, 
    editingTemplate,
    setTemplates,
    setSelectedTemplate,
    setEditingTemplate,
    setOpenTemplateDialog,
    isLoading,
    setCustomTemplate
  } = state;

  // Carregar templates
  const loadTemplates = async () => {
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
    }
  };

  // Adicionar template
  const handleAddTemplate = async () => {
    if (isLoading) return;

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
    }
  };
  
  // Atualizar template
  const handleUpdateTemplate = async () => {
    if (!editingTemplate || isLoading) return;

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
    }
  };

  // Excluir template
  const handleDeleteTemplate = async (templateId: string) => {
    // Impedir exclusão de templates padrão
    if (templateId === 'default' || templateId.includes('modern-')) {
      toast.error("Modelos padrão não podem ser excluídos.");
      return;
    }
    
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
    }
  };
  
  // Selecionar template
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
  
  // Editar template
  const handleEditTemplate = (template: ColorTemplate) => {
    // Impedir edição de templates padrão
    if (template.id === 'default' || template.id.includes('modern-')) {
      toast.error("Modelos padrão não podem ser editados.");
      return;
    }
    
    setEditingTemplate({...template});
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

  return {
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
};
