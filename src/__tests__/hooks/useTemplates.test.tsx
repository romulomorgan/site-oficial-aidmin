
import { renderHook, act } from '@testing-library/react-hooks';
import { toast } from 'sonner';
import { useTemplates } from '@/hooks/siteSettings/templates';
import { fetchColorTemplates, saveColorTemplate, deleteColorTemplate } from '@/utils/supabaseClient';
import * as templateUtils from '@/hooks/siteSettings/templates/templateUtils';

// Mock das dependências externas
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}));

jest.mock('@/utils/supabaseClient', () => ({
  saveColorTemplate: jest.fn(),
  fetchColorTemplates: jest.fn(),
  deleteColorTemplate: jest.fn()
}));

describe('useTemplates', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Limpar localStorage antes de cada teste
    localStorage.clear();
  });

  it('deve inicializar com os valores padrão corretos', () => {
    const { result } = renderHook(() => useTemplates());
    
    expect(result.current.templates).toEqual([]);
    expect(result.current.selectedTemplate).toBe('default');
    expect(result.current.openTemplateDialog).toBe(false);
    expect(result.current.customTemplate).toMatchObject({
      id: 'custom',
      name: 'Personalizado'
    });
    expect(result.current.editingTemplate).toBeNull();
  });

  it('deve carregar templates corretamente', async () => {
    const mockTemplates = [
      { 
        id: 'template1', 
        name: 'Template 1',
        primaryColor: '#FF0000',
        secondaryColor: '#00FF00',
        accentColor: '#0000FF',
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      }
    ];
    
    (fetchColorTemplates as jest.Mock).mockResolvedValue(mockTemplates);
    
    const { result, waitForNextUpdate } = renderHook(() => useTemplates());
    
    // Chamar o método loadTemplates
    act(() => {
      result.current.loadTemplates();
    });
    
    await waitForNextUpdate();
    
    expect(fetchColorTemplates).toHaveBeenCalled();
    expect(result.current.templates).toEqual(mockTemplates);
  });

  it('deve selecionar um template corretamente', () => {
    const { result } = renderHook(() => useTemplates());
    
    act(() => {
      result.current.handleSelectTemplate('template1');
    });
    
    expect(result.current.selectedTemplate).toBe('template1');
  });

  it('deve adicionar um template corretamente', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTemplates());
    
    (saveColorTemplate as jest.Mock).mockResolvedValue(true);
    (fetchColorTemplates as jest.Mock).mockResolvedValue([{
      id: 'new-template',
      name: 'Novo Template',
      primaryColor: '#FF0000',
      secondaryColor: '#00FF00',
      accentColor: '#0000FF',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      buttonTextColor: '#FFFFFF',
      menuTextColor: '#FFFFFF'
    }]);
    
    // Definir customTemplate para teste
    act(() => {
      result.current.setCustomTemplate({
        id: 'custom',
        name: 'Novo Template',
        primaryColor: '#FF0000',
        secondaryColor: '#00FF00',
        accentColor: '#0000FF',
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
        buttonTextColor: '#FFFFFF',
        menuTextColor: '#FFFFFF'
      });
    });
    
    // Adicionar o template
    act(() => {
      result.current.handleAddTemplate();
    });
    
    await waitForNextUpdate();
    
    expect(saveColorTemplate).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith('Template de cores criado com sucesso!');
  });

  it('deve atualizar um template corretamente', async () => {
    const mockTemplate = { 
      id: 'template1', 
      name: 'Template 1',
      primaryColor: '#FF0000',
      secondaryColor: '#00FF00',
      accentColor: '#0000FF',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      buttonTextColor: '#FFFFFF',
      menuTextColor: '#FFFFFF'
    };
    
    const { result, waitForNextUpdate } = renderHook(() => useTemplates());
    
    (saveColorTemplate as jest.Mock).mockResolvedValue(true);
    
    // Configurar o estado inicial
    act(() => {
      result.current.setTemplates([mockTemplate]);
      result.current.setEditingTemplate(mockTemplate);
    });
    
    // Espiar o método applyTemplate
    const applyTemplateSpy = jest.spyOn(templateUtils, 'applyTemplate');
    
    // Atualizar o template
    act(() => {
      result.current.handleUpdateTemplate();
    });
    
    await waitForNextUpdate();
    
    expect(saveColorTemplate).toHaveBeenCalledWith(mockTemplate);
    expect(result.current.editingTemplate).toBeNull();
    expect(toast.success).toHaveBeenCalledWith('Template atualizado com sucesso!');
  });

  it('não deve permitir excluir o template padrão', () => {
    const { result } = renderHook(() => useTemplates());
    
    act(() => {
      result.current.handleDeleteTemplate('default');
    });
    
    expect(toast.error).toHaveBeenCalledWith('Modelos padrão não podem ser excluídos.');
    expect(deleteColorTemplate).not.toHaveBeenCalled();
  });

  it('deve aplicar o template selecionado ao DOM', () => {
    const mockTemplate = { 
      id: 'template1', 
      name: 'Template 1',
      primaryColor: '#FF0000',
      secondaryColor: '#00FF00',
      accentColor: '#0000FF',
      backgroundColor: '#FFFFFF',
      textColor: '#000000',
      buttonTextColor: '#FFFFFF',
      menuTextColor: '#FFFFFF'
    };
    
    const { result } = renderHook(() => useTemplates());
    
    // Configurar o estado inicial
    act(() => {
      result.current.setTemplates([mockTemplate]);
      result.current.setSelectedTemplate('template1');
    });
    
    // Espiar document.documentElement.style.setProperty
    const setPropertySpy = jest.spyOn(document.documentElement.style, 'setProperty');
    
    // Aplicar o template
    act(() => {
      result.current.applySelectedTemplate();
    });
    
    expect(setPropertySpy).toHaveBeenCalledWith('--primary-color', '#FF0000');
    expect(setPropertySpy).toHaveBeenCalledWith('--secondary-color', '#00FF00');
    expect(setPropertySpy).toHaveBeenCalledWith('--accent-color', '#0000FF');
    expect(setPropertySpy).toHaveBeenCalledWith('--background-color', '#FFFFFF');
    expect(setPropertySpy).toHaveBeenCalledWith('--text-color', '#000000');
    expect(setPropertySpy).toHaveBeenCalledWith('--button-text-color', '#FFFFFF');
    expect(setPropertySpy).toHaveBeenCalledWith('--menu-text-color', '#FFFFFF');
  });
});
