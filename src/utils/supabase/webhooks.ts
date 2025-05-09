
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
      testId: `test-${Date.now()}`
    };
    
    // Realizar uma solicitação de teste para o webhook
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testPayload)
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
      payload: testPayload,
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
      payload: testPayload
    };
  } catch (error) {
    console.error('Erro ao testar webhook:', error);
    
    // Registrar o erro no log
    const errorMessage = error instanceof Error ? error.message : String(error);
    const webhookLog = {
      timestamp: new Date().toISOString(),
      url,
      payload: {
        firstName: 'Teste',
        lastName: 'Webhook',
        email: 'teste@exemplo.com',
        phone: '11912345678',
        message: 'Mensagem de teste do webhook',
        date: new Date().toISOString(),
        testId: `test-${Date.now()}`
      },
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
export function generateWebhookPayload(data: any): any {
  // Formatar os dados para o webhook com base no template
  return {
    firstName: data.firstName || 'Visitante',
    lastName: data.lastName || '',
    email: data.email || 'sem-email@exemplo.com',
    phone: data.phone || 'Não informado',
    message: data.message || 'Mensagem não fornecida',
    date: new Date().toISOString()
  };
}
