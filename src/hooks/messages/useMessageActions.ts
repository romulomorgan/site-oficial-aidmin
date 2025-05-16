
import { useState } from 'react';
import { toast } from 'sonner';
import { ContactMessage } from '@/utils/supabase/types';
import { useWebhook } from '@/hooks/useWebhook';
import { supabase } from '@/integrations/supabase/client';

export function useMessageActions() {
  const [isLoading, setIsLoading] = useState(false);
  const { sendWebhook } = useWebhook();

  const handleReply = async (message: ContactMessage, replyContent: string, webhookUrl: string) => {
    setIsLoading(true);

    try {
      // Verificar se URL do webhook está configurada
      if (!webhookUrl || webhookUrl.trim() === '') {
        toast.error('URL do webhook não configurada. Configure-a antes de enviar respostas.');
        return false;
      }

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
      
      console.log('Enviando resposta via webhook:', webhookUrl, replyData);
      
      // Enviar via webhook usando o hook
      const success = await sendWebhook(webhookUrl, replyData);
      
      if (success) {
        // Salvar registro da resposta
        await supabase.from('webhook_logs').insert([{
          url: webhookUrl,
          payload: JSON.stringify(replyData),
          status: 200,
          success: true,
          response: 'Resposta enviada com sucesso via webhook',
          timestamp: new Date().toISOString(),
          type: 'reply'
        }]);

        toast.success('Resposta enviada com sucesso!');
        return true;
      } else {
        toast.error('Falha ao enviar resposta. Verifique o webhook.');
        return false;
      }
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
