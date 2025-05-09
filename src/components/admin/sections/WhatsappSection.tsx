
import React from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { SectionProps } from '@/utils/supabase/types';

const WhatsappSection: React.FC<Omit<SectionProps, 'handleSwitchChange'>> = ({ 
  sections, 
  handleInputChange, 
  isLoading, 
  handleSaveSection 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "WhatsApp Integration"</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <input
            type="text"
            name="whatsappSubtitle"
            value={sections.whatsappSubtitle as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            name="whatsappTitle"
            value={sections.whatsappTitle as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            name="whatsappDescription"
            value={sections.whatsappDescription as string}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
          <input
            type="text"
            name="whatsappButtonText"
            value={sections.whatsappButtonText as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Link do Botão</label>
          <input
            type="text"
            name="whatsappButtonLink"
            value={sections.whatsappButtonLink as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
          <input
            type="text"
            name="whatsappImage"
            value={sections.whatsappImage as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="flex justify-end">
          <CustomButton 
            onClick={() => handleSaveSection('whatsapp')}
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default WhatsappSection;
