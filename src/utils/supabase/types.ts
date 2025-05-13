
// Tipos para o sistema
export interface SiteTexts {
  [key: string]: string | boolean | number | null;
}

export interface SectionProps {
  sections: {
    [key: string]: string | boolean | number;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange?: (name: string, checked: boolean) => void;
  handleNumberChange?: (name: string, value: number) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => Promise<void>;
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
}

export interface ThemeTemplate {
  id: string;
  name: string;
  description?: string;
  category?: string;
  colors: ColorTemplate;
  preview?: string;
}

export interface ContactMessage {
  id: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone?: string;
  message: string;
  read: boolean;
  date: string | Date;
  thread_id?: string;
  contact_id?: string;
}

export interface WebhookLog {
  id: number;
  url: string;
  payload: any;
  response?: string;
  status?: number;
  success: boolean;
  timestamp: string;
  type?: string;
}

export interface EmbedConfig {
  id?: string;
  code: string;
  position: 'left' | 'right';
  isActive: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface SiteConfiguration {
  id?: string;
  key: string;
  value: any;
  created_at?: string;
  updated_at?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  active: boolean;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  testimonial: string;
  avatar_url?: string;
  order_index?: number;
  created_at?: string;
  updated_at?: string;
}

export interface EmailSubscription {
  id: string;
  email: string;
  source?: string;
  created_at?: string;
}
