
import * as React from "react";
import { toast as sonnerToast, Toaster as SonnerToaster, ToastT } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      className="toaster group"
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
    />
  );
}

// Tipos para o toast
export interface ToastActionElement {
  altText?: string;
  action: React.ReactNode;
}

export interface ToastOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive" | "success" | "warning";
  action?: ToastActionElement;
  [key: string]: any;
}

// Definição do hook useToast
export const useToast = () => {
  // Esta função permite usar o toast de forma padronizada
  const showToast = ({
    title,
    description,
    variant = "default",
    action,
    ...props
  }: ToastOptions) => {
    const toastOptions: any = {
      ...props,
      description
    };

    if (action) {
      toastOptions.action = action.action;
      toastOptions.actionAltText = action.altText;
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

  // Métodos auxiliares para diferentes tipos de toast
  const showError = (props: Omit<ToastOptions, "variant">) =>
    showToast({ ...props, variant: "destructive" });

  const showSuccess = (props: Omit<ToastOptions, "variant">) =>
    showToast({ ...props, variant: "success" });

  const showWarning = (props: Omit<ToastOptions, "variant">) =>
    showToast({ ...props, variant: "warning" });

  const showInfo = (props: Omit<ToastOptions, "variant">) =>
    showToast({ ...props, variant: "default" });

  return {
    toast: showToast,
    error: showError,
    success: showSuccess,
    warning: showWarning,
    info: showInfo
  };
};

// Função simplificada para uso direto do toast
export const toast = {
  ...sonnerToast,
  error: (title: string, description?: string) => sonnerToast.error(title, { description }),
  success: (title: string, description?: string) => sonnerToast.success(title, { description }),
  warning: (title: string, description?: string) => sonnerToast.warning(title, { description }),
  info: (title: string, description?: string) => sonnerToast(title, { description })
};

