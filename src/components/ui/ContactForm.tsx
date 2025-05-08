
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from './CustomButton';
import { saveContactMessage, getSiteTexts } from '@/utils/localStorage';

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
  
  useEffect(() => {
    // Load webhook URL from localStorage
    const siteTexts = getSiteTexts();
    if (siteTexts.webhookUrl) {
      setWebhookUrl(siteTexts.webhookUrl);
    }
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!firstName || !email || !message) {
      toast.error('Por favor, preencha os campos obrigatórios.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Save to localStorage
    saveContactMessage({
      firstName,
      lastName,
      email,
      phone,
      message
    });
    
    // If webhook URL is defined, send message to webhook
    if (webhookUrl) {
      try {
        console.log('Sending message to webhook:', webhookUrl, {
          firstName,
          lastName,
          email,
          phone,
          message,
          date: new Date().toISOString()
        });
        // In a real application, you would do a fetch here
      } catch (error) {
        console.error('Error sending message to webhook:', error);
      }
    }
    
    setTimeout(() => {
      toast.success('Mensagem enviada com sucesso!');
      
      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };
  
  const inputClassName = isDark 
    ? "w-full px-4 py-2 bg-transparent border border-white text-white placeholder:text-white/70 rounded" 
    : "w-full px-4 py-2 border border-gray-300 rounded";
  
  const labelClassName = isDark
    ? "block text-white mb-1"
    : "block text-gray-800 mb-1";
  
  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className={labelClassName}>Primeiro Nome</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClassName}
              placeholder="Primeiro Nome"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClassName}>Sobrenome</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={inputClassName}
              placeholder="Sobrenome"
            />
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="email" className={labelClassName}>E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClassName}
              placeholder="E-mail"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className={labelClassName}>Telefone</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClassName}
              placeholder="Telefone"
            />
          </div>
        </div>
  
        <div className="mt-5">
          <label htmlFor="message" className={labelClassName}>Mensagem</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClassName}
            placeholder="Digite aqui sua mensagem..."
            rows={5}
            required
          ></textarea>
        </div>
  
        <div className="mt-5">
          <CustomButton
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
