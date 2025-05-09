
// Tipos para dados do site
export interface SiteTexts {
  [key: string]: string | boolean | undefined;
}

// Tipos para templates de cores
export interface ColorTemplate {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  buttonTextColor: string;
  menuTextColor: string;
  isDefault?: boolean;
}

// Tipos para depoimentos
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  testimonial: string;
  avatarUrl?: string;
}

// Tipos para perguntas frequentes
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Tipos para inscrições de email
export interface EmailSubscription {
  id: string;
  email: string;
  source?: string;
  createdAt: string;
}

// Tipos para configuração de embed
export interface EmbedConfig {
  id?: string;
  code: string;
  isActive: boolean;
  position: 'left' | 'right';
}

// Tipos para webhooks
export interface Webhook {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  createdAt: string;
}
