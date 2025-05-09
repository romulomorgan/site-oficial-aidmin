
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CustomButton } from '@/components/ui/CustomButton';
import { ColorTemplate } from '@/utils/supabase/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface TemplateEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: ColorTemplate;
  setTemplate: (template: ColorTemplate) => void;
  onUpdateTemplate: () => void;
}

export const TemplateEditDialog: React.FC<TemplateEditDialogProps> = ({
  open,
  onOpenChange,
  template,
  setTemplate,
  onUpdateTemplate
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Template</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="editTemplateName">Nome</Label>
            <Input
              id="editTemplateName"
              value={template.name}
              onChange={(e) => setTemplate({...template, name: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="editPrimaryColor">Cor Primária</Label>
            <div className="flex col-span-3 gap-2 items-center">
              <Input
                type="color"
                id="editPrimaryColor"
                value={template.primaryColor}
                onChange={(e) => setTemplate({...template, primaryColor: e.target.value})}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={template.primaryColor}
                onChange={(e) => setTemplate({...template, primaryColor: e.target.value})}
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
                value={template.secondaryColor}
                onChange={(e) => setTemplate({...template, secondaryColor: e.target.value})}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={template.secondaryColor}
                onChange={(e) => setTemplate({...template, secondaryColor: e.target.value})}
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
                value={template.accentColor}
                onChange={(e) => setTemplate({...template, accentColor: e.target.value})}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={template.accentColor}
                onChange={(e) => setTemplate({...template, accentColor: e.target.value})}
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
                value={template.backgroundColor}
                onChange={(e) => setTemplate({...template, backgroundColor: e.target.value})}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={template.backgroundColor}
                onChange={(e) => setTemplate({...template, backgroundColor: e.target.value})}
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
                value={template.textColor}
                onChange={(e) => setTemplate({...template, textColor: e.target.value})}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={template.textColor}
                onChange={(e) => setTemplate({...template, textColor: e.target.value})}
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
                value={template.buttonTextColor || "#FFFFFF"}
                onChange={(e) => setTemplate({...template, buttonTextColor: e.target.value})}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={template.buttonTextColor || "#FFFFFF"}
                onChange={(e) => setTemplate({...template, buttonTextColor: e.target.value})}
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
                value={template.menuTextColor || "#FFFFFF"}
                onChange={(e) => setTemplate({...template, menuTextColor: e.target.value})}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={template.menuTextColor || "#FFFFFF"}
                onChange={(e) => setTemplate({...template, menuTextColor: e.target.value})}
                className="flex-1"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <CustomButton type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </CustomButton>
          <CustomButton type="button" variant="primary" onClick={onUpdateTemplate}>
            Salvar Alterações
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
