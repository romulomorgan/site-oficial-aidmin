
import React from 'react';
import { ContactMessage } from '@/utils/supabase/types';
import { CustomButton } from '@/components/ui/CustomButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useWebhook } from '@/hooks/useWebhook';
import { toast } from 'sonner';

interface ReplyDialogProps {
  message: ContactMessage | null;
  webhookUrl: string;
  replyContent: string;
  isLoading: boolean;
  onReplyChange: (content: string) => void;
  onSendReply: () => void;
  onClose: () => void;
}

const ReplyDialog: React.FC<ReplyDialogProps> = ({
  message,
  webhookUrl,
  replyContent,
  isLoading,
  onReplyChange,
  onSendReply,
  onClose
}) => {
  const { sendWebhook, saving, setSaving } = useWebhook({
    onSuccess: () => {
      toast.success(`Resposta enviada para ${message?.email}!`);
      onClose();
    },
    onError: (error) => {
      console.error('Erro ao enviar resposta:', error);
      toast.error('Erro ao enviar resposta. Verifique o webhook.');
    }
  });

  const handleSendReply = async () => {
    if (!message || !replyContent.trim() || !webhookUrl) {
      toast.error('Por favor, preencha a mensagem e configure o webhook!');
      return;
    }

    setSaving(true);

    try {
      // Preparar payload para o webhook
      const payload = {
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
      const success = await sendWebhook(webhookUrl, payload);
      
      if (success) {
        onSendReply(); // Para marcar como lida, etc.
      }
    } catch (error) {
      console.error('Erro ao processar envio de resposta:', error);
      toast.error('Erro ao enviar resposta. Verifique o webhook.');
    } finally {
      setSaving(false);
    }
  };

  if (!message) return null;

  return (
    <Dialog open={!!message} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-800">Responder à Mensagem</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-blue-50 p-3 rounded text-sm border border-blue-100">
            <p className="text-gray-800">
              <strong>Para:</strong> {message.firstname} {message.lastname} ({message.email})
            </p>
            <p className="text-gray-800 mt-2"><strong>Mensagem original:</strong></p>
            <p className="italic text-gray-700 mt-1">{message.message}</p>
          </div>
          
          <div>
            <label htmlFor="replyMessage" className="block text-sm font-medium mb-1 text-gray-700">
              Sua resposta:
            </label>
            <textarea
              id="replyMessage"
              value={replyContent}
              onChange={(e) => onReplyChange(e.target.value)}
              rows={6}
              placeholder="Digite sua resposta aqui..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          
          {!webhookUrl && (
            <div className="bg-yellow-50 p-3 rounded text-sm text-yellow-700 border border-yellow-200">
              <p>Configure o Webhook para habilitar o envio de respostas.</p>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <CustomButton 
            type="button" 
            variant="secondary" 
            onClick={onClose}
          >
            Cancelar
          </CustomButton>
          <CustomButton 
            type="button" 
            variant="primary"
            disabled={!replyContent.trim() || !webhookUrl || isLoading || saving}
            onClick={handleSendReply}
          >
            {isLoading || saving ? "Enviando..." : "Enviar Resposta"}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDialog;
