
import * as React from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-800 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-600",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          error:
            "group-[.toaster]:bg-red-50 group-[.toaster]:text-red-900 group-[.toaster]:border-red-200",
          success:
            "group-[.toaster]:bg-green-50 group-[.toaster]:text-green-900 group-[.toaster]:border-green-200",
          warning:
            "group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-900 group-[.toaster]:border-yellow-200",
        },
      }}
      expand={false}
      duration={3000}
      position="top-right"
      {...props}
    />
  );
};

export { Toaster };

// Define window.toast for TypeScript
declare global {
  interface Window {
    toast: {
      (message: string, options?: any): void;
      error: (message: string, options?: any) => void;
      success: (message: string, options?: any) => void;
      warning: (message: string, options?: any) => void;
      info: (message: string, options?: any) => void;
    };
  }
}

export const toast = (message: string) => {
  return window.toast(message);
};

toast.error = (message: string) => {
  return window.toast.error(message);
};

toast.success = (message: string) => {
  return window.toast.success(message);
};

toast.warning = (message: string) => {
  return window.toast.warning(message);
};

toast.info = (message: string, options = { duration: 3000 }) => {
  return window.toast.info(message, options);
};

interface UseToastOptions {
  duration?: number;
}

export const useToast = () => {
  const showToast = (message: string, options: UseToastOptions = {}) => {
    return toast(message);
  };

  const showError = (message: string, options: UseToastOptions = {}) => {
    return toast.error(message);
  };

  const showSuccess = (message: string, options: UseToastOptions = {}) => {
    return toast.success(message);
  };

  const showWarning = (message: string, options: UseToastOptions = {}) => {
    return toast.warning(message);
  };

  const showInfo = (message: string, options: UseToastOptions = {}) => {
    return toast.info(message, options);
  };

  return {
    toast: showToast,
    error: showError,
    success: showSuccess,
    warning: showWarning,
    info: showInfo,
  };
};

export default useToast;
