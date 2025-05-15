
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface EmbedButtonConfigProps {
  embedButtonColor: string;
  setEmbedButtonColor: (color: string) => void;
  embedButtonIcon: string;
  setEmbedButtonIcon: (icon: string) => void;
}

export const EmbedButtonConfig: React.FC<EmbedButtonConfigProps> = ({
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

  return (
    <div className="space-y-4">
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
  );
};
