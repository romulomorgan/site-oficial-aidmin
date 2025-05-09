
import React from 'react';
import { ColorTemplate } from '@/utils/supabase/types';
import { Check, Trash, Edit, Plus } from 'lucide-react';

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
  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-4">Templates de Cores</h2>
      <p className="text-gray-500 mb-6">
        Escolha um modelo de cores predefinido ou crie seu próprio tema personalizado.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id ? 'ring-2 ring-[#FF196E]' : ''
            }`}
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium">{template.name}</h3>
              <div className="flex items-center gap-2">
                {selectedTemplate === template.id && (
                  <Check size={16} className="text-[#FF196E]" />
                )}
                {template.id !== 'default' && (
                  <>
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={(e) => { e.stopPropagation(); onEditTemplate(template); }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Tem certeza que deseja excluir este template?')) {
                          onDeleteTemplate(template.id);
                        }
                      }}
                    >
                      <Trash size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: template.primaryColor }}
                  title="Cor Primária"
                />
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: template.secondaryColor }}
                  title="Cor Secundária"
                />
                <div
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: template.accentColor }}
                  title="Cor de Destaque"
                />
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {template.id === "default" ? "Modelo padrão" : "Personalizado"}
              </div>
            </div>
          </div>
        ))}
        
        <div 
          className="border border-dashed rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50"
          onClick={onOpenCreateDialog}
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <Plus size={24} />
            <span>Criar Template Personalizado</span>
          </div>
        </div>
      </div>
    </div>
  );
};
