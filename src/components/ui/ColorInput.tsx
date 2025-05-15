
import React from 'react';

interface ColorInputProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ColorInput: React.FC<ColorInputProps> = ({
  id,
  name,
  label,
  value,
  onChange
}) => {
  const handleColorPickerChange = (color: string) => {
    onChange({
      target: { name, value: color }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <label htmlFor={id} className="text-right font-medium">
        {label}
      </label>
      <div className="col-span-3 flex items-center gap-2">
        <input
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-color focus:border-primary-color"
        />
        <input
          type="color"
          value={value}
          onChange={(e) => handleColorPickerChange(e.target.value)}
          className="w-10 h-10 rounded cursor-pointer"
        />
      </div>
    </div>
  );
};
