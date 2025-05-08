
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

// Function to get site texts
export const getSiteTexts = (): Record<string, any> => {
  const savedTexts = localStorage.getItem('siteTexts');
  return savedTexts ? JSON.parse(savedTexts) : {};
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
