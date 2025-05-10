
import React from 'react';
import { X, Trash } from 'lucide-react';
import { CustomButton } from '@/components/ui/CustomButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface ConfirmDeleteDialogProps {
  id: string | number | null;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  id,
  title,
  onConfirm,
  onCancel
}) => {
  if (id === null) return null;
  
  return (
    <Dialog open={id !== null} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p>{title}</p>
          <p className="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
        </div>
        
        <DialogFooter>
          <CustomButton 
            type="button" 
            variant="secondary" 
            onClick={onCancel}
          >
            <X className="mr-1 h-4 w-4" /> Cancelar
          </CustomButton>
          <CustomButton 
            type="button" 
            variant="destructive"
            onClick={onConfirm}
          >
            <Trash className="mr-1 h-4 w-4" /> Excluir
          </CustomButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteDialog;
