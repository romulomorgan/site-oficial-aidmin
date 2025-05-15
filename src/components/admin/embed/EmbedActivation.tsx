
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from "@/components/ui/label";

interface EmbedActivationProps {
  embedActive: boolean;
  setEmbedActive: (active: boolean) => void;
}

export const EmbedActivation: React.FC<EmbedActivationProps> = ({
  embedActive,
  setEmbedActive
}) => {
  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="embedActive" className="text-sm font-medium">
        Ativar Embed
      </Label>
      <Switch
        id="embedActive"
        checked={embedActive}
        onCheckedChange={setEmbedActive}
      />
    </div>
  );
};
