import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';
import { Trash, ExternalLink, Mail, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';

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

interface EmailSubscription {
  id: number;
  email: string;
  date: string;
  source: string;
}

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [emailSubscriptions, setEmailSubscriptions] = useState<EmailSubscription[]>([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [replyTo, setReplyTo] = useState<Message | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);
  const [showDeleteEmailConfirm, setShowDeleteEmailConfirm] = useState<number | null>(null);

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
    
    // Load email subscriptions
    const savedEmailSubscriptions = localStorage.getItem('emailSubscriptions');
    if (savedEmailSubscriptions) {
      setEmailSubscriptions(JSON.parse(savedEmailSubscriptions));
    } else {
      // Sample email subscriptions
      const sampleEmailSubscriptions = [
        {
          id: 1,
          email: "cliente@example.com",
          date: "2024-04-15T10:30:00",
          source: "Formulário de Contato"
        },
        {
          id: 2,
          email: "empresa@business.com",
          date: "2024-04-20T14:45:00",
          source: "Rodapé da Página"
        }
      ];
      setEmailSubscriptions(sampleEmailSubscriptions);
      localStorage.setItem('emailSubscriptions', JSON.stringify(sampleEmailSubscriptions));
    }
  }, []);

  const handleDeleteMessage = (id: number) => {
    const updatedMessages = messages.filter(message => message.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    setShowDeleteConfirm(null);
    toast.success('Mensagem removida com sucesso!');
  };

  const handleDeleteEmailSubscription = (id: number) => {
    const updatedSubscriptions = emailSubscriptions.filter(sub => sub.id !== id);
    setEmailSubscriptions(updatedSubscriptions);
    localStorage.setItem('emailSubscriptions', JSON.stringify(updatedSubscriptions));
    setShowDeleteEmailConfirm(null);
    toast.success('Inscrição removida com sucesso!');
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

  const handleSendReply = () => {
    if (!replyTo || !replyMessage.trim() || !webhookUrl) {
      toast.error('Por favor, preencha a mensagem e configure o webhook!');
      return;
    }

    setIsLoading(true);

    // Simulate sending email via webhook
    console.log('Sending reply via webhook:', {
      to: replyTo.email,
      from: "noreply@iadmin.com",
      subject: `Re: Contato IAdmin - ${replyTo.firstName} ${replyTo.lastName}`,
      message: replyMessage,
      contactData: {
        firstName: replyTo.firstName,
        lastName: replyTo.lastName,
        email: replyTo.email,
        phone: replyTo.phone,
        originalMessage: replyTo.message
      }
    });

    // Mark the message as read
    handleMarkAsRead(replyTo.id);

    setTimeout(() => {
      toast.success(`Resposta enviada para ${replyTo.email}!`);
      setIsLoading(false);
      setReplyTo(null);
      setReplyMessage('');
    }, 1500);
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
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Central de Mensagens</h1>
      
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
        <Tabs defaultValue="messages">
          <TabsList className="border-b w-full mb-6">
            <TabsTrigger value="messages">Mensagens de Contato</TabsTrigger>
            <TabsTrigger value="subscriptions">Inscrições de Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Mensagens de Contato</h2>
            
            {messages.length === 0 ? (
              <p className="text-gray-500">Nenhuma mensagem encontrada.</p>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`border rounded-lg p-4 transition-colors ${!message.read ? 'bg-blue-50' : ''}`}
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
                        <button
                          onClick={() => setReplyTo(message)}
                          className="text-blue-500 hover:text-blue-700 transition-colors flex items-center"
                          title="Responder"
                        >
                          <Mail className="h-5 w-5 mr-1" />
                          Responder
                        </button>
                        
                        {!message.read && (
                          <button
                            onClick={() => handleMarkAsRead(message.id)}
                            className="text-green-500 hover:text-green-700 transition-colors"
                            title="Marcar como lida"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => setShowDeleteConfirm(message.id)}
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
          </TabsContent>
          
          <TabsContent value="subscriptions">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Inscrições de Email</h2>
            
            {emailSubscriptions.length === 0 ? (
              <p className="text-gray-500">Nenhuma inscrição encontrada.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-2 px-4 text-left border-b">Email</th>
                      <th className="py-2 px-4 text-left border-b">Data</th>
                      <th className="py-2 px-4 text-left border-b">Origem</th>
                      <th className="py-2 px-4 text-right border-b">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {emailSubscriptions.map((subscription) => (
                      <tr key={subscription.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">{subscription.email}</td>
                        <td className="py-2 px-4 border-b">{formatDate(subscription.date)}</td>
                        <td className="py-2 px-4 border-b">{subscription.source}</td>
                        <td className="py-2 px-4 border-b text-right">
                          <button
                            onClick={() => setShowDeleteEmailConfirm(subscription.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            aria-label="Excluir inscrição"
                          >
                            <Trash className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Reply Dialog */}
      {replyTo && (
        <Dialog open={!!replyTo} onOpenChange={(open) => !open && setReplyTo(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Responder à Mensagem</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="bg-gray-50 p-3 rounded text-sm">
                <p><strong>Para:</strong> {replyTo.firstName} {replyTo.lastName} ({replyTo.email})</p>
                <p><strong>Mensagem original:</strong></p>
                <p className="italic text-gray-600">{replyTo.message}</p>
              </div>
              
              <div>
                <label htmlFor="replyMessage" className="block text-sm font-medium mb-1 text-gray-700">
                  Sua resposta:
                </label>
                <textarea
                  id="replyMessage"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
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
                onClick={() => setReplyTo(null)}
              >
                Cancelar
              </CustomButton>
              <CustomButton 
                type="button" 
                variant="primary"
                disabled={!replyMessage.trim() || !webhookUrl || isLoading}
                onClick={handleSendReply}
              >
                {isLoading ? "Enviando..." : "Enviar Resposta"}
              </CustomButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Confirm Delete Message Dialog */}
      {showDeleteConfirm !== null && (
        <Dialog open={showDeleteConfirm !== null} onOpenChange={(open) => !open && setShowDeleteConfirm(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p>Tem certeza de que deseja excluir esta mensagem?</p>
              <p className="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
            </div>
            
            <DialogFooter>
              <CustomButton 
                type="button" 
                variant="secondary" 
                onClick={() => setShowDeleteConfirm(null)}
              >
                <X className="mr-1 h-4 w-4" /> Cancelar
              </CustomButton>
              <CustomButton 
                type="button" 
                variant="destructive"
                onClick={() => handleDeleteMessage(showDeleteConfirm)}
              >
                <Trash className="mr-1 h-4 w-4" /> Excluir
              </CustomButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Confirm Delete Email Subscription Dialog */}
      {showDeleteEmailConfirm !== null && (
        <Dialog open={showDeleteEmailConfirm !== null} onOpenChange={(open) => !open && setShowDeleteEmailConfirm(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            
            <div className="py-4">
              <p>Tem certeza de que deseja excluir esta inscrição de e-mail?</p>
              <p className="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
            </div>
            
            <DialogFooter>
              <CustomButton 
                type="button" 
                variant="secondary" 
                onClick={() => setShowDeleteEmailConfirm(null)}
              >
                <X className="mr-1 h-4 w-4" /> Cancelar
              </CustomButton>
              <CustomButton 
                type="button" 
                variant="destructive"
                onClick={() => handleDeleteEmailSubscription(showDeleteEmailConfirm)}
              >
                <Trash className="mr-1 h-4 w-4" /> Excluir
              </CustomButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
