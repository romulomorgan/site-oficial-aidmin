
import React from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { Switch } from '@/components/ui/switch';
import { SectionProps } from '@/utils/supabase/types';

const FooterSection: React.FC<SectionProps> = ({ 
  sections, 
  handleInputChange,
  handleSwitchChange,
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
            value={sections.companyName as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            name="footerAbout"
            value={sections.footerAbout as string}
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
            value={sections.footerPhoneNumber as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            name="footerEmail"
            value={sections.footerEmail as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
          <input
            type="text"
            name="footerButtonText"
            value={sections.footerButtonText as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto de Copyright</label>
          <input
            type="text"
            name="copyrightText"
            value={sections.copyrightText as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <hr className="my-4" />
        
        <h3 className="text-md font-medium text-gray-800 mb-2">Redes Sociais</h3>
        
        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Facebook</label>
              <Switch 
                checked={sections.facebookActive as boolean}
                onCheckedChange={(checked) => handleSwitchChange && handleSwitchChange('facebookActive', checked)}
                id="facebook-active"
              />
            </div>
            <input
              type="url"
              name="facebookUrl"
              value={sections.facebookUrl as string || ''}
              onChange={handleInputChange}
              placeholder="https://facebook.com/suapagina"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Instagram</label>
              <Switch 
                checked={sections.instagramActive as boolean}
                onCheckedChange={(checked) => handleSwitchChange && handleSwitchChange('instagramActive', checked)}
                id="instagram-active"
              />
            </div>
            <input
              type="url"
              name="instagramUrl"
              value={sections.instagramUrl as string || ''}
              onChange={handleInputChange}
              placeholder="https://instagram.com/suapagina"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="border rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Twitter</label>
              <Switch 
                checked={sections.twitterActive as boolean}
                onCheckedChange={(checked) => handleSwitchChange && handleSwitchChange('twitterActive', checked)}
                id="twitter-active"
              />
            </div>
            <input
              type="url"
              name="twitterUrl"
              value={sections.twitterUrl as string || ''}
              onChange={handleInputChange}
              placeholder="https://twitter.com/suapagina"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
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
