
import React from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';

interface SolucaoItemProps {
  index: number;
  sections: Record<string, string | boolean | number>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
}

// Component for individual solution
export const SolucaoItem: React.FC<SolucaoItemProps> = ({
  index,
  sections,
  handleInputChange,
  handleSwitchChange
}) => {
  const baseKey = `solucao${index}`;
  const layoutKey = `${baseKey}Layout`;
  const layoutValue = sections[layoutKey];
  const isImageLeft = layoutValue === 'image-left' || layoutValue === true;
  
  return (
    <div className="p-4 border rounded-md mb-4">
      <h4 className="text-md font-medium mb-2">Solução {index}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor={`${baseKey}Title`} className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            id={`${baseKey}Title`}
            name={`${baseKey}Title`}
            type="text"
            value={sections[`${baseKey}Title`] as string || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor={`${baseKey}Image`} className="block text-sm font-medium text-gray-700 mb-1">
            URL da Imagem
          </label>
          <input
            id={`${baseKey}Image`}
            name={`${baseKey}Image`}
            type="text"
            value={sections[`${baseKey}Image`] as string || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mt-2">
        <label htmlFor={`${baseKey}Description`} className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id={`${baseKey}Description`}
          name={`${baseKey}Description`}
          value={sections[`${baseKey}Description`] as string || ''}
          onChange={handleInputChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mt-2 flex items-center">
        <div className="flex items-center gap-2">
          <Switch 
            id={layoutKey}
            checked={isImageLeft}
            onCheckedChange={(checked) => handleSwitchChange(layoutKey, checked)}
          />
          <Label htmlFor={layoutKey}>
            {isImageLeft ? 'Imagem à esquerda, texto à direita' : 'Texto à esquerda, imagem à direita'}
          </Label>
        </div>
      </div>
    </div>
  );
};

interface SolucoesSectionProps {
  sections: Record<string, string | boolean | number>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange: (name: string, checked: boolean) => void;
  handleNumberChange: (name: string, value: number) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => void;
}

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SolucoesSection: React.FC<SolucoesSectionProps> = ({
  sections,
  handleInputChange,
  handleSwitchChange,
  handleNumberChange,
  isLoading,
  handleSaveSection
}) => {
  const solucoesCount = Number(sections.solucoesCount) || 1;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Seção de Soluções</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="solucoesTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Título da Página
          </label>
          <input
            id="solucoesTitle"
            name="solucoesTitle"
            type="text"
            value={sections.solucoesTitle as string || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="solucoesSubtitle" className="block text-sm font-medium text-gray-700 mb-1">
            Subtítulo
          </label>
          <input
            id="solucoesSubtitle"
            name="solucoesSubtitle"
            type="text"
            value={sections.solucoesSubtitle as string || ''}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div>
          <label htmlFor="solucoesDescription" className="block text-sm font-medium text-gray-700 mb-1">
            Descrição
          </label>
          <textarea
            id="solucoesDescription"
            name="solucoesDescription"
            value={sections.solucoesDescription as string || ''}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        {/* Seção de informações do AI Robot */}
        <div className="border-t pt-4 mt-6">
          <h3 className="text-lg font-medium mb-4">Seção "Adote a Nossa AI"</h3>
          
          <div>
            <label htmlFor="solucoesAITitle" className="block text-sm font-medium text-gray-700 mb-1">
              Título da Seção AI
            </label>
            <input
              id="solucoesAITitle"
              name="solucoesAITitle"
              type="text"
              value={sections.solucoesAITitle as string || 'Conectamos a nossa AI aos seus processos operacionais'}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-3">
            <label htmlFor="solucoesAISubtitle" className="block text-sm font-medium text-gray-700 mb-1">
              Subtítulo da Seção AI
            </label>
            <input
              id="solucoesAISubtitle"
              name="solucoesAISubtitle"
              type="text"
              value={sections.solucoesAISubtitle as string || 'ADOTE A NOSSA AI'}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-3">
            <label htmlFor="solucoesAIImage" className="block text-sm font-medium text-gray-700 mb-1">
              URL da Imagem do Robô
            </label>
            <input
              id="solucoesAIImage"
              name="solucoesAIImage"
              type="text"
              value={sections.solucoesAIImage as string || sections.robotImage as string}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-3">
            <label htmlFor="solucoesAIDescription1" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição Parte 1
            </label>
            <textarea
              id="solucoesAIDescription1"
              name="solucoesAIDescription1"
              value={sections.solucoesAIDescription1 as string || 'Na IAdmin, conectamos nossa inteligência artificial diretamente aos seus processos operacionais, transformando a maneira como sua empresa executa tarefas e toma decisões.'}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-3">
            <label htmlFor="solucoesAIDescription2" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição Parte 2 (com BPO-PN)
            </label>
            <textarea
              id="solucoesAIDescription2"
              name="solucoesAIDescription2"
              value={sections.solucoesAIDescription2 as string || 'Por meio do BPO-PN (Business Process Optimization - Processos de Negócios), otimizamos fluxos administrativos, financeiros e contratuais, garantindo maior eficiência e redução de custos. Já com o BPO-P&D (Business Process Optimization - Projetos e Desenvolvimento), nossa AI atua na gestão de projetos, aprimorando cronogramas, prevendo gargalos e gerando insights para um planejamento mais assertivo.'}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="mt-3">
            <label htmlFor="solucoesAIDescription3" className="block text-sm font-medium text-gray-700 mb-1">
              Descrição Parte 3
            </label>
            <textarea
              id="solucoesAIDescription3"
              name="solucoesAIDescription3"
              value={sections.solucoesAIDescription3 as string || 'Essa integração possibilita uma automação inteligente que vai além da execução de tarefas, criando um ambiente onde dados são utilizados de forma estratégica para potencializar resultados e ampliar sua competitividade no mercado. Seja na construção civil, condomínios ou outros segmentos, nossa tecnologia trabalha em sintonia com seus processos, garantindo maior produtividade e inovação.'}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        
        <div className="border-t pt-4 mt-6">
          <h3 className="text-lg font-medium mb-4">Soluções Personalizadas</h3>
          
          <div className="mb-4">
            <label htmlFor="solucoesCount" className="block text-sm font-medium text-gray-700 mb-1">
              Número de Soluções (máximo 5)
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={solucoesCount} 
                onChange={(e) => handleNumberChange('solucoesCount', parseInt(e.target.value))}
                className="w-40"
              />
              <span className="text-sm font-medium">{solucoesCount}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            {Array.from({ length: solucoesCount }).map((_, idx) => (
              <SolucaoItem 
                key={idx} 
                index={idx + 1}
                sections={sections}
                handleInputChange={handleInputChange}
                handleSwitchChange={handleSwitchChange}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <CustomButton
          variant="primary"
          onClick={() => handleSaveSection('solucoes')}
          disabled={isLoading}
        >
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </CustomButton>
      </div>
    </div>
  );
};

export default SolucoesSection;
