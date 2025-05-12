
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from './CustomButton';
import { saveContactMessage, getSiteTexts } from '@/utils/localStorage';
import { supabase } from '@/integrations/supabase/client';
import { useWebhook } from '@/hooks/useWebhook';

interface ContactFormProps {
  className?: string;
  isDark?: boolean;
}

export function ContactForm({ className = '', isDark = false }: ContactFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  
  // Usar o hook personalizado para webhook
  const { sendWebhook } = useWebhook();
  
  useEffect(() => {
    // Carregar URL do webhook do localStorage e do banco de dados
    const siteTexts = getSiteTexts();
    if (siteTexts.webhookUrl) {
      setWebhookUrl(siteTexts.webhookUrl);
    }
    
    // Também buscar da base de dados se existir
    const fetchWebhookUrl = async () => {
      const { data } = await supabase
        .from('site_texts')
        .select('content')
        .eq('key', 'webhookUrl')
        .maybeSingle();
        
      if (data?.content) {
        setWebhookUrl(data.content);
      }
    };
    
    fetchWebhookUrl().catch(console.error);
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!firstName || !email || !message) {
      toast.error('Por favor, preencha os campos obrigatórios.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Gerar ID único para esta mensagem (para rastreamento)
      const threadId = `thread_${Date.now()}`;
      const contactId = `contact_${Date.now()}`;
      
      // Objeto de dados de contato
      const contactData = {
        firstName,
        lastName,
        email,
        phone,
        message,
        threadId,
        contactId,
        date: new Date().toISOString()
      };
      
      // Salvar no localStorage para compatibilidade com código legado
      saveContactMessage({
        firstName,
        lastName,
        email,
        phone,
        message
      });
      
      // Inserir no banco de dados
      const { error } = await supabase
        .from('site_contact_messages')
        .insert([{
          firstname: firstName,
          lastname: lastName,
          email,
          phone,
          message,
          read: false,
          thread_id: threadId,
          contact_id: contactId,
          date: new Date().toISOString()
        }]);
      
      if (error) {
        console.error('Erro ao salvar mensagem no banco de dados:', error);
        throw error;
      }
      
      // Enviar para webhook se URL estiver configurada
      if (webhookUrl && webhookUrl.trim() !== '') {
        await sendWebhook(webhookUrl, contactData);
      } else {
        console.log('URL de webhook não configurada. Pulando envio.');
      }
      
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      
      // Limpar formulário
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
      
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      toast.error('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const inputClass = isDark
    ? "bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
    : "bg-white border border-gray-300 text-gray-900 focus:border-gray-400";

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'} mb-1`}>
            Nome*
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`w-full px-4 py-2 rounded-md ${inputClass}`}
            placeholder="Seu nome"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'} mb-1`}>
            Sobrenome
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`w-full px-4 py-2 rounded-md ${inputClass}`}
            placeholder="Seu sobrenome"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'} mb-1`}>
            Email*
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 rounded-md ${inputClass}`}
            placeholder="seu@email.com"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'} mb-1`}>
            Telefone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`w-full px-4 py-2 rounded-md ${inputClass}`}
            placeholder="(11) 98765-4321"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'} mb-1`}>
          Mensagem*
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className={`w-full px-4 py-2 rounded-md ${inputClass}`}
          placeholder="Como podemos ajudar?"
          required
        />
      </div>
      
      <div>
        <CustomButton 
          type="submit" 
          variant="primary" 
          className="w-full mt-4" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </CustomButton>
      </div>
    </form>
  );
}
