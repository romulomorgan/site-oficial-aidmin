
import * as React from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast as useToastBase } from "@/components/ui/use-toast";

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

export type ToastActionElement = React.ReactElement<typeof ToastAction>;

export type ToastOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive" | "success";
};

export const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));

ToastAction.displayName = "ToastAction";

// Função de utilidade cn
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Toaster component
export function Toaster() {
  const { toasts } = useToastBase();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

// Re-export do useToast
export const useToast = useToastBase;

// Função de toast
export const toast = {
  success: (message: string) => {
    return useToastBase().toast({
      title: "Sucesso",
      description: message,
      variant: "default",
    });
  },
  error: (message: string) => {
    return useToastBase().toast({
      title: "Erro",
      description: message,
      variant: "destructive",
    });
  },
  info: (message: string) => {
    return useToastBase().toast({
      description: message,
    });
  },
  warning: (message: string) => {
    return useToastBase().toast({
      title: "Aviso",
      description: message,
      variant: "destructive",
    });
  },
  // Tipo genérico para compatibilidade com o toast padrão
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...useToastBase().toast,
};
