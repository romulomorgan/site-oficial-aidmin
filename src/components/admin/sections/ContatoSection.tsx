
import React from 'react';
import { CustomButton } from '@/components/ui/CustomButton';

interface ContatoSectionProps {
  sections: Record<string, string | boolean | number>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  handleNumberChange: (name: string, value: number) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => void;
}

const ContatoSection: React.FC<ContatoSectionProps> = ({
  sections,
  handleInputChange,
  handleSwitchChange,
  handleNumberChange,
  isLoading,
  handleSaveSection
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Seção de Contato</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="contatoTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Título da Página
          </label>
          <input
            id="contatoTitle"
            name="contatoTitle"
            type="text"
            value={sections.contatoTitle as string || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="contatoSubtitle" className="block text-sm font-medium text-gray-700 mb-1">
            Subtítulo
          </label>
          <input
            id="contatoSubtitle"
            name="contatoSubtitle"
            type="text"
            value={sections.contatoSubtitle as string || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="contatoDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            id="contatoDescription"
            name="contatoDescription"
            value={sections.contatoDescription as string || ''}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="contatoImageUrl" className="block text-sm font-medium text-gray-700 mb-1">
            URL da Imagem
          </label>
          <input
            id="contatoImageUrl"
            name="contatoImageUrl"
            type="text"
            value={sections.contatoImageUrl as string || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      
      <div className="mt-6">
        <CustomButton
          variant="primary"
          onClick={() => handleSaveSection('contato')}
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </CustomButton>
      </div>
    </div>
  );
};

export default ContatoSection;
