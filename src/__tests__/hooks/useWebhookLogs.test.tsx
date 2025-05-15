
import { renderHook, act } from '@testing-library/react-hooks';
import { useWebhookLogs } from '@/hooks/siteSettings/useWebhookLogs';
import { getWebhookLogs } from '@/utils/supabaseClient';

jest.mock('@/utils/supabaseClient', () => ({
  getWebhookLogs: jest.fn()
}));

describe('useWebhookLogs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com array vazio', () => {
    const { result } = renderHook(() => useWebhookLogs());
    
    expect(result.current.webhookLogs).toEqual([]);
  });

  it('deve carregar logs de webhook corretamente', async () => {
    const mockLogs = [
      { id: '1', webhook_url: 'https://example.com/webhook', payload: {}, created_at: '2023-01-01T00:00:00Z' },
      { id: '2', webhook_url: 'https://example.com/webhook', payload: {}, created_at: '2023-01-02T00:00:00Z' }
    ];
    
    (getWebhookLogs as jest.Mock).mockResolvedValue(mockLogs);
    
    const { result, waitForNextUpdate } = renderHook(() => useWebhookLogs());
    
    // Chamar o método loadWebhookLogs
    act(() => {
      result.current.loadWebhookLogs();
    });
    
    await waitForNextUpdate();
    
    expect(getWebhookLogs).toHaveBeenCalled();
    expect(result.current.webhookLogs).toEqual(mockLogs);
  });

  it('deve definir array vazio em caso de erro', async () => {
    const mockError = new Error('Erro ao carregar logs');
    (getWebhookLogs as jest.Mock).mockRejectedValue(mockError);
    
    const { result, waitForNextUpdate } = renderHook(() => useWebhookLogs());
    
    // Chamar o método loadWebhookLogs
    act(() => {
      result.current.loadWebhookLogs();
    });
    
    await waitForNextUpdate();
    
    expect(result.current.webhookLogs).toEqual([]);
  });

  it('deve atualizar o estado de logs corretamente', () => {
    const { result } = renderHook(() => useWebhookLogs());
    
    const newLogs = [
      { id: '1', webhook_url: 'https://example.com/webhook', payload: {}, created_at: '2023-01-01T00:00:00Z' }
    ];
    
    act(() => {
      result.current.setWebhookLogs(newLogs);
    });
    
    expect(result.current.webhookLogs).toEqual(newLogs);
  });
});
