
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
    <div className="bg-white rounded-lg shadow-sm p-6 w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Seção "Rodapé"</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
          <input
            type="text"
            name="companyName"
            value={sections.companyName as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <textarea
            name="footerAbout"
            value={sections.footerAbout as string}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
          <input
            type="text"
            name="footerPhoneNumber"
            value={sections.footerPhoneNumber as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            name="footerEmail"
            value={sections.footerEmail as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Cidade, Estado, País</label>
          <input
            type="text"
            name="footerLocation"
            value={sections.footerLocation as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
            placeholder="Ex: São Paulo, SP - Brasil"
          />
          <p className="text-xs text-gray-500 mt-1">Informe a localização que aparecerá no rodapé (ex: São Paulo, SP - Brasil)</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
          <input
            type="text"
            name="footerButtonText"
            value={sections.footerButtonText as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto de Copyright</label>
          <input
            type="text"
            name="copyrightText"
            value={sections.copyrightText as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo do Rodapé</label>
          <input
            type="text"
            name="footerLogoUrl"
            value={sections.footerLogoUrl as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
            placeholder="URL do logo para o rodapé"
          />
          {sections.footerLogoUrl && (
            <div className="mt-2 flex justify-center border rounded p-2 bg-gray-50">
              <img src={sections.footerLogoUrl as string} alt="Logo do Rodapé" className="h-12 object-contain" />
            </div>
          )}
        </div>

        <hr className="my-4" />
        
        <h3 className="text-md font-medium text-gray-800 mb-2 border-b pb-1">Redes Sociais</h3>
        
        <div className="space-y-4">
          <div className="border rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
            />
          </div>
          
          <div className="border rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
            />
          </div>
          
          <div className="border rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
            />
          </div>
          
          <div className="border rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
              <Switch 
                checked={sections.linkedinActive as boolean}
                onCheckedChange={(checked) => handleSwitchChange && handleSwitchChange('linkedinActive', checked)}
                id="linkedin-active"
              />
            </div>
            <input
              type="url"
              name="linkedinUrl"
              value={sections.linkedinUrl as string || ''}
              onChange={handleInputChange}
              placeholder="https://linkedin.com/company/suaempresa"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
            />
          </div>
        </div>
        
        <div className="flex justify-end mt-6 pt-4 border-t">
          <CustomButton 
            onClick={() => handleSaveSection('footer')}
            variant="primary"
            disabled={isLoading}
            className="relative px-6"
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
