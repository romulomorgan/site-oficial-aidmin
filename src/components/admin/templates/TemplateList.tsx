
import React from 'react';
import { ColorTemplate } from '@/utils/supabase/types';
import { TemplateCard } from './TemplateCard';
import { CreateTemplateCard } from './CreateTemplateCard';

interface TemplateListProps {
  templates: ColorTemplate[];
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  onEditTemplate: (template: ColorTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
  onOpenCreateDialog: () => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  selectedTemplate,
  onSelectTemplate,
  onEditTemplate,
  onDeleteTemplate,
  onOpenCreateDialog
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {templates.map(template => (
        <TemplateCard 
          key={template.id}
          template={template}
          isSelected={selectedTemplate === template.id}
          onSelect={onSelectTemplate}
          onEdit={onEditTemplate}
          onDelete={onDeleteTemplate}
        />
      ))}
      
      <CreateTemplateCard onClick={onOpenCreateDialog} />
    </div>
  );
};
