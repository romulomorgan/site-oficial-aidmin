
import * as React from "react";
import { toast as sonnerToast, Toaster as SonnerToaster, type ToastT, type ToastToDismiss } from "sonner";

export function Toaster({
  position = "bottom-right",
  ...props
}: React.ComponentProps<typeof SonnerToaster>) {
  return (
    <SonnerToaster
      className="toaster group"
      position={position}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-950 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-500",
          actionButton:
            "group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50 hover:group-[.toast]:bg-gray-900/90",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500 hover:group-[.toast]:bg-gray-100/80",
          error:
            "group-[.toaster]:bg-red-50 group-[.toaster]:text-red-900 group-[.toaster]:border-red-200",
          success:
            "group-[.toaster]:bg-green-50 group-[.toaster]:text-green-900 group-[.toaster]:border-green-200",
          warning:
            "group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-900 group-[.toaster]:border-yellow-200"
        }
      }}
      expand={false}
      duration={3000}
      richColors
      {...props}
    />
  );
}

// Define os tipos para ações de toast
export interface ToastActionElement {
  altText?: string;
  action: React.ReactNode;
}

// Define os tipos para propriedades do toast
export interface ToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive" | "success" | "warning";
  action?: ToastActionElement;
  [key: string]: any;
}

// Hook useToast
export const useToast = () => {
  const toasts = React.useState<ToastT[]>([]);

  const showToast = ({
    title,
    description,
    variant = "default",
    action,
    ...props
  }: ToastProps) => {
    const toastOptions = {
      ...props,
      description,
    };

    if (action) {
      (toastOptions as any).action = action.action;
      (toastOptions as any).altText = action.altText;
    }

    switch (variant) {
      case "destructive":
        return sonnerToast.error(title as string, toastOptions);
      case "success":
        return sonnerToast.success(title as string, toastOptions);
      case "warning":
        return sonnerToast.warning(title as string, toastOptions);
      default:
        return sonnerToast(title as string, toastOptions);
    }
  };

  const showError = (props: Omit<ToastProps, "variant">) =>
    showToast({ ...props, variant: "destructive" });

  const showSuccess = (props: Omit<ToastProps, "variant">) =>
    showToast({ ...props, variant: "success" });

  const showWarning = (props: Omit<ToastProps, "variant">) =>
    showToast({ ...props, variant: "warning" });

  const showInfo = (props: Omit<ToastProps, "variant">) =>
    showToast({ ...props, variant: "default" });

  return {
    toast: showToast,
    error: showError,
    success: showSuccess,
    warning: showWarning,
    info: showInfo,
    toasts
  };
};

// Exportar funções de toast para uso direto
export const toast = {
  // Função principal de toast
  show: (title: string, description?: string) => sonnerToast(title, { description }),
  
  // Funções específicas por tipo
  error: (title: string, description?: string) => sonnerToast.error(title, { description }),
  success: (title: string, description?: string) => sonnerToast.success(title, { description }),
  warning: (title: string, description?: string) => sonnerToast.warning(title, { description }),
  info: (title: string, description?: string) => sonnerToast(title, { description }),
  
  // Reexportar outras funções do sonner
  ...sonnerToast
};
