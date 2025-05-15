import { useState, useEffect } from 'react';
import { SectionData } from './types';
import { defaultSections } from './defaults';

export const useHomeSectionsData = () => {
  const [sections, setSections] = useState<SectionData[]>(defaultSections);
  
  // Aqui estaria a lógica para carregar e gerenciar seções
  
  return {
    sections,
    setSections
  };
};

// Re-export from this module
export * from './defaults';
