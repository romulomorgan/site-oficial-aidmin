
import React from 'react';
import { Plus } from 'lucide-react';

interface CreateTemplateCardProps {
  onClick: () => void;
}

export const CreateTemplateCard: React.FC<CreateTemplateCardProps> = ({ onClick }) => {
  return (
    <div 
      className="template-create-card rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors template-animate"
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-2 text-gray-500">
        <Plus size={24} />
        <span>Criar Template Personalizado</span>
      </div>
    </div>
  );
};
