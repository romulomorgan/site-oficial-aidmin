
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';
import { Trash, ExternalLink } from 'lucide-react';

interface Message {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  read: boolean;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved messages from localStorage
    const savedMessages = localStorage.getItem('contactMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Some sample messages for demonstration
      const sampleMessages = [
        {
          id: 1,
          firstName: "João",
          lastName: "Silva",
          email: "joao.silva@example.com",
          phone: "(11) 98765-4321",
          message: "Olá, gostaria de mais informações sobre os serviços de IA para o setor de construção.",
          date: "2024-04-28T14:23:00",
          read: true
        },
        {
          id: 2,
          firstName: "Maria",
          lastName: "Santos",
          email: "maria.santos@empresa.com.br",
          phone: "(21) 97654-3210",
          message: "Precisamos de uma solução de IA para gerenciamento de condomínios. Poderiam entrar em contato para discutirmos melhor?",
          date: "2024-05-01T09:15:00",
          read: false
        }
      ];
      setMessages(sampleMessages);
      localStorage.setItem('contactMessages', JSON.stringify(sampleMessages));
    }
    
    // Load webhook URL
    const savedTexts = localStorage.getItem('siteTexts');
    if (savedTexts) {
      const parsedTexts = JSON.parse(savedTexts);
      if (parsedTexts.webhookUrl) {
        setWebhookUrl(parsedTexts.webhookUrl);
      }
    }
  }, []);

  const handleDeleteMessage = (id: number) => {
    const updatedMessages = messages.filter(message => message.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    toast.success('Mensagem removida com sucesso!');
  };

  const handleMarkAsRead = (id: number) => {
    const updatedMessages = messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    toast.success('Mensagem marcada como lida!');
  };

  const handleWebhookChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebhookUrl(e.target.value);
  };

  const saveWebhook = () => {
    setIsLoading(true);
    
    // Load current settings
    const savedTexts = localStorage.getItem('siteTexts');
    if (savedTexts) {
      const parsedTexts = JSON.parse(savedTexts);
      // Update webhook URL
      parsedTexts.webhookUrl = webhookUrl;
      // Save back to localStorage
      localStorage.setItem('siteTexts', JSON.stringify(parsedTexts));
    }
    
    setTimeout(() => {
      toast.success('Webhook configurado com sucesso!');
      setIsLoading(false);
    }, 1000);
  };

  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Mensagens Recebidas</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Configurar Webhook</h2>
        <p className="text-sm text-gray-500 mb-4">
          Configure um endpoint para receber automaticamente as mensagens de contato em seu sistema.
          Todas as mensagens enviadas através do formulário de contato serão enviadas para esse URL.
        </p>
        
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={webhookUrl}
            onChange={handleWebhookChange}
            placeholder="https://seu-site.com/api/webhook"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
          />
          <CustomButton 
            variant="primary" 
            onClick={saveWebhook} 
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar'}
          </CustomButton>
        </div>
        
        {webhookUrl && (
          <div className="mt-2 text-xs text-gray-500 flex items-center">
            <ExternalLink size={12} className="mr-1" />
            As mensagens serão enviadas via POST para: {webhookUrl}
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Mensagens</h2>
        
        {messages.length === 0 ? (
          <p className="text-gray-500">Nenhuma mensagem encontrada.</p>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`border rounded-lg p-4 ${!message.read ? 'bg-blue-50' : ''}`}
              >
                <div className="flex justify-between mb-3">
                  <div>
                    <h3 className="font-medium flex items-center">
                      {message.firstName} {message.lastName}
                      {!message.read && (
                        <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                          Nova
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {message.email} | {message.phone}
                    </p>
                    <p className="text-xs text-gray-400">
                      Recebida em: {formatDate(message.date)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!message.read && (
                      <button
                        onClick={() => handleMarkAsRead(message.id)}
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="Marcar como lida"
                      >
                        Marcar como lida
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      aria-label="Excluir mensagem"
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 border-t pt-3 mt-2">{message.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
