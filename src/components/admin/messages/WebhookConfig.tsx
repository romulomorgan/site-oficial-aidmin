
import React, { useState } from 'react';
import { useWebhook } from '@/hooks/useWebhook';
import { toast } from 'sonner';
import { WebhookLog } from '@/utils/supabase/types';
import WebhookForm from './webhook/WebhookForm';
import WebhookLogs from './webhook/WebhookLogs';
import WebhookPayloadExamples from './webhook/WebhookPayloadExamples';

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
  const [showWebhookLogs, setShowWebhookLogs] = useState(false);
  const [webhookLogs, setWebhookLogs] = useState<WebhookLog[]>([]);
  
  // Use the custom hook
  const { testWebhook, isTesting, getWebhookLogs, clearWebhookLogs } = useWebhook({
    onSuccess: async () => {
      toast.success('Teste de webhook realizado com sucesso!');
      // Atualizar logs após teste bem-sucedido
      const logs = await getWebhookLogs();
      setWebhookLogs(logs);
      setShowWebhookLogs(true);
    },
    onError: (error) => {
      toast.error('Erro no teste do webhook: ' + (error.message || 'Erro desconhecido'));
    }
  });

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      toast.error('Por favor, insira uma URL de webhook para testar.');
      return;
    }

    // Criar payload de teste mais completo
    const testData = {
      firstName: 'Usuário',
      lastName: 'Teste',
      email: 'usuario.teste@exemplo.com',
      phone: '(11) 98765-4321',
      message: 'Esta é uma mensagem de teste para verificar a funcionalidade do webhook.',
      date: new Date().toISOString(),
      threadId: `thread_test_${Date.now()}`,
      contactId: `contact_test_${Date.now()}`
    };
    
    await testWebhook(webhookUrl, testData);
    
    // Carregar logs atualizados
    const logs = await getWebhookLogs();
    setWebhookLogs(logs);
  };
  
  const handleShowLogs = async () => {
    if (!showWebhookLogs) {
      const logs = await getWebhookLogs();
      setWebhookLogs(logs);
    }
    setShowWebhookLogs(!showWebhookLogs);
  };

  const handleClearLogs = async () => {
    await clearWebhookLogs();
    setWebhookLogs([]);
    toast.success('Logs limpos com sucesso!');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 w-full">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Configurar Webhook</h2>
      <p className="text-sm text-gray-600 mb-4">
        Configure um endpoint para receber automaticamente as mensagens de contato em seu sistema.
        Todas as mensagens enviadas através do formulário de contato serão enviadas para esse URL.
      </p>
      
      <WebhookForm 
        webhookUrl={webhookUrl}
        isLoading={isLoading}
        isTesting={isTesting}
        onWebhookChange={onWebhookChange}
        onSaveWebhook={onSaveWebhook}
        onTestWebhook={handleTestWebhook}
        onToggleLogs={handleShowLogs}
        showWebhookLogs={showWebhookLogs}
      />
      
      <WebhookLogs 
        webhookLogs={webhookLogs} 
        showWebhookLogs={showWebhookLogs} 
        onClearLogs={handleClearLogs}
      />
      
      <WebhookPayloadExamples />
    </div>
  );
};

export default WebhookConfig;
