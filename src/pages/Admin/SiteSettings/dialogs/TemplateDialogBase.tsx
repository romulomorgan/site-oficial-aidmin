
import React from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CustomButton } from '@/components/ui/CustomButton';
import { ColorTemplate } from '@/utils/supabase/types';

// Definindo o esquema de validação com Zod
const templateFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Formato de cor hexadecimal inválido"),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Formato de cor hexadecimal inválido"),
  accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Formato de cor hexadecimal inválido"),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Formato de cor hexadecimal inválido"),
  textColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Formato de cor hexadecimal inválido"),
  buttonTextColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Formato de cor hexadecimal inválido"),
  menuTextColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Formato de cor hexadecimal inválido")
});

type TemplateFormValues = z.infer<typeof templateFormSchema>;

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
  // Inicializar formulário com react-hook-form + zod
  const form = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: template.name,
      primaryColor: template.primaryColor,
      secondaryColor: template.secondaryColor,
      accentColor: template.accentColor,
      backgroundColor: template.backgroundColor,
      textColor: template.textColor,
      buttonTextColor: template.buttonTextColor || '#FFFFFF',
      menuTextColor: template.menuTextColor || '#FFFFFF'
    }
  });

  // Lidar com mudanças nos campos do formulário
  const handleValueChange = (name: string, value: string) => {
    setTemplate(prev => {
      if (!prev) return null;
      return { ...prev, [name]: value };
    });
  };

  // Lidar com o envio do formulário
  const handleFormSubmit = (data: TemplateFormValues) => {
    console.log('Enviando template para salvar:', data);
    onSubmit();
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

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid gap-4 py-4">
              {/* Campo: Nome */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right font-medium">Nome</FormLabel>
                    <div className="col-span-3">
                      <FormControl>
                        <Input 
                          {...field}
                          className="w-full"
                          onChange={(e) => {
                            field.onChange(e);
                            handleValueChange('name', e.target.value);
                          }}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              {/* Campo: Cor Primária */}
              <FormField
                control={form.control}
                name="primaryColor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right font-medium">Cor primária</FormLabel>
                    <div className="col-span-3 flex items-center gap-2">
                      <FormControl>
                        <Input 
                          {...field}
                          className="flex-grow" 
                          onChange={(e) => {
                            field.onChange(e);
                            handleValueChange('primaryColor', e.target.value);
                          }}
                        />
                      </FormControl>
                      <Input 
                        type="color" 
                        value={field.value}
                        className="w-10 h-10 rounded cursor-pointer p-0" 
                        onChange={(e) => {
                          field.onChange(e);
                          handleValueChange('primaryColor', e.target.value);
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* Campo: Cor Secundária */}
              <FormField
                control={form.control}
                name="secondaryColor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right font-medium">Cor secundária</FormLabel>
                    <div className="col-span-3 flex items-center gap-2">
                      <FormControl>
                        <Input 
                          {...field}
                          className="flex-grow" 
                          onChange={(e) => {
                            field.onChange(e);
                            handleValueChange('secondaryColor', e.target.value);
                          }}
                        />
                      </FormControl>
                      <Input 
                        type="color" 
                        value={field.value}
                        className="w-10 h-10 rounded cursor-pointer p-0" 
                        onChange={(e) => {
                          field.onChange(e);
                          handleValueChange('secondaryColor', e.target.value);
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* Campo: Cor de Destaque */}
              <FormField
                control={form.control}
                name="accentColor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right font-medium">Cor de destaque</FormLabel>
                    <div className="col-span-3 flex items-center gap-2">
                      <FormControl>
                        <Input 
                          {...field}
                          className="flex-grow" 
                          onChange={(e) => {
                            field.onChange(e);
                            handleValueChange('accentColor', e.target.value);
                          }}
                        />
                      </FormControl>
                      <Input 
                        type="color" 
                        value={field.value}
                        className="w-10 h-10 rounded cursor-pointer p-0" 
                        onChange={(e) => {
                          field.onChange(e);
                          handleValueChange('accentColor', e.target.value);
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* Campo: Cor de Fundo */}
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right font-medium">Cor de fundo</FormLabel>
                    <div className="col-span-3 flex items-center gap-2">
                      <FormControl>
                        <Input 
                          {...field}
                          className="flex-grow" 
                          onChange={(e) => {
                            field.onChange(e);
                            handleValueChange('backgroundColor', e.target.value);
                          }}
                        />
                      </FormControl>
                      <Input 
                        type="color" 
                        value={field.value}
                        className="w-10 h-10 rounded cursor-pointer p-0" 
                        onChange={(e) => {
                          field.onChange(e);
                          handleValueChange('backgroundColor', e.target.value);
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* Campo: Cor de Texto */}
              <FormField
                control={form.control}
                name="textColor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right font-medium">Cor de texto</FormLabel>
                    <div className="col-span-3 flex items-center gap-2">
                      <FormControl>
                        <Input 
                          {...field}
                          className="flex-grow" 
                          onChange={(e) => {
                            field.onChange(e);
                            handleValueChange('textColor', e.target.value);
                          }}
                        />
                      </FormControl>
                      <Input 
                        type="color" 
                        value={field.value}
                        className="w-10 h-10 rounded cursor-pointer p-0" 
                        onChange={(e) => {
                          field.onChange(e);
                          handleValueChange('textColor', e.target.value);
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* Campo: Cor de Texto do Botão */}
              <FormField
                control={form.control}
                name="buttonTextColor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right font-medium">Cor texto botão</FormLabel>
                    <div className="col-span-3 flex items-center gap-2">
                      <FormControl>
                        <Input 
                          {...field}
                          className="flex-grow" 
                          onChange={(e) => {
                            field.onChange(e);
                            handleValueChange('buttonTextColor', e.target.value);
                          }}
                        />
                      </FormControl>
                      <Input 
                        type="color" 
                        value={field.value}
                        className="w-10 h-10 rounded cursor-pointer p-0" 
                        onChange={(e) => {
                          field.onChange(e);
                          handleValueChange('buttonTextColor', e.target.value);
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />

              {/* Campo: Cor de Texto do Menu */}
              <FormField
                control={form.control}
                name="menuTextColor"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right font-medium">Cor texto menu</FormLabel>
                    <div className="col-span-3 flex items-center gap-2">
                      <FormControl>
                        <Input 
                          {...field}
                          className="flex-grow" 
                          onChange={(e) => {
                            field.onChange(e);
                            handleValueChange('menuTextColor', e.target.value);
                          }}
                        />
                      </FormControl>
                      <Input 
                        type="color" 
                        value={field.value}
                        className="w-10 h-10 rounded cursor-pointer p-0" 
                        onChange={(e) => {
                          field.onChange(e);
                          handleValueChange('menuTextColor', e.target.value);
                        }}
                      />
                    </div>
                  </FormItem>
                )}
              />
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
                  type="submit" 
                  variant="primary"
                >
                  {submitButtonText}
                </CustomButton>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
