
import React from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { SectionProps } from '@/utils/supabase/types';

const HeaderSection: React.FC<Omit<SectionProps, 'handleSwitchChange'>> = ({ 
  sections, 
  handleInputChange, 
  isLoading, 
  handleSaveSection 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Cabeçalho do Site</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título do Site</label>
          <input
            type="text"
            name="siteTitle"
            value={sections.siteTitle as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Nome do site/empresa"
          />
          <p className="text-xs text-gray-500 mt-1">Este título será exibido na barra de navegação e na aba do navegador.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL do Logo</label>
          <input
            type="text"
            name="logoUrl"
            value={sections.logoUrl as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="URL da imagem do logo"
          />
          {sections.logoUrl && (
            <div className="mt-2 flex justify-center">
              <img src={sections.logoUrl as string} alt="Preview do Logo" className="h-16 w-16 object-contain border rounded" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL do Favicon</label>
          <input
            type="text"
            name="faviconUrl"
            value={sections.faviconUrl as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="URL do ícone do site (formato PNG recomendado)"
          />
          <p className="text-xs text-gray-500 mt-1">O favicon é o ícone que aparece na aba do navegador. Recomendamos imagens PNG quadradas.</p>
          {sections.faviconUrl && (
            <div className="mt-2 flex justify-center">
              <img src={sections.faviconUrl as string} alt="Preview do Favicon" className="h-8 w-8 object-contain border rounded" />
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <CustomButton 
            onClick={() => handleSaveSection('header')}
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

export default HeaderSection;
