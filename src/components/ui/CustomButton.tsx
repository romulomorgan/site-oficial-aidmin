
import React from 'react';
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  icon?: string;
  children: React.ReactNode;
}

export const CustomButton: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "justify-center items-center flex min-h-[52px] gap-2 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-[1.03]",
        variant === 'primary' && "bg-[#FF196E] text-white hover:bg-[#ff3582] hover:shadow-md",
        variant === 'secondary' && "border border-white text-white hover:bg-white/10 hover:shadow-md",
        className
      )}
      {...props}
    >
      {icon && (
        <span className="max-w-5 self-stretch overflow-hidden flex-1 shrink basis-[0%] my-auto">
          <img src={icon} alt="" className="aspect-[1] object-contain w-5 h-5" />
        </span>
      )}
      <span className="text-base font-medium leading-normal">
        {children}
      </span>
    </button>
  );
};
