
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';
import { useWebhook } from '@/hooks/useWebhook';
import { toast } from 'sonner';

interface WebhookConfigProps {
  webhookUrl: string;
  isLoading: boolean;
  onWebhookChange: (url: string) => void;
  onSaveWebhook: () => void;
}

const WebhookConfig: React.FC<WebhookConfigProps> = ({
  webhookUrl,
  isLoading,
  onWebhookChange,
  onSaveWebhook
}) => {
  // Use the custom hook
  const { testWebhook, isTesting } = useWebhook();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Configurar Webhook</h2>
      <p className="text-sm text-gray-500 mb-4">
        Configure um endpoint para receber automaticamente as mensagens de contato em seu sistema.
        Todas as mensagens enviadas através do formulário de contato serão enviadas para esse URL.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        <input
          type="text"
          value={webhookUrl}
          onChange={(e) => onWebhookChange(e.target.value)}
          placeholder="https://seu-site.com/api/webhook"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md w-full"
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <CustomButton 
            variant="secondary" 
            onClick={() => testWebhook(webhookUrl)}
            disabled={isLoading || isTesting || !webhookUrl.trim()}
          >
            {isTesting ? 'Testando...' : 'Testar'}
          </CustomButton>
          <CustomButton 
            variant="primary" 
            onClick={onSaveWebhook} 
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </CustomButton>
        </div>
      </div>
      
      {webhookUrl && (
        <div className="mt-2 text-xs text-gray-500 flex items-center">
          <ExternalLink size={12} className="mr-1" />
          As mensagens serão enviadas via POST para: {webhookUrl}
        </div>
      )}
    </div>
  );
};

export default WebhookConfig;
