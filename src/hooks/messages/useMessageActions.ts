
import { useState } from 'react';
import { toast } from 'sonner';
import { ContactMessage } from '@/utils/supabase/types';
import { useWebhook } from '@/hooks/useWebhook';

export function useMessageActions() {
  const [isLoading, setIsLoading] = useState(false);
  const { sendWebhook } = useWebhook();

  const handleReply = async (message: ContactMessage, replyContent: string, webhookUrl: string) => {
    setIsLoading(true);

    try {
      // Preparar dados para o webhook
      const replyData = {
        type: 'reply',
        to: message.email,
        from: "noreply@iadmin.com",
        subject: `Re: Contato IAdmin - ${message.firstname} ${message.lastname}`,
        message: replyContent,
        contactData: {
          firstName: message.firstname,
          lastName: message.lastname,
          email: message.email,
          phone: message.phone,
          originalMessage: message.message
        },
        threadId: message.thread_id || `thread_${Date.now()}`,
        contactId: message.id
      };
      
      // Enviar via webhook usando o hook
      const success = await sendWebhook(webhookUrl, replyData);
      
      if (success) {
        toast.success('Resposta enviada com sucesso!');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao enviar resposta:', error);
      toast.error('Erro ao enviar resposta. Verifique o webhook.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleReply
  };
}
