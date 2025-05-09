
import React from 'react';
import { CustomButton } from '@/components/ui/CustomButton';

interface FooterSectionProps {
  sections: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({ 
  sections, 
  handleInputChange, 
  isLoading, 
  handleSaveSection 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "Rodapé"</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
          <input
            type="text"
            name="companyName"
            value={sections.companyName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            name="footerAbout"
            value={sections.footerAbout}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <input
            type="text"
            name="footerPhoneNumber"
            value={sections.footerPhoneNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            name="footerEmail"
            value={sections.footerEmail}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
          <input
            type="text"
            name="footerButtonText"
            value={sections.footerButtonText}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto de Copyright</label>
          <input
            type="text"
            name="copyrightText"
            value={sections.copyrightText}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <hr className="my-4" />
        
        <h3 className="text-md font-medium text-gray-800 mb-2">Redes Sociais</h3>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL do Facebook</label>
          <input
            type="url"
            name="facebookUrl"
            value={sections.facebookUrl || ''}
            onChange={handleInputChange}
            placeholder="https://facebook.com/suapagina"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL do Instagram</label>
          <input
            type="url"
            name="instagramUrl"
            value={sections.instagramUrl || ''}
            onChange={handleInputChange}
            placeholder="https://instagram.com/suapagina"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL do Twitter</label>
          <input
            type="url"
            name="twitterUrl"
            value={sections.twitterUrl || ''}
            onChange={handleInputChange}
            placeholder="https://twitter.com/suapagina"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="flex justify-end">
          <CustomButton 
            onClick={() => handleSaveSection('footer')}
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

export default FooterSection;
