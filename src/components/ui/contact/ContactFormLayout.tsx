
import React from 'react';
import { FormField } from './FormField';
import { CustomButton } from '../CustomButton';

interface ContactFormLayoutProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  isSubmitting: boolean;
  isDark?: boolean;
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setMessage: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export function ContactFormLayout({
  firstName,
  lastName,
  email,
  phone,
  message,
  isSubmitting,
  isDark = false,
  setFirstName,
  setLastName,
  setEmail,
  setPhone,
  setMessage,
  handleSubmit
}: ContactFormLayoutProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="firstName"
          label="Nome"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Seu nome"
          required
          isDark={isDark}
        />
        <FormField
          id="lastName"
          label="Sobrenome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Seu sobrenome"
          isDark={isDark}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          isDark={isDark}
        />
        <FormField
          id="phone"
          label="Telefone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(11) 98765-4321"
          isDark={isDark}
        />
      </div>
      
      <FormField
        id="message"
        label="Mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Como podemos ajudar?"
        required
        isDark={isDark}
        isTextarea
      />
      
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
