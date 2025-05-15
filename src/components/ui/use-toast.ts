
// Re-export from hooks/use-toast.tsx - Fix circular imports
import { useToast } from "@/hooks/use-toast";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/hooks/use-toast";

export { useToast, toast, Toaster };
