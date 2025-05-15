
import { renderHook, act } from '@testing-library/react-hooks';
import { toast } from 'sonner';
import { useSiteTexts } from '@/hooks/siteSettings/useSiteTexts';
import { fetchSiteTexts, updateSiteText } from '@/utils/supabaseClient';

// Mock das dependências externas
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock('@/utils/supabaseClient', () => ({
  fetchSiteTexts: jest.fn(),
  updateSiteText: jest.fn()
}));

describe('useSiteTexts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve inicializar com os valores padrão corretos', () => {
    const { result } = renderHook(() => useSiteTexts());
    
    expect(result.current.faviconUrl).toBe('');
    expect(result.current.webhookUrl).toBe('');
    expect(result.current.siteTitle).toBe('');
    expect(result.current.copyrightText).toBe('');
  });

  it('deve carregar textos do site corretamente', async () => {
    const mockSiteTexts = {
      faviconUrl: 'https://example.com/favicon.ico',
      webhookUrl: 'https://example.com/webhook',
      siteTitle: 'Título do Site',
      copyrightText: '© 2023 Empresa',
      robotImage: 'https://example.com/robot.png',
      contactImage: 'https://example.com/contact.png',
      embedButtonColor: '#FF0000',
      embedButtonIcon: 'chat'
    };
    
    (fetchSiteTexts as jest.Mock).mockResolvedValue(mockSiteTexts);
    
    const { result, waitForNextUpdate } = renderHook(() => useSiteTexts());
    
    // Chamar o método loadSiteTexts
    act(() => {
      result.current.loadSiteTexts();
    });
    
    await waitForNextUpdate();
    
    expect(fetchSiteTexts).toHaveBeenCalled();
    expect(result.current.faviconUrl).toBe(mockSiteTexts.faviconUrl);
    expect(result.current.webhookUrl).toBe(mockSiteTexts.webhookUrl);
    expect(result.current.siteTitle).toBe(mockSiteTexts.siteTitle);
    expect(result.current.copyrightText).toBe(mockSiteTexts.copyrightText);
  });

  it('deve salvar textos do site corretamente', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useSiteTexts());
    
    (updateSiteText as jest.Mock).mockResolvedValue(true);
    
    // Configurar o estado inicial
    act(() => {
      result.current.setFaviconUrl('https://example.com/favicon.ico');
      result.current.setWebhookUrl('https://example.com/webhook');
      result.current.setSiteTitle('Título do Site');
      result.current.setCopyrightText('© 2023 Empresa');
    });
    
    // Salvar os textos do site
    let saveResult;
    act(() => {
      saveResult = result.current.saveSiteTexts();
    });
    
    await waitForNextUpdate();
    
    expect(updateSiteText).toHaveBeenCalledWith('faviconUrl', 'https://example.com/favicon.ico');
    expect(updateSiteText).toHaveBeenCalledWith('webhookUrl', 'https://example.com/webhook');
    expect(updateSiteText).toHaveBeenCalledWith('siteTitle', 'Título do Site');
    expect(updateSiteText).toHaveBeenCalledWith('copyrightText', '© 2023 Empresa');
    
    expect(await saveResult).toBe(true);
  });

  it('deve atualizar os valores do estado corretamente', () => {
    const { result } = renderHook(() => useSiteTexts());
    
    // Testar setters
    act(() => {
      result.current.setFaviconUrl('https://example.com/favicon.ico');
    });
    expect(result.current.faviconUrl).toBe('https://example.com/favicon.ico');
    
    act(() => {
      result.current.setWebhookUrl('https://example.com/webhook');
    });
    expect(result.current.webhookUrl).toBe('https://example.com/webhook');
    
    act(() => {
      result.current.setSiteTitle('Título do Site');
    });
    expect(result.current.siteTitle).toBe('Título do Site');
    
    act(() => {
      result.current.setCopyrightText('© 2023 Empresa');
    });
    expect(result.current.copyrightText).toBe('© 2023 Empresa');
    
    act(() => {
      result.current.setRobotImage('https://example.com/robot.png');
    });
    expect(result.current.robotImage).toBe('https://example.com/robot.png');
    
    act(() => {
      result.current.setContactImage('https://example.com/contact.png');
    });
    expect(result.current.contactImage).toBe('https://example.com/contact.png');
  });

  it('deve lidar com erros ao carregar textos do site', async () => {
    const mockError = new Error('Erro ao carregar textos');
    (fetchSiteTexts as jest.Mock).mockRejectedValue(mockError);
    
    const { result, waitForNextUpdate } = renderHook(() => useSiteTexts());
    
    // Chamar o método loadSiteTexts
    act(() => {
      result.current.loadSiteTexts();
    });
    
    await waitForNextUpdate();
    
    // Verificar que o toast de erro foi chamado
    expect(toast.error).toHaveBeenCalledWith('Erro ao carregar textos do site');
  });
});
