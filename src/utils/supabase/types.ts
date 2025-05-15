
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
  is_default?: boolean;
}

export interface EmailSubscription {
  id: string;
  email: string;
  source: string;
  created_at: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  order: number;
  active?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  testimonial: string;
  avatarUrl: string;
}

export interface ContactMessage {
  id: string;
  name?: string;
  firstname: string;
  lastname?: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  date: string;
  replied?: boolean;
  read: boolean;
  contact_id?: string;
  thread_id?: string;
}

export interface EmbedConfig {
  code: string;
  position: 'left' | 'right';
  isActive: boolean;
}

export interface WebhookLog {
  id: string | number;
  webhook_url: string;
  url?: string;
  payload: any;
  response?: string;
  response_status?: number;
  status?: number;
  response_body?: string;
  created_at: string;
  timestamp?: string;
  success?: boolean;
  type?: string;
}

export interface SectionProps {
  sections: Record<string, string | boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSwitchChange?: (key: string, value: boolean) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => void;
}

export interface SiteTexts {
  [key: string]: string | boolean | undefined;
}
