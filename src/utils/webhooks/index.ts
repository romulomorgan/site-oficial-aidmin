
export * from './webhookTesting';
export * from './webhookSender';
export * from './webhookLogs';

// Define WebhookLog interface if needed
export interface WebhookLogType {
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
