import { useState } from 'react';
import { SectionData } from './types';

export const useHomeSectionsHandlers = (sections: SectionData[], setSections: React.Dispatch<React.SetStateAction<SectionData[]>>) => {
  // Implementar handlers específicos aqui
  
  const updateSection = (id: string, data: Partial<SectionData>) => {
    setSections(prev => 
      prev.map(section => 
        section.id === id ? { ...section, ...data } : section
      )
    );
  };
  
  return {
    updateSection
  };
};
