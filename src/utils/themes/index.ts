
import { ThemeTemplate } from './types';

// Exportação dos tipos
export * from './types';

// Exportação para compatibilidade com código existente
export const defaultTemplates: ThemeTemplate[] = [];
export const allTemplates: ThemeTemplate[] = [];

// Obs: Os templates agora são carregados diretamente do banco de dados
// através da função fetchColorTemplates em utils/supabase/templates
