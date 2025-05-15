
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { CustomButton } from '@/components/ui/CustomButton';
import { ColorTemplate } from '@/utils/supabase/types';
import { ColorInput } from '@/components/ui/ColorInput';

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTemplate(prev => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Editar Template</DialogTitle>
          <DialogDescription>
            Modifique as cores do template
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right font-medium">
              Nome
            </label>
            <input
              id="name"
              name="name"
              value={template.name}
              onChange={handleChange}
              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
            />
          </div>
          
          <ColorInput
            id="primaryColor"
            name="primaryColor"
            label="Cor primária"
            value={template.primaryColor}
            onChange={handleChange}
          />
          
          <ColorInput
            id="secondaryColor"
            name="secondaryColor"
            label="Cor secundária"
            value={template.secondaryColor}
            onChange={handleChange}
          />
          
          <ColorInput
            id="accentColor"
            name="accentColor"
            label="Cor de destaque"
            value={template.accentColor}
            onChange={handleChange}
          />
          
          <ColorInput
            id="backgroundColor"
            name="backgroundColor"
            label="Cor de fundo"
            value={template.backgroundColor}
            onChange={handleChange}
          />
          
          <ColorInput
            id="textColor"
            name="textColor"
            label="Cor de texto"
            value={template.textColor}
            onChange={handleChange}
          />
          
          <ColorInput
            id="buttonTextColor"
            name="buttonTextColor"
            label="Cor texto botão"
            value={template.buttonTextColor || '#FFFFFF'}
            onChange={handleChange}
          />
          
          <ColorInput
            id="menuTextColor"
            name="menuTextColor"
            label="Cor texto menu"
            value={template.menuTextColor || '#FFFFFF'}
            onChange={handleChange}
          />
        </div>
        
        <div className="bg-gray-50 -m-6 mt-2 p-6 rounded-b-lg">
          <DialogFooter>
            <CustomButton 
              type="button" 
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="mr-2"
            >
              Cancelar
            </CustomButton>
            <CustomButton 
              type="button" 
              variant="primary"
              onClick={onUpdateTemplate}
            >
              Salvar Alterações
            </CustomButton>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
