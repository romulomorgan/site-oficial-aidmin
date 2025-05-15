
import * as React from "react"
import { Toaster as Sonner } from "sonner"

import { useMediaQuery } from "./use-media-query"
import { cn } from "@/lib/utils"

type ToasterProps = React.ComponentProps<typeof Sonner>

const ToastProvider = ({ ...props }: ToasterProps) => {
  const { theme = "system", ...rest } = props
  const desktop = useMediaQuery("(min-width: 768px)")

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className={cn("toaster group", desktop ? "md:toaster-desktop" : "")}
      richColors
      position="top-right"
      closeButton
      expand={!desktop}
      {...rest}
    />
  )
}

export { ToastProvider as Toaster }

export type ToastProps = React.ComponentProps<typeof Toast>

// Define a toast type for our internal usage
type ToastType = {
  id: string
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

// Hack to forward the toast function type
export const { toast } = (() => {
  // Declare a type that represents the properties of the toast function
  type ToastFunction = {
    (message: string, options?: { duration?: number }): void;
    error: (message: string, options?: { duration?: number }) => void;
    success: (message: string, options?: { duration?: number }) => void;
    loading: (message: string, options?: { duration?: number }) => void;
    warning: (message: string, options?: { duration?: number }) => void;
    info: (message: string, options?: { duration?: number }) => void;
  };

  const toast = ((message, options) => {
    // Implementation here would call the actual toast function
    const importedToast = require("sonner").toast;
    importedToast(message, options);
  }) as ToastFunction;

  // Add additional methods
  toast.error = (message, options) => {
    const importedToast = require("sonner").toast;
    importedToast.error(message, options);
  };

  toast.success = (message, options) => {
    const importedToast = require("sonner").toast;
    importedToast.success(message, options);
  };

  toast.loading = (message, options) => {
    const importedToast = require("sonner").toast;
    importedToast.loading(message, options);
  };

  toast.warning = (message, options) => {
    const importedToast = require("sonner").toast;
    importedToast.warning(message, options);
  };

  toast.info = (message, options) => {
    const importedToast = require("sonner").toast;
    importedToast.info(message, options);
  };

  return { toast };
})();

// Create a React context to store and provide toast state
type ToastContextType = {
  toasts: ToastType[]
  toast: typeof toast
  dismiss: (toastId?: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

// Provider component
export function ToastContextProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastType[]>([]);
  
  const addToast = React.useCallback((toast: Omit<ToastType, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prevToasts) => [...prevToasts, { id, ...toast }]);
    return id;
  }, []);

  const dismissToast = React.useCallback((toastId?: string) => {
    require("sonner").toast.dismiss(toastId);
    
    if (toastId) {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId));
    } else {
      setToasts([]);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      toasts,
      toast,
      dismiss: dismissToast,
    }),
    [toasts, dismissToast]
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

function useToast() {
  const context = React.useContext(ToastContext);
  
  if (!context) {
    // For backward compatibility, if not in context, return minimal interface
    return {
      toast,
      dismiss: (toastId?: string) => {
        require("sonner").toast.dismiss(toastId);
      },
      toasts: [] // Add empty toasts array for compatibility
    };
  }
  
  return context;
}

export { useToast };

// Forward the original component directly
export const Toast = ({ ...props }: any) => {
  return props.children;
};
