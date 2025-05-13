
export interface SiteTexts {
  [key: string]: string | boolean | undefined;
}

export interface ColorTemplate {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  buttonTextColor?: string;
  menuTextColor?: string;
  is_default?: boolean;  // Adicionando a propriedade is_default que estava faltando
}

export interface EmbedConfig {
  code: string;
  position: 'left' | 'right';
  isActive: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  testimonial: string;
  avatarUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  active?: boolean;
}

export interface EmailSubscription {
  id: string;
  email: string;
  created_at: string;
  source?: string;
}

export interface ContactMessage {
  id: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  date: string; // Adicionando esta propriedade que estava faltando
  read: boolean;
  thread_id?: string;
  contact_id?: string;
}

// Adicionando tipo WebhookLog que estava faltando
export interface WebhookLog {
  id: number;
  url: string;
  payload: string | any;
  status?: number;
  success: boolean;
  response?: string;
  timestamp: string;
  type?: string;
}

// Adicionando tipo SectionProps que estava faltando
export interface SectionProps {
  sections: Record<string, string | boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange?: (key: string, value: boolean) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => Promise<void>;
}
