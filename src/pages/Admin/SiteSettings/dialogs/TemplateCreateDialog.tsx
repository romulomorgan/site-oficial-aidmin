
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
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="primaryColor" className="text-right font-medium">
              Cor primária
            </label>
            <div className="col-span-3 flex items-center gap-2">
              <input
                id="primaryColor"
                name="primaryColor"
                value={customTemplate.primaryColor}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={customTemplate.primaryColor}
                onChange={(e) => handleChange({ target: { name: 'primaryColor', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="secondaryColor" className="text-right font-medium">
              Cor secundária
            </label>
            <div className="col-span-3 flex items-center gap-2">
              <input
                id="secondaryColor"
                name="secondaryColor"
                value={customTemplate.secondaryColor}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={customTemplate.secondaryColor}
                onChange={(e) => handleChange({ target: { name: 'secondaryColor', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="accentColor" className="text-right font-medium">
              Cor de destaque
            </label>
            <div className="col-span-3 flex items-center gap-2">
              <input
                id="accentColor"
                name="accentColor"
                value={customTemplate.accentColor}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={customTemplate.accentColor}
                onChange={(e) => handleChange({ target: { name: 'accentColor', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="backgroundColor" className="text-right font-medium">
              Cor de fundo
            </label>
            <div className="col-span-3 flex items-center gap-2">
              <input
                id="backgroundColor"
                name="backgroundColor"
                value={customTemplate.backgroundColor}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={customTemplate.backgroundColor}
                onChange={(e) => handleChange({ target: { name: 'backgroundColor', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="textColor" className="text-right font-medium">
              Cor de texto
            </label>
            <div className="col-span-3 flex items-center gap-2">
              <input
                id="textColor"
                name="textColor"
                value={customTemplate.textColor}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={customTemplate.textColor}
                onChange={(e) => handleChange({ target: { name: 'textColor', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="buttonTextColor" className="text-right font-medium">
              Cor texto botão
            </label>
            <div className="col-span-3 flex items-center gap-2">
              <input
                id="buttonTextColor"
                name="buttonTextColor"
                value={customTemplate.buttonTextColor || '#FFFFFF'}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={customTemplate.buttonTextColor || '#FFFFFF'}
                onChange={(e) => handleChange({ target: { name: 'buttonTextColor', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="menuTextColor" className="text-right font-medium">
              Cor texto menu
            </label>
            <div className="col-span-3 flex items-center gap-2">
              <input
                id="menuTextColor"
                name="menuTextColor"
                value={customTemplate.menuTextColor || '#FFFFFF'}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={customTemplate.menuTextColor || '#FFFFFF'}
                onChange={(e) => handleChange({ target: { name: 'menuTextColor', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
                className="w-10 h-10 rounded cursor-pointer"
              />
            </div>
          </div>
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
