
export * from './webhookTesting';
export * from './webhookSender';
export * from './webhookLogs';

// Função utilitária para gerar payload para webhooks
export const generateWebhookPayload = (data: any, type: string = 'contact_message') => {
  return {
    type,
    timestamp: new Date().toISOString(),
    data
  };
};
