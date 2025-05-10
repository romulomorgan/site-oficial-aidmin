
// Função para testar URL do webhook
export async function testWebhookUrl(url: string): Promise<{success: boolean, status?: number, message?: string, payload?: any}> {
  try {
    console.log('Testando webhook URL:', url);
    
    // Criar um payload de teste com timestamp para facilitar identificação nos logs
    const testPayload = {
      firstName: 'Teste',
      lastName: 'Webhook',
      email: 'teste@exemplo.com',
      phone: '11912345678',
      message: 'Mensagem de teste do webhook',
      date: new Date().toISOString(),
      testId: `test-${Date.now()}`,
      type: 'contact_message'
    };
    
    // Realizar uma solicitação de teste para o webhook
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(generateWebhookPayload(testPayload))
    });
    
    // Capturar o texto da resposta (se possível)
    let responseText = '';
    try {
      responseText = await response.text();
    } catch (e) {
      responseText = 'Não foi possível obter o conteúdo da resposta';
    }
    
    // Registrar o log da tentativa
    const webhookLog = {
      timestamp: new Date().toISOString(),
      url,
      payload: generateWebhookPayload(testPayload),
      status: response.status,
      success: response.status >= 200 && response.status < 300,
      response: responseText
    };
    
    // Salvar o log na localStorage para consulta posterior
    saveWebhookLog(webhookLog);
    
    // Retornar resultado do teste
    return {
      success: response.status >= 200 && response.status < 300,
      status: response.status,
      message: responseText,
      payload: generateWebhookPayload(testPayload)
    };
  } catch (error) {
    console.error('Erro ao testar webhook:', error);
    
    // Registrar o erro no log
    const errorMessage = error instanceof Error ? error.message : String(error);
    const testData = {
      firstName: 'Teste',
      lastName: 'Webhook',
      email: 'teste@exemplo.com',
      phone: '11912345678',
      message: 'Mensagem de teste do webhook',
      date: new Date().toISOString(),
      testId: `test-${Date.now()}`,
      type: 'contact_message'
    };
    
    const webhookLog = {
      timestamp: new Date().toISOString(),
      url,
      payload: generateWebhookPayload(testData),
      status: 0,
      success: false,
      response: errorMessage
    };
    
    saveWebhookLog(webhookLog);
    
    return {
      success: false,
      message: errorMessage
    };
  }
}

// Salvar log de testes de webhook na localStorage
export function saveWebhookLog(log: any): void {
  try {
    const existingLogs = getWebhookLogs();
    const updatedLogs = [log, ...existingLogs].slice(0, 50); // Manter apenas os últimos 50 logs
    localStorage.setItem('webhookLogs', JSON.stringify(updatedLogs));
  } catch (error) {
    console.error('Erro ao salvar log de webhook:', error);
  }
}

// Recuperar logs salvos
export function getWebhookLogs(): any[] {
  try {
    const logs = localStorage.getItem('webhookLogs');
    return logs ? JSON.parse(logs) : [];
  } catch (error) {
    console.error('Erro ao recuperar logs de webhook:', error);
    return [];
  }
}

// Limpar logs
export function clearWebhookLogs(): void {
  localStorage.removeItem('webhookLogs');
}

// Função para gerar um payload com dados formatados
export function generateWebhookPayload(data: any, type: string = 'contact_message'): any {
  // Formatar os dados para o webhook com base no template e tipo
  if (type === 'reply') {
    return {
      type: 'reply',
      to: data.to,
      from: data.from || "noreply@iadmin.com",
      subject: data.subject || `Re: Contato - ${data.contactData?.firstName || ''} ${data.contactData?.lastName || ''}`,
      message: data.message,
      contactData: data.contactData || {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        originalMessage: data.originalMessage || data.message
      },
      date: new Date().toISOString(),
      threadId: data.threadId || `thread_${Date.now()}`,
      contactId: data.contactId || `contact_${Date.now()}`
    };
  } else {
    // Contato padrão
    const firstName = data.firstName || data.firstname || 'Visitante';
    const lastName = data.lastName || data.lastname || '';
    
    return {
      type: 'contact_message',
      firstName: firstName,
      lastName: lastName,
      email: data.email || 'sem-email@exemplo.com',
      phone: data.phone || 'Não informado',
      message: data.message || 'Mensagem não fornecida',
      date: data.date || new Date().toISOString(),
      threadId: data.threadId || `thread_${Date.now()}`,
      contactId: data.contactId || `contact_${Date.now()}`
    };
  }
}
