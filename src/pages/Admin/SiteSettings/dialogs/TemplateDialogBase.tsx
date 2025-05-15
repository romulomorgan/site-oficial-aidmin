
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

interface TemplateDialogBaseProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: ColorTemplate;
  setTemplate: React.Dispatch<React.SetStateAction<ColorTemplate | null>> | React.Dispatch<React.SetStateAction<ColorTemplate>>;
  onSubmit: () => void;
  title: string;
  description: string;
  submitButtonText: string;
}

export function TemplateDialogBase({
  open,
  onOpenChange,
  template,
  setTemplate,
  onSubmit,
  title,
  description,
  submitButtonText
}: TemplateDialogBaseProps) {
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
          <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          <DialogDescription>
            {description}
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
          
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="primaryColor" className="text-right font-medium">
              Cor primária
            </label>
            <div className="col-span-3 flex items-center gap-2">
              <input
                id="primaryColor"
                name="primaryColor"
                value={template.primaryColor}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={template.primaryColor}
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
                value={template.secondaryColor}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={template.secondaryColor}
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
                value={template.accentColor}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={template.accentColor}
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
                value={template.backgroundColor}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={template.backgroundColor}
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
                value={template.textColor}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={template.textColor}
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
                value={template.buttonTextColor || '#FFFFFF'}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={template.buttonTextColor || '#FFFFFF'}
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
                value={template.menuTextColor || '#FFFFFF'}
                onChange={handleChange}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
              />
              <input
                type="color"
                value={template.menuTextColor || '#FFFFFF'}
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
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="mr-2"
            >
              Cancelar
            </CustomButton>
            <CustomButton 
              type="button" 
              variant="primary"
              onClick={onSubmit}
            >
              {submitButtonText}
            </CustomButton>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
