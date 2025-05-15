
import * as React from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { toast as sonnerToast } from "sonner";

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

export type ToastActionElement = React.ReactElement<typeof ToastAction>;

export type ToastOptions = {
  title?: string;
  description?: React.ReactNode;
  action?: ToastActionElement;
  // Remover a variante "success" para alinhar com as variantes suportadas pelo componente Radix UI Toast
  variant?: "default" | "destructive";
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

type ToasterToast = ToastProps & {
  id: string;
  title?: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  // Aqui também removemos a variante "success"
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterState = {
  toasts: ToasterToast[];
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId === undefined) {
        return {
          ...state,
          toasts: state.toasts.map((t) => ({
            ...t,
            open: false,
          })),
        };
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId ? { ...t, open: false } : t
        ),
      };
    }

    case actionTypes.REMOVE_TOAST: {
      const { toastId } = action;

      if (toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== toastId),
      };
    }
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// Toaster component
export function Toaster() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return (
    <ToastProvider>
      {state.toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && <ToastDescription>{description}</ToastDescription>}
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

export function useToast() {
  return {
    toast: (props: ToastOptions) => {
      const id = genId();
      
      // Criar o objeto toast adequado tipado conforme ToasterToast
      const toast: ToasterToast = {
        id,
        ...props,
        open: true,
        onOpenChange: (open: boolean) => {
          if (!open) dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });
        },
      };

      const update = (props: ToastOptions) =>
        dispatch({
          type: actionTypes.UPDATE_TOAST,
          toast: { id, ...props } as Partial<ToasterToast>,
        });
        
      const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

      dispatch({
        type: actionTypes.ADD_TOAST,
        toast,
      });

      return {
        id,
        dismiss,
        update,
      };
    },
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId }),
  };
}

// Função de toast com açúcares sintáticos
export const toast = {
  success: (message: string) => {
    return sonnerToast.success("Sucesso", {
      description: message,
    });
  },
  error: (message: string) => {
    return sonnerToast.error("Erro", {
      description: message,
    });
  },
  info: (message: string) => {
    return sonnerToast(message);
  },
  warning: (message: string) => {
    return sonnerToast.warning("Aviso", {
      description: message,
    });
  },
  // Alternativa usando Sonner para compatibilidade
  custom: (title: string, description: string) => {
    sonnerToast(title, {
      description,
    });
  },
};
