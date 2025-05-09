
import React from 'react';
import { Eye } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';

interface EmbedTabProps {
  embedCode: string;
  setEmbedCode: (code: string) => void;
  embedPosition: 'left' | 'right';
  setEmbedPosition: (position: 'left' | 'right') => void;
  embedActive: boolean;
  setEmbedActive: (active: boolean) => void;
  embedButtonColor: string;
  setEmbedButtonColor: (color: string) => void;
  embedButtonIcon: string;
  setEmbedButtonIcon: (icon: string) => void;
}

export const EmbedTab: React.FC<EmbedTabProps> = ({
  embedCode,
  setEmbedCode,
  embedPosition,
  setEmbedPosition,
  embedActive,
  setEmbedActive,
  embedButtonColor,
  setEmbedButtonColor,
  embedButtonIcon,
  setEmbedButtonIcon
}) => {
  const handleEmbedButtonColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmbedButtonColor(e.target.value);
  };

  const handleEmbedButtonIconChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEmbedButtonIcon(e.target.value);
  };

  // Função para renderizar preview do ícone de botão
  const renderButtonIcon = () => {
    switch (embedButtonIcon) {
      case 'chat':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
      case 'help':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'message':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        );
      case 'phone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-4">Código Embed & Botão Flutuante</h2>
      <p className="text-gray-500 mb-4">
        Configure o código embed (chatbot, widget, etc) e personalize o botão flutuante que o abre.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="embedActive" className="text-sm font-medium">
            Ativar Embed
          </Label>
          <Switch
            id="embedActive"
            checked={embedActive}
            onCheckedChange={setEmbedActive}
          />
        </div>
        
        <div>
          <Label htmlFor="embedCode" className="block text-sm font-medium text-gray-700 mb-1">
            Código Embed (HTML)
          </Label>
          <Textarea
            id="embedCode"
            value={embedCode}
            onChange={(e) => setEmbedCode(e.target.value)}
            placeholder="<script>...</script> ou <div>...</div>"
            className="w-full h-32 font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Cole aqui o código HTML fornecido pelo serviço (chatbot, widget, etc).
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-md font-medium text-gray-800">Posição no Site</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="position-left"
                  name="embedPosition"
                  checked={embedPosition === 'left'}
                  onChange={() => setEmbedPosition('left')}
                  className="mr-2"
                />
                <label htmlFor="position-left">Canto Inferior Esquerdo</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="position-right"
                  name="embedPosition"
                  checked={embedPosition === 'right'}
                  onChange={() => setEmbedPosition('right')}
                  className="mr-2"
                />
                <label htmlFor="position-right">Canto Inferior Direito</label>
              </div>
            </div>
            
            <div>
              <Label htmlFor="embedButtonColor" className="block text-sm font-medium text-gray-700 mb-1">
                Cor do Botão
              </Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  id="embedButtonColor"
                  value={embedButtonColor}
                  onChange={handleEmbedButtonColorChange}
                  className="w-12 h-10 p-1"
                />
                <Input
                  type="text"
                  value={embedButtonColor}
                  onChange={handleEmbedButtonColorChange}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="embedButtonIcon" className="block text-sm font-medium text-gray-700 mb-1">
                Ícone do Botão
              </Label>
              <select
                id="embedButtonIcon"
                value={embedButtonIcon}
                onChange={handleEmbedButtonIconChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="chat">Chat / Mensagem</option>
                <option value="help">Ajuda / Suporte</option>
                <option value="message">Email / Mensagem</option>
                <option value="phone">Telefone</option>
              </select>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3 flex items-center gap-2">
              <Eye size={18} />
              Visualização
            </h3>
            <div className="border rounded-lg p-6 bg-gray-100 h-60 relative">
              {embedActive ? (
                <div className={`absolute bottom-4 ${embedPosition === 'left' ? 'left-4' : 'right-4'}`}>
                  <button
                    className="rounded-full shadow-lg p-3"
                    style={{ backgroundColor: embedButtonColor, color: 'white' }}
                  >
                    {renderButtonIcon()}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Embed desativado
                </div>
              )}
            </div>
            <p className="text-xs text-center mt-2 text-gray-500">
              O botão flutuante abrirá o conteúdo embed quando clicado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
