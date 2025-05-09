
import React from 'react';
import { CustomButton } from '@/components/ui/CustomButton';

interface HeroSectionProps {
  sections: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  sections, 
  handleInputChange, 
  isLoading, 
  handleSaveSection 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Seção Principal (Hero)</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            name="heroTitle"
            value={sections.heroTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
          <textarea
            name="heroSubtitle"
            value={sections.heroSubtitle}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Texto do Botão</label>
          <input
            type="text"
            name="heroButtonText"
            value={sections.heroButtonText}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Link do Botão</label>
          <input
            type="text"
            name="heroButtonLink"
            value={sections.heroButtonLink}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL do Vídeo do YouTube</label>
          <input
            type="text"
            name="heroVideoUrl"
            value={sections.heroVideoUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="https://www.youtube.com/watch?v=XXXXXX ou https://youtu.be/XXXXXX"
          />
          <p className="text-xs text-gray-500 mt-1">Digite a URL completa do vídeo do YouTube</p>
          
          {sections.heroVideoUrl && (
            <div className="mt-3 p-2 border rounded-md">
              <p className="text-sm font-medium mb-1">Preview:</p>
              <div className="aspect-video bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">URL de vídeo configurada: {sections.heroVideoUrl}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <CustomButton 
            onClick={() => handleSaveSection('hero')}
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

export default HeroSection;
