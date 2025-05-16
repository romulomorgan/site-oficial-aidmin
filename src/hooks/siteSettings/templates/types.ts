
import { ColorTemplate } from '@/utils/supabase/types';

export interface TemplateState {
  templates: ColorTemplate[];
  selectedTemplate: string;
  customTemplate: ColorTemplate;
  editingTemplate: ColorTemplate | null;
  openTemplateDialog: boolean;
  isLoading: boolean;
  setTemplates: (templates: ColorTemplate[]) => void;
  setSelectedTemplate: (templateId: string) => void;
  setCustomTemplate: (template: ColorTemplate) => void;
  setEditingTemplate: (template: ColorTemplate | null) => void;
  setOpenTemplateDialog: (open: boolean) => void;
}

export interface TemplateActions {
  loadTemplates: () => Promise<void>;
  handleAddTemplate: () => Promise<void>;
  handleUpdateTemplate: () => Promise<void>;
  handleDeleteTemplate: (templateId: string) => Promise<void>;
  handleSelectTemplate: (templateId: string) => void;
  handleEditTemplate: (template: ColorTemplate) => void;
  applySelectedTemplate: () => boolean;
}

export interface UseTemplatesReturn extends TemplateState, TemplateActions {}
