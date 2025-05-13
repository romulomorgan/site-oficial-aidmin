
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
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  replied: boolean;
}

export interface EmbedConfig {
  code: string;
  position: 'left' | 'right';
  isActive: boolean;
}

export interface WebhookLog {
  id: string;
  webhook_url: string;
  payload: any;
  response_status: number;
  response_body: string;
  created_at: string;
}
