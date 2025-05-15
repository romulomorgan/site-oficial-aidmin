
import React, { useState } from 'react';
import { ColorTemplate } from '@/utils/supabase/types';
import { TemplateList } from '@/components/admin/templates/TemplateList';
import { TemplateDebugInfo } from '@/components/admin/templates/TemplateDebugInfo';

interface AppearanceTabProps {
  templates: ColorTemplate[];
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  onEditTemplate: (template: ColorTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
  onOpenCreateDialog: () => void;
}

export const AppearanceTab: React.FC<AppearanceTabProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onOpenCreateDialog
}) => {
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Templates de Cores</h2>
      <p className="text-gray-500 mb-6">
        Escolha um modelo de cores predefinido ou crie seu próprio tema personalizado.
      </p>
      
      <TemplateList 
        templates={templates}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={onSelectTemplate}
        onEditTemplate={onEditTemplate}
        onDeleteTemplate={onDeleteTemplate}
        onOpenCreateDialog={onOpenCreateDialog}
      />
      
      <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
        <h3 className="font-medium mb-2">Aplicação de Template</h3>
        <p className="text-sm text-gray-600">
          O template selecionado será aplicado a todas as páginas do site automaticamente, 
          incluindo Home, Soluções e Contato. As alterações serão refletidas assim que você salvar 
          as configurações.
        </p>
      </div>
      
      <TemplateDebugInfo 
        templates={templates}
        selectedTemplate={selectedTemplate}
        showDebugInfo={showDebugInfo}
        setShowDebugInfo={setShowDebugInfo}
      />
    </div>
  );
};
