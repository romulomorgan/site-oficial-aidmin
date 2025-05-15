
import React from 'react';
import { Label } from "@/components/ui/label";
import { Textarea } from '@/components/ui/textarea';

interface EmbedCodeEditorProps {
  embedCode: string;
  setEmbedCode: (code: string) => void;
}

export const EmbedCodeEditor: React.FC<EmbedCodeEditorProps> = ({
  embedCode,
  setEmbedCode
}) => {
  return (
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
  );
};
