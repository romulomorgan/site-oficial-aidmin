
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
  active?: boolean;
  order_index?: number;
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
  buttonColor?: string;
  buttonIcon?: string;
}

// Tipos para webhooks
export interface Webhook {
  id: string;
  name: string;
  url: string;
  isActive: boolean;
  createdAt: string;
}

// Tipo para configuração de redes sociais
export interface SocialMediaConfig {
  url: string;
  isActive: boolean;
}

// Tipo para seções da página inicial
export interface SectionProps {
  sections: Record<string, string | boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange?: (name: string, checked: boolean) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => void;
}
