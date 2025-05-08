
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from './CustomButton';

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className = '' }: ContactFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  
  useEffect(() => {
    // Load webhook URL from localStorage
    const savedTexts = localStorage.getItem('siteTexts');
    if (savedTexts) {
      const parsedTexts = JSON.parse(savedTexts);
      if (parsedTexts.webhookUrl) {
        setWebhookUrl(parsedTexts.webhookUrl);
      }
    }
  }, []);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!firstName || !email || !message) {
      toast.error('Por favor, preencha os campos obrigatórios.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Create new message object
    const newMessage = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      phone,
      message,
      date: new Date().toISOString(),
      read: false
    };
    
    // Save to localStorage
    const savedMessages = localStorage.getItem('contactMessages');
    let messages = [];
    
    if (savedMessages) {
      messages = JSON.parse(savedMessages);
    }
    
    messages.push(newMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // If webhook URL is defined, send message to webhook
    if (webhookUrl) {
      try {
        console.log('Sending message to webhook:', webhookUrl, newMessage);
        // In a real application, you would do a fetch here
        // Since we're just simulating, we'll add a delay
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
  
  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="firstName" className="block text-gray-800 mb-1">Primeiro Nome</label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Primeiro Nome"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-800 mb-1">Sobrenome</label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Sobrenome"
            />
          </div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <div>
            <label htmlFor="email" className="block text-gray-800 mb-1">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="E-mail"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-gray-800 mb-1">Telefone</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded"
              placeholder="Telefone"
            />
          </div>
        </div>
  
        <div className="mt-5">
          <label htmlFor="message" className="block text-gray-800 mb-1">Mensagem</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded"
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
