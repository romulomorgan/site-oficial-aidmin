
interface EmailSubscription {
  id: number;
  email: string;
  date: string;
  source: string;
}

interface ContactMessage {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

interface SiteTexts {
  siteTitle?: string;
  whyUsImage?: string;
  robotImage?: string;
  contactImage?: string;
  footerAbout?: string;
  footerButtonText?: string;
  footerPhoneNumber?: string;
  footerEmail?: string;
  faviconUrl?: string;
  logoUrl?: string;
  webhookUrl?: string;
  copyrightText?: string;
  embedCode?: string;
  embedPosition?: 'left' | 'right';
  embedActive?: boolean;
  [key: string]: string | boolean | undefined;
}

// Function to save an email subscription
export const saveEmailSubscription = (email: string, source = 'Formulário de Contato'): void => {
  const newSubscription: EmailSubscription = {
    id: Date.now(),
    email,
    date: new Date().toISOString(),
    source
  };
  
  const savedSubscriptions = localStorage.getItem('emailSubscriptions');
  let subscriptions = [];
  
  if (savedSubscriptions) {
    subscriptions = JSON.parse(savedSubscriptions);
  }
  
  // Check if email already exists
  if (!subscriptions.some((sub: EmailSubscription) => sub.email === email)) {
    subscriptions.push(newSubscription);
    localStorage.setItem('emailSubscriptions', JSON.stringify(subscriptions));
  }
};

// Function to save a contact message
export const saveContactMessage = (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}): void => {
  const newMessage: ContactMessage = {
    id: Date.now(),
    ...data,
    date: new Date().toISOString(),
    read: false
  };
  
  const savedMessages = localStorage.getItem('contactMessages');
  let messages = [];
  
  if (savedMessages) {
    messages = JSON.parse(savedMessages);
  }
  
  messages.push(newMessage);
  localStorage.setItem('contactMessages', JSON.stringify(messages));
};

// Function to get all contact messages
export const getContactMessages = (): ContactMessage[] => {
  const savedMessages = localStorage.getItem('contactMessages');
  return savedMessages ? JSON.parse(savedMessages) : [];
};

// Function to mark a message as read
export const markMessageAsRead = (id: number): void => {
  const messages = getContactMessages();
  const updatedMessages = messages.map(msg => 
    msg.id === id ? { ...msg, read: true } : msg
  );
  localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
};

// Function to delete a message
export const deleteMessage = (id: number): void => {
  const messages = getContactMessages();
  const updatedMessages = messages.filter(msg => msg.id !== id);
  localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
};

// Function to get site texts
export const getSiteTexts = (): SiteTexts => {
  const savedTexts = localStorage.getItem('siteTexts');
  return savedTexts ? JSON.parse(savedTexts) : {
    siteTitle: 'IAdmin',
    footerPhoneNumber: '(11) 93956-965',
    footerEmail: 'iadminassistant@gmail.com',
    footerAbout: 'A sua assistente de AI',
    footerButtonText: 'Contrate uma AI Poderosa!',
    copyrightText: '© Todos os direitos reservados - IAdmin 2024',
    embedActive: false,
    embedPosition: 'right'
  };
};

// Function to update site texts
export const updateSiteTexts = (newTexts: Record<string, any>): void => {
  const currentTexts = getSiteTexts();
  const updatedTexts = { ...currentTexts, ...newTexts };
  localStorage.setItem('siteTexts', JSON.stringify(updatedTexts));
};

// Function to get webhook URL
export const getWebhookUrl = (): string => {
  const texts = getSiteTexts();
  return texts.webhookUrl || '';
};

// Function to get email subscriptions
export const getEmailSubscriptions = (): EmailSubscription[] => {
  const savedSubscriptions = localStorage.getItem('emailSubscriptions');
  return savedSubscriptions ? JSON.parse(savedSubscriptions) : [];
};

// Function to test webhook URL
export const testWebhookUrl = async (url: string): Promise<boolean> => {
  if (!url) return false;
  
  try {
    // Para testes reais em produção, deve-se implementar uma chamada real
    console.log(`Testing webhook URL: ${url}`);
    
    // Simulando um payload de teste para enviar ao webhook
    const testPayload = {
      firstName: "Teste",
      lastName: "Webhook",
      email: "teste@exemplo.com",
      phone: "11912345678",
      message: "Esta é uma mensagem de teste do webhook",
      date: new Date().toISOString()
    };
    
    // Tentativa real de enviar dados para o webhook (comentado para evitar erros de CORS em ambiente de desenvolvimento)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPayload),
    });
    
    // Verificar se a resposta foi bem-sucedida
    return response.ok;
  } catch (error) {
    console.error('Erro ao testar webhook URL:', error);
    // Em caso de erro, retornamos falso indicando falha
    return false;
  }
};
