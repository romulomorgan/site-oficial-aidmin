
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
  read: boolean;
  thread_id?: string;
  contact_id?: string;
}
