import React from 'react';
import { Button } from './Button';

export const ContactForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

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
      <Button type="submit" variant="primary">
        Enviar
      </Button>
    </form>
  );
};
