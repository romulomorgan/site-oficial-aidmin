
import { useEffect } from 'react';
import { useTemplateState } from './templateState';
import { useTemplateActions } from './templateActions';
import { UseTemplatesReturn } from './types';

export function useTemplates(): UseTemplatesReturn {
  const state = useTemplateState();
  const actions = useTemplateActions(state);
  
  useEffect(() => {
    // Carregar templates quando o componente for montado
    actions.loadTemplates();
  }, []);
  
  useEffect(() => {
    // Aplicar o template selecionado quando os templates forem carregados
    if (state.templates.length > 0 && state.selectedTemplate) {
      actions.applySelectedTemplate();
    }
  }, [state.templates, state.selectedTemplate]);
  
  // Combinar state e actions em um único objeto de retorno
  return {
    ...state,
    ...actions
  };
}

// Reexportar os tipos para uso externo
export * from './types';
