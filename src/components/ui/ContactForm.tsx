
import React, { useEffect } from 'react';
import { useContactForm } from './contact/useContactForm';
import { ContactFormLayout } from './contact/ContactFormLayout';

interface ContactFormProps {
  className?: string;
  isDark?: boolean;
}

export function ContactForm({ className = '', isDark = false }: ContactFormProps) {
  const { 
    firstName, 
    lastName, 
    email, 
    phone, 
    message, 
    isSubmitting,
    setFirstName, 
    setLastName, 
    setEmail, 
    setPhone, 
    setMessage,
    loadWebhookUrl, 
    handleSubmit 
  } = useContactForm();
  
  useEffect(() => {
    // Carregar URL do webhook quando o componente montar
    loadWebhookUrl();
  }, []);

  return (
    <div className={className}>
      <ContactFormLayout
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        message={message}
        isSubmitting={isSubmitting}
        isDark={isDark}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        setPhone={setPhone}
        setMessage={setMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
