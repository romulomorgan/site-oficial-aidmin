
import { useState, useEffect } from 'react';
import { HomeSectionsState, SectionData } from './types';
import { defaultSections } from './defaults';

// Este é o hook atualizado que retorna o tipo correto
export const useHomeSectionsData = () => {
  const [sections, setSections] = useState<HomeSectionsState>(defaultSections);
  const [isLoading, setIsLoading] = useState(true);
  
  // Função para carregar dados
  const loadData = async () => {
    setIsLoading(true);
    // Aqui estaria a lógica para carregar as seções do banco de dados
    // Por enquanto, apenas simulamos um carregamento
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  // Carrega dados na montagem inicial
  useEffect(() => {
    loadData();
  }, []);
  
  return {
    sections,
    setSections,
    isLoading,
    loadData
  };
};

// Re-export from this module
export * from './defaults';
