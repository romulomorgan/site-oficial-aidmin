
// Common data types used across the application

// Site texts types
export interface SiteTexts {
  [key: string]: string | boolean | undefined;
}

// Color template types
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
  isDefault?: boolean;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  testimonial: string;
  avatarUrl: string;
}

// FAQ types
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Embed Config types
export interface EmbedConfig {
  code: string;
  position: 'left' | 'right';
  isActive: boolean;
}

// Email subscription type
export interface EmailSubscription {
  id: string;
  email: string;
  source?: string;
  createdAt: string;
}
