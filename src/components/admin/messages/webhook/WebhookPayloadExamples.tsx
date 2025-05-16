
import React, { useState } from 'react';
import { Info } from 'lucide-react';

const WebhookPayloadExamples: React.FC = () => {
  const [showExamples, setShowExamples] = useState(false);
  
  const contactPayload = {
    type: 'contact_message',
    firstName: 'Nome do Usuário',
    lastName: 'Sobrenome do Usuário',
    email: 'email@exemplo.com',
    phone: '(11) 91234-5678',
    message: 'Mensagem enviada pelo usuário através do formulário de contato.',
    date: new Date().toISOString(),
    threadId: 'thread_123456', 
    contactId: 'contact_123456'
  };

  const replyPayload = {
    type: 'reply',
    to: 'usuario@exemplo.com',
    from: 'noreply@iadmin.com',
    subject: 'Re: Contato IAdmin - Nome Sobrenome',
    message: 'Obrigado pelo contato. Responderei em breve.',
    contactData: {
      firstName: 'Nome',
      lastName: 'Sobrenome',
      email: 'usuario@exemplo.com',
      phone: '(11) 91234-5678',
      originalMessage: 'Mensagem original do usuário'
    },
    date: new Date().toISOString(),
    threadId: 'thread_123456',
    contactId: 'contact_123456'
  };

  const subscriptionPayload = {
    type: 'email_subscription',
    email: 'usuario@exemplo.com',
    source: 'website',
    date: new Date().toISOString(),
    subscriptionId: 'subscription_123456'
  };

  return (
    <div className="mt-4">
      <div 
        className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 mb-2"
        onClick={() => setShowExamples(!showExamples)}
      >
        <Info className="h-4 w-4 mr-1" />
        <p className="text-sm">
          {showExamples ? 'Ocultar exemplos de payload' : 'Ver exemplos de payload'}
        </p>
      </div>

      {showExamples && (
        <div className="mt-2 space-y-3">
          <div className="border rounded overflow-hidden">
            <div className="bg-gray-100 px-3 py-2 text-xs font-medium border-b">
              Mensagem de Contato
            </div>
            <pre className="bg-gray-50 p-3 overflow-x-auto text-xs">
              {JSON.stringify(contactPayload, null, 2)}
            </pre>
          </div>
          
          <div className="border rounded overflow-hidden">
            <div className="bg-gray-100 px-3 py-2 text-xs font-medium border-b">
              Resposta à Mensagem
            </div>
            <pre className="bg-gray-50 p-3 overflow-x-auto text-xs">
              {JSON.stringify(replyPayload, null, 2)}
            </pre>
          </div>
          
          <div className="border rounded overflow-hidden">
            <div className="bg-gray-100 px-3 py-2 text-xs font-medium border-b">
              Inscrição de Email
            </div>
            <pre className="bg-gray-50 p-3 overflow-x-auto text-xs">
              {JSON.stringify(subscriptionPayload, null, 2)}
            </pre>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Estes são exemplos de payloads enviados para o webhook configurado. 
            Seu sistema precisa estar preparado para receber e processar estes formatos.
          </p>
        </div>
      )}
    </div>
  );
};

export default WebhookPayloadExamples;
