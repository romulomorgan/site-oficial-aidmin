
import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'outline';
  icon?: string;
  children: React.ReactNode;
  size?: 'default' | 'sm' | 'lg';
}

export const CustomButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  size = 'default',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "justify-center items-center flex gap-2 rounded-lg transition-all duration-300 hover:scale-[1.03]",
        variant === 'primary' && "bg-[#FF196E] text-white hover:bg-[#ff3582] hover:shadow-md",
        variant === 'secondary' && "border border-white text-white hover:bg-white/10 hover:shadow-md",
        variant === 'destructive' && "bg-red-600 text-white hover:bg-red-700 hover:shadow-md",
        variant === 'outline' && "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:shadow-md",
        size === 'default' && "min-h-[52px] px-6 py-3",
        size === 'sm' && "min-h-[36px] px-3 py-2 text-sm",
        size === 'lg' && "min-h-[60px] px-8 py-4",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="max-w-5 self-stretch overflow-hidden flex-1 shrink basis-[0%] my-auto">
          <img src={icon} alt="" className="aspect-[1] object-contain w-5 h-5" />
        </span>
      )}
      <span className={cn(
        "font-medium leading-normal",
        size === 'default' && "text-base",
        size === 'sm' && "text-sm",
        size === 'lg' && "text-lg"
      )}>
        {children}
      </span>
    </button>
  );
};
