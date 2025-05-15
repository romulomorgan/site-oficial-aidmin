
import { renderHook, act } from '@testing-library/react-hooks';
import { toast } from 'sonner';
import { useSiteSettingsState } from '@/hooks/siteSettings';
import * as useTemplatesModule from '@/hooks/siteSettings/useTemplates';
import * as useSiteTextsModule from '@/hooks/siteSettings/useSiteTexts';
import * as useEmbedConfigModule from '@/hooks/siteSettings/useEmbedConfig';
import * as useWebhookLogsModule from '@/hooks/siteSettings/useWebhookLogs';

// Mock das dependências externas
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn()
  }
}));

describe('useSiteSettingsState', () => {
  // Mocks para os hooks individuais
  const mockLoadTemplates = jest.fn();
  const mockLoadSiteTexts = jest.fn();
  const mockLoadEmbedConfig = jest.fn();
  const mockLoadWebhookLogs = jest.fn();
  const mockApplySelectedTemplate = jest.fn();
  const mockSaveSiteTexts = jest.fn();
  const mockSaveEmbedConfiguration = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configurar mocks para os hooks individuais
    jest.spyOn(useTemplatesModule, 'useTemplates').mockImplementation(() => ({
      templates: [],
      selectedTemplate: 'default',
      customTemplate: { id: 'custom', name: 'Personalizado', primaryColor: '', secondaryColor: '', accentColor: '', backgroundColor: '', textColor: '', buttonTextColor: '', menuTextColor: '' },
      editingTemplate: null,
      openTemplateDialog: false,
      isLoading: false, // Adicionado a propriedade isLoading que estava faltando
      setTemplates: jest.fn(),
      setSelectedTemplate: jest.fn(),
      setCustomTemplate: jest.fn(),
      setEditingTemplate: jest.fn(),
      setOpenTemplateDialog: jest.fn(),
      loadTemplates: mockLoadTemplates,
      handleAddTemplate: jest.fn(),
      handleUpdateTemplate: jest.fn(),
      handleDeleteTemplate: jest.fn(),
      handleSelectTemplate: jest.fn(),
      handleEditTemplate: jest.fn(),
      applySelectedTemplate: mockApplySelectedTemplate
    }));
    
    jest.spyOn(useSiteTextsModule, 'useSiteTexts').mockImplementation(() => ({
      faviconUrl: '',
      webhookUrl: '',
      robotImage: '',
      contactImage: '',
      siteTitle: '',
      copyrightText: '',
      embedButtonColor: '',
      embedButtonIcon: '',
      setFaviconUrl: jest.fn(),
      setWebhookUrl: jest.fn(),
      setRobotImage: jest.fn(),
      setContactImage: jest.fn(),
      setSiteTitle: jest.fn(),
      setCopyrightText: jest.fn(),
      setEmbedButtonColor: jest.fn(),
      setEmbedButtonIcon: jest.fn(),
      loadSiteTexts: mockLoadSiteTexts,
      saveSiteTexts: mockSaveSiteTexts
    }));
    
    jest.spyOn(useEmbedConfigModule, 'useEmbedConfig').mockImplementation(() => ({
      embedCode: '',
      embedPosition: 'right',
      embedActive: false,
      setEmbedCode: jest.fn(),
      setEmbedPosition: jest.fn(),
      setEmbedActive: jest.fn(),
      loadEmbedConfig: mockLoadEmbedConfig,
      saveEmbedConfiguration: mockSaveEmbedConfiguration
    }));
    
    jest.spyOn(useWebhookLogsModule, 'useWebhookLogs').mockImplementation(() => ({
      webhookLogs: [],
      setWebhookLogs: jest.fn(),
      loadWebhookLogs: mockLoadWebhookLogs
    }));
    
    // Limpar localStorage antes de cada teste
    localStorage.clear();
    
    // Espiar o setTimeout
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('deve carregar dados do site corretamente ao inicializar', () => {
    renderHook(() => useSiteSettingsState());
    
    expect(mockLoadTemplates).toHaveBeenCalled();
    expect(mockLoadSiteTexts).toHaveBeenCalled();
    expect(mockLoadEmbedConfig).toHaveBeenCalled();
    expect(mockLoadWebhookLogs).toHaveBeenCalled();
  });

  it('deve salvar configurações corretamente', async () => {
    mockSaveSiteTexts.mockResolvedValue(true);
    mockSaveEmbedConfiguration.mockResolvedValue(true);
    
    const { result, waitForNextUpdate } = renderHook(() => useSiteSettingsState());
    
    // Chamar o método saveSettings
    act(() => {
      result.current.saveSettings();
    });
    
    await waitForNextUpdate();
    
    expect(localStorage.getItem('selectedTemplate')).toBe('default');
    expect(mockApplySelectedTemplate).toHaveBeenCalled();
    expect(mockSaveSiteTexts).toHaveBeenCalled();
    expect(mockSaveEmbedConfiguration).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Configurações salvas com sucesso!');
    
    // Verificar que um evento personalizado foi disparado
    const dispatchEventSpy = jest.spyOn(window, 'dispatchEvent');
    expect(dispatchEventSpy).toHaveBeenCalled();
    
    // Avançar o temporizador para verificar o toast.info
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    expect(toast.info).toHaveBeenCalledWith('Tema aplicado com sucesso! Navegue para outras páginas para ver as mudanças.');
  });

  it('deve lidar com erros ao salvar configurações', async () => {
    mockSaveSiteTexts.mockResolvedValue(false);
    mockSaveEmbedConfiguration.mockResolvedValue(false);
    
    const { result, waitForNextUpdate } = renderHook(() => useSiteSettingsState());
    
    // Chamar o método saveSettings
    act(() => {
      result.current.saveSettings();
    });
    
    await waitForNextUpdate();
    
    expect(toast.error).toHaveBeenCalledWith('Ocorreu um erro ao salvar algumas configurações');
  });
});
