
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

export type ToastProps = React.ComponentPropsWithoutRef<typeof SonnerToaster>;

// Define as propriedades do toast
export interface ToastActionElement {
  altText?: string;
  action: React.ReactNode;
}

export interface ToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive" | "success" | "warning";
  action?: ToastActionElement;
}

// Define o hook useToast
export const useToast = () => {
  const showToast = ({
    title,
    description,
    variant = "default",
    action,
    ...props
  }: ToastProps) => {
    const toastOptions = {
      ...props,
    };

    if (action) {
      toastOptions.action = action.action;
      toastOptions.actionAltText = action.altText;
    }

    switch (variant) {
      case "destructive":
        return sonnerToast.error(title, {
          ...toastOptions,
          description,
        });
      case "success":
        return sonnerToast.success(title, {
          ...toastOptions,
          description,
        });
      case "warning":
        return sonnerToast.warning(title, {
          ...toastOptions,
          description,
        });
      default:
        return sonnerToast(title, {
          ...toastOptions,
          description,
        });
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
    info: showInfo
  };
};

export const toast = {
  ...sonnerToast,
  error: (title: string, description?: string) => sonnerToast.error(title, { description }),
  success: (title: string, description?: string) => sonnerToast.success(title, { description }),
  warning: (title: string, description?: string) => sonnerToast.warning(title, { description }),
  info: (title: string, description?: string) => sonnerToast(title, { description })
};
