
import { ThemeTemplate } from './types';
import { basicTemplates } from './basicTemplates';
import { modernTemplates } from './modernTemplates';
import { gradientTemplates } from './gradientTemplates';
import { specialTemplates } from './specialTemplates';

// Exportação dos tipos
export * from './types';

// Combinação de todos os templates disponíveis
export const allTemplates: ThemeTemplate[] = [
  ...basicTemplates,
  ...modernTemplates,
  ...gradientTemplates,
  ...specialTemplates
];

// Exportação para compatibilidade com código existente
export const defaultTemplates = allTemplates;
