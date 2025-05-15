
import React from 'react';
import { TemplateDialogBase } from './TemplateDialogBase';
import { ColorTemplate } from '@/utils/supabase/types';

interface TemplateEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: ColorTemplate;
  setTemplate: React.Dispatch<React.SetStateAction<ColorTemplate | null>>;
  onUpdateTemplate: () => void;
}

export function TemplateEditDialog({
  open,
  onOpenChange,
  template,
  setTemplate,
  onUpdateTemplate
}: TemplateEditDialogProps) {
  return (
    <TemplateDialogBase
      open={open}
      onOpenChange={onOpenChange}
      template={template}
      setTemplate={setTemplate}
      onSubmit={onUpdateTemplate}
      title="Editar Template"
      description="Modifique as cores do template"
      submitButtonText="Salvar Alterações"
    />
  );
}
