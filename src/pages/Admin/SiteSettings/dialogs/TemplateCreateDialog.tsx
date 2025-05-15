
import React from 'react';
import { TemplateDialogBase } from './TemplateDialogBase';
import { ColorTemplate } from '@/utils/supabase/types';

interface TemplateCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customTemplate: ColorTemplate;
  setCustomTemplate: React.Dispatch<React.SetStateAction<ColorTemplate>>;
  onAddTemplate: () => void;
}

export function TemplateCreateDialog({
  open,
  onOpenChange,
  customTemplate,
  setCustomTemplate,
  onAddTemplate
}: TemplateCreateDialogProps) {
  return (
    <TemplateDialogBase
      open={open}
      onOpenChange={onOpenChange}
      template={customTemplate}
      setTemplate={setCustomTemplate}
      onSubmit={onAddTemplate}
      title="Criar Novo Template"
      description="Configure as cores do seu novo template personalizado"
      submitButtonText="Criar Template"
    />
  );
}
