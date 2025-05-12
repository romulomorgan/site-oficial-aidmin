
import React, { useState } from 'react';
import { ColorTemplate } from '@/utils/supabase/types';
import { Check, Trash, Edit, Plus, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AppearanceTabProps {
  templates: ColorTemplate[];
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  onEditTemplate: (template: ColorTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
  onOpenCreateDialog: () => void;
}

export const AppearanceTab: React.FC<AppearanceTabProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onOpenCreateDialog
}) => {
  const [showDebugInfo, setShowDebugInfo] = useState(false);

  // Função para depurar problemas com os templates
  const debugTemplates = () => {
    setShowDebugInfo(!showDebugInfo);
    console.log("Templates disponíveis:", templates);
    console.log("Template selecionado:", selectedTemplate);
    console.log("Template selecionado detalhes:", templates.find(t => t.id === selectedTemplate));
  };

  // Função para testar se um template pode ser salvo no banco de dados
  const testTemplateSave = async () => {
    if (templates.length > 0) {
      const testTemplate = {
        ...templates[0],
        id: `test_${Date.now()}`,
        name: `Teste ${Date.now()}`
      };

      try {
        console.log("Tentando salvar template de teste:", testTemplate);
        
        const response = await fetch('/api/test-template', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testTemplate),
        });

        if (response.ok) {
          toast.success('Teste de template concluído com sucesso!');
        } else {
          toast.error('Erro ao testar salvamento de template');
        }
      } catch (error) {
        console.error("Erro ao testar template:", error);
        toast.error('Erro ao testar template');
      }
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Templates de Cores</h2>
      <p className="text-gray-500 mb-6">
        Escolha um modelo de cores predefinido ou crie seu próprio tema personalizado.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`template-card border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id ? 'ring-2 ring-[#FF196E]' : ''
            } template-animate`}
            onClick={() => onSelectTemplate(template.id)}
            style={{
              '--primary-color': template.primaryColor,
              '--accent-color': template.accentColor,
              '--primary-color-rgb': hexToRgb(template.primaryColor)
            } as React.CSSProperties}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium">{template.name}</h3>
              <div className="flex items-center gap-2">
                {selectedTemplate === template.id && (
                  <Check size={16} className="text-[#FF196E]" />
                )}
                {!template.id.includes('modern-') && template.id !== 'default' && (
                  <>
                    <button
                      type="button"
                      className="text-blue-500 hover:text-blue-700"
                      onClick={(e) => { e.stopPropagation(); onEditTemplate(template); }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Tem certeza que deseja excluir este template?')) {
                          onDeleteTemplate(template.id);
                        }
                      }}
                    >
                      <Trash size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <div
                  className="template-color-dot w-6 h-6 rounded-full border animate-pulse"
                  style={{ backgroundColor: template.primaryColor }}
                  title="Cor Primária"
                />
                <div
                  className="template-color-dot w-6 h-6 rounded-full border"
                  style={{ backgroundColor: template.secondaryColor }}
                  title="Cor Secundária"
                />
                <div
                  className="template-color-dot w-6 h-6 rounded-full border"
                  style={{ backgroundColor: template.accentColor }}
                  title="Cor de Destaque"
                />
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {template.id === "default" ? "Modelo padrão" : 
                 template.id.includes('modern-') ? "Modelo moderno" : "Personalizado"}
              </div>
            </div>
          </div>
        ))}
        
        <div 
          className="template-create-card rounded-lg p-4 flex items-center justify-center cursor-pointer hover:bg-gray-50 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors template-animate"
          onClick={onOpenCreateDialog}
        >
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <Plus size={24} />
            <span>Criar Template Personalizado</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-gray-50 p-4 rounded-lg border">
        <h3 className="font-medium mb-2">Aplicação de Template</h3>
        <p className="text-sm text-gray-600">
          O template selecionado será aplicado a todas as páginas do site automaticamente, 
          incluindo Home, Soluções e Contato. As alterações serão refletidas assim que você salvar 
          as configurações.
        </p>
      </div>
      
      {templates.length === 0 && (
        <div className="mt-4 bg-yellow-50 border border-yellow-300 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertCircle size={18} className="text-yellow-600 mr-2 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Nenhum template disponível</h3>
              <p className="text-yellow-700 text-sm mt-1">
                Não foi possível carregar os templates de cores. Por favor, atualize a página ou contate o suporte se o problema persistir.
              </p>
              <button
                onClick={debugTemplates}
                className="text-xs text-yellow-900 underline mt-2"
              >
                Exibir informações de depuração
              </button>
            </div>
          </div>
          
          {showDebugInfo && (
            <div className="mt-4 p-3 bg-gray-100 rounded text-xs font-mono">
              <p>Templates carregados: {templates.length}</p>
              <p>Template selecionado: {selectedTemplate || "nenhum"}</p>
              <button 
                onClick={testTemplateSave}
                className="mt-2 px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-xs"
              >
                Testar salvamento de template
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Função utilitária para converter cores hexadecimais em RGB para uso em variáveis CSS
const hexToRgb = (hex: string): string => {
  // Remover o # se presente
  hex = hex.replace('#', '');
  
  // Converter para RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
};
