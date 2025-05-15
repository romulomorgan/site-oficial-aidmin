
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";

interface InputMaskProps extends Omit<React.ComponentProps<typeof Input>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  mask?: 'phone' | 'custom';
  className?: string;
  isDark?: boolean;
}

export const InputMask: React.FC<InputMaskProps> = ({
  value,
  onChange,
  mask = 'phone',
  className,
  isDark = false,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState<string>('');

  // Aplicar máscara de telefone inteligente (celular ou fixo)
  const formatPhoneNumber = (value: string): string => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Se não tiver números, retornar vazio
    if (!numbers) return '';
    
    // Se tiver apenas o DDD (2 dígitos)
    if (numbers.length <= 2) {
      return `(${numbers}`;
    }
    
    // Se tiver o DDD completo (2 dígitos) e começou a digitar o número
    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    
    // Se for celular (com o nono dígito) - total 11 dígitos com DDD
    if (numbers.length >= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
    
    // Se for telefone fixo - total 10 dígitos com DDD
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6, 10)}`;
  };

  // Efeito para formatar o valor inicial quando o componente montar
  useEffect(() => {
    if (mask === 'phone' && value) {
      setDisplayValue(formatPhoneNumber(value));
    } else {
      setDisplayValue(value);
    }
  }, [value, mask]);

  // Lidar com a mudança de input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (mask === 'phone') {
      // Para telefone, formatar o display e passar apenas os números para o onChange
      setDisplayValue(formatPhoneNumber(newValue));
      // Remove tudo que não for número antes de passar para o onChange
      onChange(newValue.replace(/\D/g, ''));
    } else {
      // Para outros tipos, apenas passar o valor como está
      setDisplayValue(newValue);
      onChange(newValue);
    }
  };

  // Aplicar estilos condicionais com base no tema escuro/claro - usando exatamente o mesmo estilo dos outros campos
  const inputClass = isDark
    ? "bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
    : "bg-white border border-gray-300 text-gray-900 focus:border-gray-400";

  return (
    <Input
      value={displayValue}
      onChange={handleInputChange}
      className={`${inputClass} ${className}`}
      {...props}
    />
  );
};
