
import React from 'react';
import { ColorTemplate } from '@/utils/supabase/types';
import { Check, Trash, Edit } from 'lucide-react';

interface TemplateCardProps {
  template: ColorTemplate;
  isSelected: boolean;
  onSelect: (templateId: string) => void;
  onEdit?: (template: ColorTemplate) => void;
  onDelete?: (templateId: string) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  isSelected,
  onSelect,
  onEdit,
  onDelete
}) => {
  // Verifica se o template é do sistema ou customizado
  const isSystemTemplate = template.id === "default" || template.id.includes('modern-');
  const canModify = !isSystemTemplate;

  // Função para converter cores hexadecimais em RGB para uso em variáveis CSS
  const hexToRgb = (hex: string): string => {
    // Remover o # se presente
    hex = hex.replace('#', '');
    
    // Converter para RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    return `${r}, ${g}, ${b}`;
  };

  return (
    <div 
      className={`template-card border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-[#FF196E]' : ''
      } template-animate`}
      onClick={() => onSelect(template.id)}
      style={{
        '--primary-color': template.primaryColor,
        '--accent-color': template.accentColor,
        '--primary-color-rgb': hexToRgb(template.primaryColor)
      } as React.CSSProperties}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-medium">{template.name}</h3>
        <div className="flex items-center gap-2">
          {isSelected && (
            <Check size={16} className="text-[#FF196E]" />
          )}
          {canModify && (
            <>
              <button
                type="button"
                className="text-blue-500 hover:text-blue-700"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  if (onEdit) onEdit(template); 
                }}
              >
                <Edit size={16} />
              </button>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onDelete && window.confirm('Tem certeza que deseja excluir este template?')) {
                    onDelete(template.id);
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
            className="template-color-dot w-6 h-6 rounded-full border animate-pulse"
            style={{ backgroundColor: template.primaryColor }}
            title="Cor Primária"
          />
          <div
            className="template-color-dot w-6 h-6 rounded-full border"
            style={{ backgroundColor: template.secondaryColor }}
            title="Cor Secundária"
          />
          <div
            className="template-color-dot w-6 h-6 rounded-full border"
            style={{ backgroundColor: template.accentColor }}
            title="Cor de Destaque"
          />
        </div>
        <div className="text-xs text-gray-500 mt-2">
          {template.id === "default" ? "Modelo padrão" : 
          template.id.includes('modern-') ? "Modelo moderno" : "Personalizado"}
        </div>
      </div>
    </div>
  );
};
