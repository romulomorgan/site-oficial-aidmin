
import React from 'react';
import { ColorTemplate } from '@/utils/supabase/types';
import { TemplateCreateDialog } from '../dialogs/TemplateCreateDialog';
import { TemplateEditDialog } from '../dialogs/TemplateEditDialog';

interface TemplateDialogsProps {
  openTemplateDialog: boolean;
  setOpenTemplateDialog: (open: boolean) => void;
  customTemplate: ColorTemplate;
  setCustomTemplate: React.Dispatch<React.SetStateAction<ColorTemplate>>;
  onAddTemplate: () => void;
  editingTemplate: ColorTemplate | null;
  setEditingTemplate: React.Dispatch<React.SetStateAction<ColorTemplate | null>>;
  onUpdateTemplate: () => void;
}

export const TemplateDialogs: React.FC<TemplateDialogsProps> = ({
  openTemplateDialog,
  setOpenTemplateDialog,
  customTemplate,
  setCustomTemplate,
  onAddTemplate,
  editingTemplate,
  setEditingTemplate,
  onUpdateTemplate
}) => {
  return (
    <>
      <TemplateCreateDialog
        open={openTemplateDialog}
        onOpenChange={setOpenTemplateDialog}
        customTemplate={customTemplate}
        setCustomTemplate={setCustomTemplate}
        onAddTemplate={onAddTemplate}
      />
      
      {editingTemplate && (
        <TemplateEditDialog
          open={!!editingTemplate}
          onOpenChange={(open) => !open && setEditingTemplate(null)}
          template={editingTemplate}
          setTemplate={setEditingTemplate}
          onUpdateTemplate={onUpdateTemplate}
        />
      )}
    </>
  );
};
