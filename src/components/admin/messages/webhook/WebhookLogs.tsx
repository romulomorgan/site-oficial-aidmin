
import React from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { WebhookLog } from '@/utils/supabase/types';

interface WebhookLogsProps {
  webhookLogs: WebhookLog[];
  showWebhookLogs: boolean;
  onClearLogs?: () => void;
}

const WebhookLogs: React.FC<WebhookLogsProps> = ({
  webhookLogs,
  showWebhookLogs,
  onClearLogs
}) => {
  if (!showWebhookLogs) return null;
  
  return (
    <div className="mt-4 border rounded overflow-auto max-h-60">
      <div className="bg-gray-50 px-3 py-2 text-xs font-medium border-b text-gray-700 flex justify-between items-center">
        <span>Logs recentes de Webhook</span>
        {onClearLogs && (
          <CustomButton
            variant="secondary"
            onClick={onClearLogs}
            className="text-xs bg-gray-200 text-gray-800 border-gray-300"
            size="sm"
          >
            Limpar Logs
          </CustomButton>
        )}
      </div>
      
      <div className="overflow-y-auto max-h-52">
        {webhookLogs.length > 0 ? (
          webhookLogs.map((log, index) => (
            <div key={index} className="border-b p-2 text-xs">
              <div className="flex items-center gap-1">
                <span className={`inline-block w-2 h-2 rounded-full ${log.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <span className="font-medium text-gray-700">{new Date(log.timestamp).toLocaleString()}</span>
                <span className="text-gray-500 ml-2">({log.type || 'mensagem'})</span>
              </div>
              <div className="text-gray-600 ml-3 mt-1">
                <span>Status: {log.status || 'N/A'}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 text-center text-gray-500 text-sm">
            Nenhum log de webhook disponível
          </div>
        )}
      </div>
    </div>
  );
};

export default WebhookLogs;
