
import { useState } from 'react';
import { ColorTemplate } from '@/utils/supabase/types';
import { TemplateState } from './types';

// Estado inicial do template personalizado
const defaultCustomTemplate: ColorTemplate = {
  id: "custom",
  name: "Personalizado",
  primaryColor: "#FF196E",
  secondaryColor: "#2D0A16",
  accentColor: "#FF4F8E",
  backgroundColor: "#FFFFFF",
  textColor: "#222222",
  buttonTextColor: "#FFFFFF",
  menuTextColor: "#FFFFFF"
};

export const useTemplateState = (): TemplateState => {
  const [templates, setTemplates] = useState<ColorTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("default");
  const [customTemplate, setCustomTemplate] = useState<ColorTemplate>(defaultCustomTemplate);
  const [editingTemplate, setEditingTemplate] = useState<ColorTemplate | null>(null);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  };
};
