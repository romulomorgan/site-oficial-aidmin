
// Tipos para dados do site
export interface SiteTexts {
  [key: string]: string | boolean | undefined;
}

// Tipos para templates de cores (mantido para compatibilidade)
export type ColorTemplate = import('../themes').ThemeTemplate & {
  isDefault?: boolean;
};

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

// Tipos para mensagens de contato
export interface ContactMessage {
  id: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
  read: boolean;
  created_at?: string;
}

// Tipos para inscrições de email
export interface EmailSubscription {
  id: string;
  email: string;
  source?: string;
  created_at: string;
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
