import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "justify-center items-center flex min-h-[52px] gap-2 px-6 py-[13px] rounded-lg",
        variant === 'primary' && "bg-[#FF196E] text-white",
        variant === 'secondary' && "border border-white text-white",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="max-w-5 self-stretch min-h-5 overflow-hidden flex-1 shrink basis-[0%] my-auto">
          <img src={icon} alt="" className="aspect-[1] object-contain w-full" />
        </div>
      )}
      <div className="text-base font-medium leading-loose">
        {children}
      </div>
    </button>
  );
};
