
import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ColorTemplate } from '@/utils/supabase/types';
import { toast } from 'sonner';

interface TemplateDebugInfoProps {
  templates: ColorTemplate[];
  selectedTemplate: string;
  showDebugInfo: boolean;
  setShowDebugInfo: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TemplateDebugInfo: React.FC<TemplateDebugInfoProps> = ({
  templates,
  selectedTemplate,
  showDebugInfo,
  setShowDebugInfo
}) => {
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

  if (templates.length > 0) return null;
  
  return (
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
  );
};
