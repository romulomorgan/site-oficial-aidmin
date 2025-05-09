
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

interface TemplateCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customTemplate: ColorTemplate;
  setCustomTemplate: (template: ColorTemplate) => void;
  onAddTemplate: () => void;
}

export const TemplateCreateDialog: React.FC<TemplateCreateDialogProps> = ({
  open,
  onOpenChange,
  customTemplate,
  setCustomTemplate,
  onAddTemplate
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="buttonTextColor">Cor do Texto de Botão</Label>
            <div className="flex col-span-3 gap-2 items-center">
              <Input
                type="color"
                id="buttonTextColor"
                value={customTemplate.buttonTextColor || "#FFFFFF"}
                onChange={(e) => setCustomTemplate({...customTemplate, buttonTextColor: e.target.value})}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={customTemplate.buttonTextColor || "#FFFFFF"}
                onChange={(e) => setCustomTemplate({...customTemplate, buttonTextColor: e.target.value})}
                className="flex-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="menuTextColor">Cor do Texto do Menu</Label>
            <div className="flex col-span-3 gap-2 items-center">
              <Input
                type="color"
                id="menuTextColor"
                value={customTemplate.menuTextColor || "#FFFFFF"}
                onChange={(e) => setCustomTemplate({...customTemplate, menuTextColor: e.target.value})}
                className="w-12 h-10 p-1"
              />
              <Input
                type="text"
                value={customTemplate.menuTextColor || "#FFFFFF"}
                onChange={(e) => setCustomTemplate({...customTemplate, menuTextColor: e.target.value})}
                className="flex-1"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <CustomButton type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Cancelar
          </CustomButton>
          <CustomButton type="button" variant="primary" onClick={onAddTemplate}>
            Adicionar Template
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
