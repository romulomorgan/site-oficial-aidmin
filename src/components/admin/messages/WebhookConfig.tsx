
import React, { useState } from 'react';
import { ExternalLink, TestTube, Bot } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';
import { useWebhook } from '@/hooks/useWebhook';
import { toast } from 'sonner';
import { WebhookLog } from '@/utils/supabase/types';

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
  const { testWebhook, isTesting, getWebhookLogs } = useWebhook({
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 w-full">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Configurar Webhook</h2>
      <p className="text-sm text-gray-500 mb-4">
        Configure um endpoint para receber automaticamente as mensagens de contato em seu sistema.
        Todas as mensagens enviadas através do formulário de contato serão enviadas para esse URL.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full">
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
            onClick={handleTestWebhook}
            disabled={isLoading || isTesting || !webhookUrl.trim()}
            className="whitespace-nowrap"
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
        <div className="text-xs text-gray-500 flex items-center">
          <ExternalLink size={12} className="mr-1" />
          {webhookUrl ? `As mensagens serão enviadas via POST para: ${webhookUrl}` : 'Configure um URL para receber as mensagens'}
        </div>
        <CustomButton
          variant="ghost" 
          onClick={handleShowLogs}
          className="text-xs"
          size="sm"
        >
          {showWebhookLogs ? 'Ocultar Logs' : 'Mostrar Logs'}
        </CustomButton>
      </div>
      
      {showWebhookLogs && (
        <div className="mt-4 border rounded overflow-auto max-h-60">
          <div className="bg-gray-50 px-3 py-2 text-xs font-medium border-b">
            Logs recentes de Webhook
          </div>
          
          <div className="overflow-y-auto max-h-52">
            {webhookLogs.length > 0 ? (
              webhookLogs.map((log, index) => (
                <div key={index} className="border-b p-2 text-xs">
                  <div className="flex items-center gap-1">
                    <span className={`inline-block w-2 h-2 rounded-full ${log.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
                    <span className="font-medium">{new Date(log.timestamp).toLocaleString()}</span>
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
      )}
      
      <div className="mt-4 pt-4 border-t">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Bot className="h-4 w-4 mr-1" />
          Exemplos de payload enviados
        </h3>
        
        <div className="mt-2 border rounded overflow-hidden">
          <div className="bg-gray-50 px-3 py-2 text-xs font-medium border-b">
            Mensagem de Contato
          </div>
          <pre className="bg-black/90 text-white text-xs p-3 overflow-x-auto">
{JSON.stringify({
  type: 'contact_message',
  firstName: 'Nome do Usuário',
  lastName: 'Sobrenome do Usuário',
  email: 'email@exemplo.com',
  phone: '11912345678',
  message: 'Mensagem enviada pelo usuário',
  date: new Date().toISOString(),
  threadId: 'thread_123456',
  contactId: 'contact_123456'
}, null, 2)}
          </pre>
        </div>
        
        <div className="mt-3 border rounded overflow-hidden">
          <div className="bg-gray-50 px-3 py-2 text-xs font-medium border-b">
            Resposta à Mensagem
          </div>
          <pre className="bg-black/90 text-white text-xs p-3 overflow-x-auto">
{JSON.stringify({
  type: 'reply',
  to: 'usuario@exemplo.com',
  from: 'noreply@iadmin.com',
  subject: 'Re: Contato IAdmin - Nome Sobrenome',
  message: 'Obrigado pelo contato. Responderei em breve.',
  contactData: {
    firstName: 'Nome',
    lastName: 'Sobrenome',
    email: 'usuario@exemplo.com',
    phone: '11912345678',
    originalMessage: 'Mensagem original do usuário'
  },
  date: new Date().toISOString(),
  threadId: 'thread_123456',
  contactId: 'contact_123456'
}, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default WebhookConfig;
