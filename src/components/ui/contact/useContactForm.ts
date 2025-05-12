
import { useState } from 'react';
import { toast } from 'sonner';
import { saveContactMessage, getSiteTexts } from '@/utils/localStorage';
import { supabase } from '@/integrations/supabase/client';
import { useWebhook } from '@/hooks/useWebhook';

export function useContactForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  
  // Usar o hook personalizado para webhook
  const { sendWebhook } = useWebhook();
  
  const loadWebhookUrl = async () => {
    // Carregar URL do webhook do localStorage e do banco de dados
    const siteTexts = getSiteTexts();
    if (siteTexts.webhookUrl) {
      setWebhookUrl(siteTexts.webhookUrl);
    }
    
    // Também buscar da base de dados se existir
    const { data } = await supabase
      .from('site_texts')
      .select('content')
      .eq('key', 'webhookUrl')
      .maybeSingle();
      
    if (data?.content) {
      console.log('Webhook URL carregado do banco de dados:', data.content);
      setWebhookUrl(data.content);
    } else {
      console.log('Webhook URL não encontrado no banco de dados');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!firstName || !email || !message) {
      toast.error('Por favor, preencha os campos obrigatórios.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Enviando formulário de contato...');
      
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
      
      console.log('Dados do formulário:', contactData);
      console.log('URL do webhook:', webhookUrl);
      
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
      
      // Enviar para webhook diretamente se URL estiver configurada
      if (webhookUrl && webhookUrl.trim() !== '') {
        console.log('Enviando diretamente para webhook (método fetch):', webhookUrl);
        
        try {
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: 'contact_message',
              firstName,
              lastName,
              email,
              phone: phone || 'Não informado',
              message,
              date: new Date().toISOString(),
              threadId,
              contactId
            })
          });
          
          console.log('Resposta do webhook direto:', response.status, await response.text());
        } catch (webhookError) {
          console.error('Erro ao enviar diretamente para webhook:', webhookError);
        }
        
        // Usar também o método do hook
        console.log('Enviando para webhook (método hook):', webhookUrl);
        const success = await sendWebhook(webhookUrl, contactData);
        
        if (!success) {
          console.warn('Falha ao enviar para webhook usando o hook, mas mensagem foi salva no banco de dados');
        }
      } else {
        console.warn('URL de webhook não configurada. Pulando envio de webhook.');
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

  return {
    firstName,
    lastName,
    email,
    phone,
    message,
    isSubmitting,
    webhookUrl,
    setFirstName,
    setLastName,
    setEmail,
    setPhone,
    setMessage,
    loadWebhookUrl,
    handleSubmit
  };
}
