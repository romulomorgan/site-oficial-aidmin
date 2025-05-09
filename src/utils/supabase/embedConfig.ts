
import { supabase } from "@/integrations/supabase/client";
import { EmbedConfig } from "./types";

// Função para obter configuração de embed
export async function fetchEmbedConfig(): Promise<EmbedConfig> {
  try {
    const { data, error } = await supabase
      .from('site_embed_config')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (error) {
      console.error('Erro ao carregar configuração de embed:', error);
      return { code: '', position: 'right', isActive: false };
    }
    
    if (!data) {
      return { code: '', position: 'right', isActive: false };
    }
    
    return {
      code: data.code,
      position: data.position as 'left' | 'right',
      isActive: data.is_active
    };
  } catch (error) {
    console.error('Erro ao buscar configuração de embed:', error);
    return { code: '', position: 'right', isActive: false };
  }
}

// Função para salvar configuração de embed
export async function saveEmbedConfig(config: EmbedConfig): Promise<boolean> {
  try {
    // Verificar se já existe uma configuração
    const { data, error: selectError } = await supabase
      .from('site_embed_config')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (selectError) throw selectError;
    
    if (data) {
      // Atualizar configuração existente
      const { error } = await supabase
        .from('site_embed_config')
        .update({
          code: config.code,
          position: config.position,
          is_active: config.isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', data.id);
      
      if (error) throw error;
    } else {
      // Inserir nova configuração
      const { error } = await supabase
        .from('site_embed_config')
        .insert([{
          code: config.code,
          position: config.position,
          is_active: config.isActive,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }]);
      
      if (error) throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar configuração de embed:', error);
    return false;
  }
}
