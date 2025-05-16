
import React from 'react';
import { ExternalLink, TestTube } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';

interface WebhookFormProps {
  webhookUrl: string;
  isLoading: boolean;
  isTesting: boolean;
  onWebhookChange: (url: string) => void;
  onSaveWebhook: () => void;
  onTestWebhook: () => void;
  onToggleLogs: () => void;
  showWebhookLogs: boolean;
}

const WebhookForm: React.FC<WebhookFormProps> = ({
  webhookUrl,
  isLoading,
  isTesting,
  onWebhookChange,
  onSaveWebhook,
  onTestWebhook,
  onToggleLogs,
  showWebhookLogs
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
        <input
          type="text"
          value={webhookUrl}
          onChange={(e) => onWebhookChange(e.target.value)}
          placeholder="https://seu-site.com/api/webhook"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md w-full text-gray-800"
        />
        <div className="flex gap-2 mt-2 sm:mt-0">
          <CustomButton 
            variant="secondary" 
            onClick={onTestWebhook}
            disabled={isLoading || isTesting || !webhookUrl.trim()}
            className="whitespace-nowrap bg-gray-200 text-gray-800 border-gray-300"
          >
            <TestTube className="h-4 w-4 mr-1" />
            {isTesting ? 'Testando...' : 'Testar'}
          </CustomButton>
          <CustomButton 
            variant="primary" 
            onClick={onSaveWebhook} 
            disabled={isLoading}
            className="whitespace-nowrap"
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </CustomButton>
        </div>
      </div>
      
      <div className="mt-2 flex items-center justify-between">
        <div className="text-xs text-gray-600 flex items-center">
          <ExternalLink size={12} className="mr-1" />
          {webhookUrl ? `As mensagens serão enviadas via POST para: ${webhookUrl}` : 'Configure um URL para receber as mensagens'}
        </div>
        <CustomButton
          variant="secondary" 
          onClick={onToggleLogs}
          className="text-xs bg-gray-200 text-gray-800 border-gray-300"
          size="sm"
        >
          {showWebhookLogs ? 'Ocultar Logs' : 'Mostrar Logs'}
        </CustomButton>
      </div>
    </>
  );
};

export default WebhookForm;
