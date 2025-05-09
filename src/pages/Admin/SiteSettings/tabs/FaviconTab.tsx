
import React from 'react';
import { Globe } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FaviconTabProps {
  faviconUrl: string;
  setFaviconUrl: (url: string) => void;
  siteTitle: string;
  setSiteTitle: (title: string) => void;
  copyrightText: string;
  setCopyrightText: (text: string) => void;
}

export const FaviconTab: React.FC<FaviconTabProps> = ({
  faviconUrl,
  setFaviconUrl,
  siteTitle,
  setSiteTitle,
  copyrightText,
  setCopyrightText
}) => {
  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFaviconUrl(e.target.value);
  };

  const handleSiteTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSiteTitle(e.target.value);
  };
  
  const handleCopyrightTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCopyrightText(e.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-4">Favicon e Título do Site</h2>
      <p className="text-gray-500 mb-4">
        Defina o ícone que será exibido na aba do navegador e o título da página.
      </p>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL do Favicon (PNG/JPG recomendados)
            </label>
            <input
              type="text"
              value={faviconUrl}
              onChange={handleFaviconChange}
              placeholder="/lovable-uploads/favicon.png ou URL externa"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              Recomendamos utilizar imagens quadradas em formato PNG ou JPG.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visualização do Favicon
            </label>
            <div className="border rounded-lg p-4 bg-gray-50 flex flex-col items-center justify-center">
              <div className="border bg-white rounded p-2 mb-2 flex items-center justify-center">
                {faviconUrl ? (
                  <img
                    src={faviconUrl}
                    alt="Favicon"
                    className="w-8 h-8 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/lovable-uploads/c739c386-c6c9-4bb8-9996-98b3a3161fad.png';
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 flex items-center justify-center text-gray-400">
                    <Globe size={24} />
                  </div>
                )}
              </div>
              <div className="text-xs text-gray-500 text-center">
                Prévia da visualização no navegador
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Label htmlFor="siteTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Título do Site
          </Label>
          <Input
            id="siteTitle"
            type="text"
            value={siteTitle}
            onChange={handleSiteTitleChange}
            placeholder="IAdmin"
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Este título será exibido na barra de navegação e na aba do navegador.
          </p>
        </div>
        
        <div>
          <Label htmlFor="copyrightText" className="block text-sm font-medium text-gray-700 mb-1">
            Texto de Copyright
          </Label>
          <Input
            id="copyrightText"
            type="text"
            value={copyrightText}
            onChange={handleCopyrightTextChange}
            placeholder="© Todos os direitos reservados - IAdmin 2024"
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Este texto será exibido no rodapé de todas as páginas.
          </p>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-2">Exemplos de URLs válidas:</p>
          <ul className="text-xs text-gray-500 list-disc pl-4">
            <li>/lovable-uploads/meu-favicon.png</li>
            <li>https://exemplo.com/imagens/favicon.png</li>
            <li>/lovable-uploads/c739c386-c6c9-4bb8-9996-98b3a3161fad.png</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
