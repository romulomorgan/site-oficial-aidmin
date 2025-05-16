
import React from 'react';
import { Bot } from 'lucide-react';

const WebhookPayloadExamples: React.FC = () => {
  return (
    <div className="mt-4 pt-4 border-t">
      <h3 className="text-sm font-medium mb-2 flex items-center text-gray-700">
        <Bot className="h-4 w-4 mr-1" />
        Exemplos de payload enviados
      </h3>
      
      <div className="mt-2 border rounded overflow-hidden">
        <div className="bg-gray-50 px-3 py-2 text-xs font-medium border-b text-gray-700">
          Mensagem de Contato
        </div>
        <pre className="bg-black/90 text-white text-xs p-3 overflow-x-auto">
{JSON.stringify({
  type: 'contact_message',
  firstName: 'Nome do Usuário',
  lastName: 'Sobrenome do Usuário',
  email: 'email@exemplo.com',
  phone: '11912345678',
  message: 'Mensagem enviada pelo usuário',
  date: new Date().toISOString(),
  threadId: 'thread_123456',
  contactId: 'contact_123456'
}, null, 2)}
        </pre>
      </div>
      
      <div className="mt-3 border rounded overflow-hidden">
        <div className="bg-gray-50 px-3 py-2 text-xs font-medium border-b text-gray-700">
          Resposta à Mensagem
        </div>
        <pre className="bg-black/90 text-white text-xs p-3 overflow-x-auto">
{JSON.stringify({
  type: 'reply',
  to: 'usuario@exemplo.com',
  from: 'noreply@iadmin.com',
  subject: 'Re: Contato IAdmin - Nome Sobrenome',
  message: 'Obrigado pelo contato. Responderei em breve.',
  contactData: {
    firstName: 'Nome',
    lastName: 'Sobrenome',
    email: 'usuario@exemplo.com',
    phone: '11912345678',
    originalMessage: 'Mensagem original do usuário'
  },
  date: new Date().toISOString(),
  threadId: 'thread_123456',
  contactId: 'contact_123456'
}, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default WebhookPayloadExamples;
