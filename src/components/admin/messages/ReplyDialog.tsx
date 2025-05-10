
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
  if (!message) return null;

  return (
    <Dialog open={!!message} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Responder à Mensagem</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-gray-50 p-3 rounded text-sm">
            <p>
              <strong>Para:</strong> {message.firstname} {message.lastname} ({message.email})
            </p>
            <p><strong>Mensagem original:</strong></p>
            <p className="italic text-gray-600">{message.message}</p>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          {!webhookUrl && (
            <div className="bg-yellow-50 p-3 rounded text-sm text-yellow-700">
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
            disabled={!replyContent.trim() || !webhookUrl || isLoading}
            onClick={onSendReply}
          >
            {isLoading ? "Enviando..." : "Enviar Resposta"}
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReplyDialog;
