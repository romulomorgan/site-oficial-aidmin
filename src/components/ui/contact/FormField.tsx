
import React from 'react';
import { InputMask } from '@/components/ui/InputMask';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  isDark?: boolean;
  isTextarea?: boolean;
  rows?: number;
}

export function FormField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  className = '',
  isDark = false,
  isTextarea = false,
  rows = 4
}: FormFieldProps) {
  const inputClass = isDark
    ? "bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:border-white/40"
    : "bg-white border border-gray-300 text-gray-900 focus:border-gray-400";
  
  return (
    <div className={className}>
      <label htmlFor={id} className={`block text-sm font-medium ${isDark ? 'text-white/80' : 'text-gray-700'} mb-1`}>
        {label}{required && <span className="text-red-500">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`w-full px-4 py-2 rounded-md ${inputClass}`}
          placeholder={placeholder}
          required={required}
        />
      ) : type === 'tel' ? (
        <InputMask
          id={id}
          type="tel"
          value={value}
          onChange={(maskedValue) => {
            // Simulando o evento para manter compatibilidade com a interface existente
            const syntheticEvent = {
              target: {
                value: maskedValue,
                id: id,
                name: id
              }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
          }}
          placeholder="(00) 00000-0000"
          className="w-full px-4 py-2 rounded-md"
          required={required}
          mask="phone"
          isDark={isDark}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 rounded-md ${inputClass}`}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
}
