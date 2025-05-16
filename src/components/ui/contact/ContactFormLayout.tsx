
import React from 'react';
import { CustomButton } from '@/components/ui/CustomButton';

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
  // Classes dinâmicas baseadas na prop isDark
  const labelClass = isDark ? "text-white" : "text-gray-700";
  const inputClass = `w-full rounded px-4 py-2 ${
    isDark 
      ? 'bg-transparent border border-white/50 text-white placeholder:text-white/60' 
      : 'bg-white border border-gray-300 text-gray-800 placeholder:text-gray-400'
  } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`;

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className={`block text-sm font-medium mb-1 ${labelClass}`}>
            Nome<span className="text-red-500">*</span>
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Seu nome"
            required
            className={inputClass}
          />
        </div>
        
        <div>
          <label htmlFor="lastName" className={`block text-sm font-medium mb-1 ${labelClass}`}>
            Sobrenome
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Seu sobrenome"
            className={inputClass}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={`block text-sm font-medium mb-1 ${labelClass}`}>
            Email<span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            className={inputClass}
          />
        </div>
        
        <div>
          <label htmlFor="phone" className={`block text-sm font-medium mb-1 ${labelClass}`}>
            Telefone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(00) 00000-0000"
            className={inputClass}
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="message" className={`block text-sm font-medium mb-1 ${labelClass}`}>
          Mensagem<span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Como podemos ajudar?"
          required
          rows={4}
          className={inputClass}
        />
      </div>
      
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
