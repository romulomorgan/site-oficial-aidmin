
import React from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { SectionProps } from '@/utils/supabase/types';

const WhatWeDoSection: React.FC<Omit<SectionProps, 'handleSwitchChange'>> = ({ 
  sections, 
  handleInputChange, 
  isLoading, 
  handleSaveSection 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "O que Fazemos de Melhor"</h2>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
            <input
              type="text"
              name="whatWeDoSubtitle"
              value={sections.whatWeDoSubtitle as string}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="whatWeDoTitle"
              value={sections.whatWeDoTitle as string}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="font-medium text-gray-800 mb-4">Cartão: Assistente de IA</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                name="assistantCardTitle"
                value={sections.assistantCardTitle as string}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
              <input
                type="text"
                name="assistantCardImage"
                value={sections.assistantCardImage as string}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              name="assistantCardDescription"
              value={sections.assistantCardDescription as string}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="font-medium text-gray-800 mb-4">Cartão: BPO com Processos de Negócios</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                name="bpoProcessosCardTitle"
                value={sections.bpoProcessosCardTitle as string}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
              <input
                type="text"
                name="bpoProcessosCardImage"
                value={sections.bpoProcessosCardImage as string}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              name="bpoProcessosCardDescription"
              value={sections.bpoProcessosCardDescription as string}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="font-medium text-gray-800 mb-4">Cartão: BPO com Projetos e Desenvolvimento</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                name="bpoProjetosCardTitle"
                value={sections.bpoProjetosCardTitle as string}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL da Imagem</label>
              <input
                type="text"
                name="bpoProjetosCardImage"
                value={sections.bpoProjetosCardImage as string}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              name="bpoProjetosCardDescription"
              value={sections.bpoProjetosCardDescription as string}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <CustomButton 
            onClick={() => handleSaveSection('whatWeDo')}
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

export default WhatWeDoSection;
