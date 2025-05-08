
import React from 'react';
import { CustomButton } from './CustomButton';

interface ContactFormProps {
  variant?: 'simple' | 'full';
}

export const ContactForm: React.FC<ContactFormProps> = ({ variant = 'simple' }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  if (variant === 'simple') {
    return (
      <form
        onSubmit={handleSubmit}
        className="justify-center z-10 flex w-[444px] max-w-full gap-4 text-base text-white whitespace-nowrap"
      >
        <input
          type="email"
          placeholder="E-mail"
          className="items-stretch border-white min-w-[240px] min-h-[52px] flex-1 px-[25px] py-[17px] rounded-lg border border-solid bg-transparent"
          required
        />
        <CustomButton type="submit" variant="primary">
          Enviar
        </CustomButton>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
            Primeiro Nome
          </label>
          <input
            type="text"
            id="firstname"
            placeholder="Primeiro Nome"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
            Sobrenome
          </label>
          <input
            type="text"
            id="lastname"
            placeholder="Sobrenome"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            placeholder="E-mail"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Telefone
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Telefone"
            className="w-full h-12 px-4 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Mensagem
        </label>
        <textarea
          id="message"
          placeholder="Digite aqui sua mensagem..."
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        ></textarea>
      </div>

      <CustomButton type="submit" variant="primary" className="w-full">
        Enviar
      </CustomButton>
    </form>
  );
};
