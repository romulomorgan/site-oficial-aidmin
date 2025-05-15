
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomTemplate(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Criar Novo Template</DialogTitle>
          <DialogDescription>
            Configure as cores do seu novo template personalizado
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
              value={customTemplate.name}
              onChange={handleChange}
              className="col-span-3 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
            />
          </div>
          
          <ColorInput
            id="primaryColor"
            name="primaryColor"
            label="Cor primária"
            value={customTemplate.primaryColor}
            onChange={handleChange}
          />
          
          <ColorInput
            id="secondaryColor"
            name="secondaryColor"
            label="Cor secundária"
            value={customTemplate.secondaryColor}
            onChange={handleChange}
          />
          
          <ColorInput
            id="accentColor"
            name="accentColor"
            label="Cor de destaque"
            value={customTemplate.accentColor}
            onChange={handleChange}
          />
          
          <ColorInput
            id="backgroundColor"
            name="backgroundColor"
            label="Cor de fundo"
            value={customTemplate.backgroundColor}
            onChange={handleChange}
          />
          
          <ColorInput
            id="textColor"
            name="textColor"
            label="Cor de texto"
            value={customTemplate.textColor}
            onChange={handleChange}
          />
          
          <ColorInput
            id="buttonTextColor"
            name="buttonTextColor"
            label="Cor texto botão"
            value={customTemplate.buttonTextColor || '#FFFFFF'}
            onChange={handleChange}
          />
          
          <ColorInput
            id="menuTextColor"
            name="menuTextColor"
            label="Cor texto menu"
            value={customTemplate.menuTextColor || '#FFFFFF'}
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
              onClick={onAddTemplate}
            >
              Criar Template
            </CustomButton>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
