
import React, { useState, useEffect } from 'react';
import { Webhook, Logs } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from '@/components/ui/scroll-area';
import { testWebhookUrl, getWebhookLogs, clearWebhookLogs } from '@/utils/supabase/webhooks';
import { toast } from 'sonner';
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

  useEffect(() => {
    // Carregar logs de webhook ao montar o componente
    const logs = getWebhookLogs();
    setWebhookLogs(logs);
  }, [setWebhookLogs]);

  const handleWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookUrl(e.target.value);
  };

  const handleTestWebhook = async () => {
    if (!webhookUrl) {
      toast.error("Por favor, insira uma URL de webhook para testar.");
      return;
    }

    setTestingWebhook(true);
    setWebhookTestResult(null);

    try {
      const result = await testWebhookUrl(webhookUrl);
      setWebhookTestResult(result);
      
      // Atualizar logs de webhook
      const logs = getWebhookLogs();
      setWebhookLogs(logs);
      
      if (result.success) {
        toast.success("Teste de webhook bem-sucedido!");
      } else {
        toast.error("Falha ao testar o webhook.");
      }
      
      // Salvar URL no Supabase também para garantir consistência
      await supabase
        .from('site_texts')
        .upsert([
          { key: 'webhookUrl', content: webhookUrl, type: 'text' }
        ]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setWebhookTestResult({
        success: false,
        message: errorMessage
      });
      toast.error("Erro ao testar o webhook.");
      console.error("Webhook test error:", error);
    } finally {
      setTestingWebhook(false);
    }
  };
  
  const handleClearWebhookLogs = () => {
    if (window.confirm("Tem certeza que deseja limpar todos os logs de webhook? Esta ação não pode ser desfeita.")) {
      clearWebhookLogs();
      setWebhookLogs([]);
      toast.success("Logs de webhook limpos com sucesso");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-medium text-gray-800 mb-4">Configurações de Integração</h2>
      <p className="text-gray-500 mb-6">
        Configure integrações com serviços externos para ampliar as funcionalidades do site.
      </p>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg border">
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
                onChange={handleWebhookChange}
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
                      : "Falha no teste do webhook. Verifique a URL e tente novamente."}
                  </AlertDescription>
                </Alert>
              )}
            </div>
            
            {showWebhookLogs && (
              <div className="mt-4 border rounded-md overflow-hidden">
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
                
                <ScrollArea className="h-60 rounded-b-md">
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
              <h4 className="text-sm font-medium mt-3 mb-1">Formato do Payload</h4>
              <pre className="bg-black/90 text-white rounded-md p-3 overflow-x-auto text-sm">
{`{
  "firstName": "Nome do Usuário",
  "lastName": "Sobrenome do Usuário",
  "email": "email@exemplo.com",
  "phone": "11912345678",
  "message": "Mensagem enviada pelo usuário",
  "date": "2024-05-08T14:30:00.000Z"
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
