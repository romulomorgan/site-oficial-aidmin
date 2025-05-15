
// Re-export from hooks/use-toast.tsx - Fix circular imports
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import { Toaster } from "@/hooks/use-toast";

export { useToast, toast, Toaster };
