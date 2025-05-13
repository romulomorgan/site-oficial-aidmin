
// Este arquivo funciona como um barrel file exportando tudo dos módulos específicos

export { supabase } from '@/integrations/supabase/client';

// Re-exportar tipos
export type { 
  SiteTexts,
  FAQItem,
  Testimonial,
  ContactMessage,
  WebhookLog,
  ColorTemplate,
  ThemeTemplate
} from './supabase/types';

// Re-exportar funções de FAQs
export {
  fetchFAQs,
  addFAQ,
  updateFAQ,
  deleteFAQ,
  getFAQs
} from './supabase/faq';

// Re-exportar funções de Testimonials
export {
  fetchTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getTestimonials
} from './supabase/testimonials';

// Re-exportar funções de webhooks
export * from './webhooks/webhookTesting';
export * from './webhooks/webhookSender';
export * from './webhooks/webhookLogs';
export { generateWebhookPayload } from './webhooks';

// Re-exportar outras funções conforme necessário
export * from './supabase/siteTexts';
export * from './supabase/colorTemplates';
export * from './supabase/emailSubscriptionService';
export * from './supabase/embedConfig';
