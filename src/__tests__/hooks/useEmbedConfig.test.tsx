
import { renderHook, act } from '@testing-library/react-hooks';
import { useEmbedConfig } from '@/hooks/siteSettings/useEmbedConfig';
import { fetchEmbedConfig, saveEmbedConfig } from '@/utils/supabaseClient';

jest.mock('@/utils/supabaseClient', () => ({
  fetchEmbedConfig: jest.fn(),
  saveEmbedConfig: jest.fn()
}));

describe('useEmbedConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('deve inicializar com os valores padrão corretos', () => {
    const { result } = renderHook(() => useEmbedConfig());
    
    expect(result.current.embedCode).toBe('');
    expect(result.current.embedPosition).toBe('right');
    expect(result.current.embedActive).toBe(false);
  });

  it('deve carregar configuração de embed corretamente', async () => {
    const mockEmbedConfig = {
      code: '<script>console.log("Embed")</script>',
      position: 'left' as const,
      isActive: true
    };
    
    (fetchEmbedConfig as jest.Mock).mockResolvedValue(mockEmbedConfig);
    
    const { result, waitForNextUpdate } = renderHook(() => useEmbedConfig());
    
    // Chamar o método loadEmbedConfig
    act(() => {
      result.current.loadEmbedConfig();
    });
    
    await waitForNextUpdate();
    
    expect(fetchEmbedConfig).toHaveBeenCalled();
    expect(result.current.embedCode).toBe(mockEmbedConfig.code);
    expect(result.current.embedPosition).toBe(mockEmbedConfig.position);
    expect(result.current.embedActive).toBe(mockEmbedConfig.isActive);
  });

  it('deve salvar configuração de embed corretamente', async () => {
    const { result } = renderHook(() => useEmbedConfig());
    
    (saveEmbedConfig as jest.Mock).mockResolvedValue(true);
    
    // Configurar o estado inicial
    act(() => {
      result.current.setEmbedCode('<script>console.log("Embed")</script>');
      result.current.setEmbedPosition('left');
      result.current.setEmbedActive(true);
    });
    
    // Salvar a configuração de embed
    let saveResult;
    act(() => {
      saveResult = result.current.saveEmbedConfiguration();
    });
    
    expect(saveEmbedConfig).toHaveBeenCalledWith({
      code: '<script>console.log("Embed")</script>',
      position: 'left',
      isActive: true
    });
    
    expect(await saveResult).toBe(true);
  });

  it('deve atualizar os valores do estado corretamente', () => {
    const { result } = renderHook(() => useEmbedConfig());
    
    // Testar setters
    act(() => {
      result.current.setEmbedCode('<script>console.log("Embed")</script>');
    });
    expect(result.current.embedCode).toBe('<script>console.log("Embed")</script>');
    
    act(() => {
      result.current.setEmbedPosition('left');
    });
    expect(result.current.embedPosition).toBe('left');
    
    act(() => {
      result.current.setEmbedActive(true);
    });
    expect(result.current.embedActive).toBe(true);
  });
});
