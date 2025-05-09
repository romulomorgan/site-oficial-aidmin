
import React, { useState } from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { Button } from '@/components/ui/button';
import { SectionProps } from '@/utils/supabase/types';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Testimonial } from '@/utils/supabase/types';

const TestimonialsSection: React.FC<Omit<SectionProps, 'handleSwitchChange'>> = ({ 
  sections, 
  handleInputChange, 
  isLoading, 
  handleSaveSection 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "Depoimentos"</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            name="testimonialsTitle"
            value={sections.testimonialsTitle as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="flex justify-end">
          <CustomButton 
            onClick={() => handleSaveSection('testimonials')}
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
