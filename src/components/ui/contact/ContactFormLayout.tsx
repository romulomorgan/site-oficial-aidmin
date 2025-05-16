
import React from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { FormField } from './FormField';

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
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export const ContactFormLayout: React.FC<ContactFormLayoutProps> = ({
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
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="firstName"
          label="Nome"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Seu nome"
          required
          className=""
          isDark={isDark}
        />
        
        <FormField
          id="lastName"
          label="Sobrenome"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Seu sobrenome"
          className=""
          isDark={isDark}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          className=""
          isDark={isDark}
        />
        
        <FormField
          id="phone"
          label="Telefone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="(00) 00000-0000"
          className=""
          isDark={isDark}
        />
      </div>
      
      <FormField
        id="message"
        label="Mensagem"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Como podemos ajudar?"
        required
        className=""
        isDark={isDark}
        isTextarea
        rows={4}
      />
      
      <div>
        <CustomButton
          type="submit"
          variant="primary"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </CustomButton>
      </div>
    </form>
  );
};
