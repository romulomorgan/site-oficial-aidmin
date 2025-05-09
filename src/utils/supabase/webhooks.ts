
// Função para testar URL do webhook
export async function testWebhookUrl(url: string): Promise<boolean> {
  try {
    console.log('Testando webhook URL:', url);
    
    // Criar um payload de teste
    const testPayload = {
      firstName: 'Teste',
      lastName: 'Webhook',
      email: 'teste@exemplo.com',
      phone: '11912345678',
      message: 'Mensagem de teste do webhook',
      date: new Date().toISOString()
    };
    
    // Realizar uma solicitação de teste para o webhook
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testPayload)
    });
    
    // Considerar sucesso se o status da resposta estiver entre 200 e 299
    return response.status >= 200 && response.status < 300;
  } catch (error) {
    console.error('Erro ao testar webhook:', error);
    return false;
  }
}
