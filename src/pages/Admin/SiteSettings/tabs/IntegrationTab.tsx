
import React, { useState, useEffect } from 'react';
import { Webhook, Logs } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from '@/components/ui/scroll-area';
import { getWebhookLogs, clearWebhookLogs } from '@/utils/supabase/webhooks';
import { toast } from 'sonner';
import { useWebhook } from '@/hooks/useWebhook';
import { supabase } from '@/integrations/supabase/client';

interface IntegrationTabProps {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  webhookLogs: any[];
  setWebhookLogs: (logs: any[]) => void;
}

export const IntegrationTab: React.FC<IntegrationTabProps> = ({
  webhookUrl,
  setWebhookUrl,
  webhookLogs,
  setWebhookLogs
}) => {
  const [testingWebhook, setTestingWebhook] = useState(false);
  const [webhookTestResult, setWebhookTestResult] = useState<{success: boolean, status?: number, message?: string, payload?: any} | null>(null);
  const [showWebhookLogs, setShowWebhookLogs] = useState(false);
  
  // Usar o hook personalizado para testar webhook
  const { testWebhook, isTesting, lastTestResult } = useWebhook({
    onSuccess: () => {
      // Atualizar logs após teste bem-sucedido
      loadWebhookLogs();
    }
  });

  useEffect(() => {
    // Carregar logs de webhook ao montar o componente
    loadWebhookLogs();
  }, []);

  const loadWebhookLogs = async () => {
    // Tentar carregar logs do banco de dados primeiro
    try {
      const { data: logsData, error } = await supabase
        .from('webhook_logs')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);
        
      if (error) throw error;
      
      if (logsData && logsData.length > 0) {
        setWebhookLogs(logsData);
        return;
      }
    } catch (e) {
      console.error('Erro ao carregar logs do webhook do banco de dados:', e);
    }
    
    // Fallback para localStorage
    const logs = getWebhookLogs();
    setWebhookLogs(logs);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      toast.error("Por favor, insira uma URL de webhook para testar.");
      return;
    }

    setTestingWebhook(true);
    setWebhookTestResult(null);

    try {
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
      
      const success = await testWebhook(webhookUrl, testData);
      
      // Carregar logs atualizados
      await loadWebhookLogs();
      
      if (success && lastTestResult) {
        setWebhookTestResult(lastTestResult);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setWebhookTestResult({
        success: false,
        message: errorMessage
      });
      toast.error("Erro ao testar o webhook: " + errorMessage);
      console.error("Webhook test error:", error);
    } finally {
      setTestingWebhook(false);
    }
  };
  
  const handleClearWebhookLogs = async () => {
    if (window.confirm("Tem certeza que deseja limpar todos os logs de webhook? Esta ação não pode ser desfeita.")) {
      // Limpar logs do banco de dados
      try {
        await supabase
          .from('webhook_logs')
          .delete()
          .gte('id', 0); // Deletar todos
      } catch (e) {
        console.error('Erro ao limpar logs do banco de dados:', e);
      }
      
      // Limpar logs do localStorage
      clearWebhookLogs();
      setWebhookLogs([]);
      toast.success("Logs de webhook limpos com sucesso");
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-medium text-gray-800 mb-4">Configurações de Integração</h2>
      <p className="text-gray-500 mb-6">
        Configure integrações com serviços externos para ampliar as funcionalidades do site.
      </p>
      
      <div className="space-y-6 w-full">
        <div className="bg-gray-50 p-6 rounded-lg border w-full">
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Webhook className="h-5 w-5" /> 
            Webhook para Mensagens
          </h3>
          <p className="text-gray-600 mb-4">
            Configure um endpoint para receber automaticamente as mensagens enviadas pelo formulário de contato.
          </p>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="webhookUrl" className="block text-sm font-medium text-gray-700 mb-1">
                URL do Webhook
              </Label>
              <Input
                id="webhookUrl"
                type="url"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://sua-api.com/webhook"
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Ex: https://sua-api.com/webhook, https://hooks.zapier.com/...
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-3">
              <CustomButton
                type="button"
                variant="secondary"
                onClick={handleTestWebhook}
                disabled={testingWebhook || !webhookUrl}
                className="w-full md:w-auto"
              >
                <Webhook className="mr-2 h-4 w-4" />
                {testingWebhook ? "Testando..." : "Testar Webhook"}
              </CustomButton>
              
              <CustomButton
                type="button"
                variant="secondary"
                onClick={() => setShowWebhookLogs(!showWebhookLogs)}
                className="w-full md:w-auto"
              >
                <Logs className="mr-2 h-4 w-4" />
                {showWebhookLogs ? "Ocultar Logs" : "Mostrar Logs"}
              </CustomButton>
              
              {webhookTestResult !== null && (
                <Alert className={webhookTestResult.success ? "bg-green-50" : "bg-red-50"}>
                  <AlertDescription className="text-sm">
                    {webhookTestResult.success 
                      ? "O teste foi bem-sucedido! Seu webhook está funcionando." 
                      : `Falha no teste do webhook: ${webhookTestResult.message || 'Erro desconhecido'}`}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            {showWebhookLogs && (
              <div className="mt-4 border rounded-md overflow-hidden w-full">
                <div className="bg-gray-100 px-4 py-2 flex justify-between items-center border-b">
                  <h4 className="font-medium">Logs de Webhook</h4>
                  <CustomButton
                    type="button"
                    variant="secondary"
                    onClick={handleClearWebhookLogs}
                    className="text-xs"
                  >
                    Limpar Logs
                  </CustomButton>
                </div>
                
                <ScrollArea className="h-60 rounded-b-md w-full">
                  {webhookLogs.length > 0 ? (
                    <div className="divide-y">
                      {webhookLogs.map((log, index) => (
                        <div key={index} className="p-3 text-sm">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`inline-block w-3 h-3 rounded-full ${log.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <span className="font-medium">
                              {new Date(log.timestamp).toLocaleString()} - Status: {log.status || 'N/A'}
                            </span>
                          </div>
                          <div className="ml-5 text-gray-600">
                            <div><strong>URL:</strong> {log.url}</div>
                            <div className="mt-1">
                              <strong>Payload:</strong>
                              <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto text-xs">
                                {JSON.stringify(log.payload, null, 2)}
                              </pre>
                            </div>
                            <div className="mt-1">
                              <strong>Resposta:</strong>
                              <div className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto text-xs whitespace-pre-wrap">
                                {typeof log.response === 'string' ? log.response.substring(0, 500) : JSON.stringify(log.response)}
                                {typeof log.response === 'string' && log.response.length > 500 ? '...' : ''}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Nenhum log de webhook disponível
                    </div>
                  )}
                </ScrollArea>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-medium mt-3 mb-1">Exemplos de Payload</h4>
              
              <div className="mt-3 border rounded overflow-hidden">
                <div className="bg-gray-50 px-3 py-2 text-xs font-medium border-b">
                  Mensagem de Contato
                </div>
                <pre className="bg-black/90 text-white rounded-b-md p-3 overflow-x-auto text-sm w-full">
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
                <pre className="bg-black/90 text-white rounded-b-md p-3 overflow-x-auto text-sm w-full">
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
        </div>
      </div>
    </div>
  );
};
