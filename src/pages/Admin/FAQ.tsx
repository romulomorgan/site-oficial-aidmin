
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';
import { Trash, Edit } from 'lucide-react';
import { fetchFAQs, addFAQ, deleteFAQ, updateFAQ, FAQItem } from '@/utils/supabaseClient';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';

export default function FAQ() {
  const [faqItems, setFAQItems] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newFAQ, setNewFAQ] = useState<Omit<FAQItem, 'id'>>({
    question: '',
    answer: '',
    active: true
  });
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Carregar FAQs do Supabase
    const loadFAQs = async () => {
      try {
        const data = await fetchFAQs();
        setFAQItems(data);
      } catch (error) {
        console.error('Erro ao carregar FAQs:', error);
        toast.error('Erro ao carregar perguntas frequentes');
      } finally {
        setIsInitialLoading(false);
      }
    };
    
    loadFAQs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFAQ(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFAQ = async () => {
    if (!newFAQ.question || !newFAQ.answer) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (editingId) {
        // Atualizar FAQ existente
        const success = await updateFAQ(editingId, newFAQ);
        
        if (success) {
          toast.success('Pergunta atualizada com sucesso!');
          setEditingId(null);
          
          // Recarregar FAQs para mostrar a alteração
          const updatedFAQs = await fetchFAQs();
          setFAQItems(updatedFAQs);
        } else {
          toast.error('Erro ao atualizar pergunta');
        }
      } else {
        // Adicionar nova FAQ ao Supabase
        const success = await addFAQ(newFAQ);
        
        if (success) {
          toast.success('Pergunta adicionada com sucesso!');
          
          // Recarregar FAQs para mostrar a nova FAQ
          const updatedFAQs = await fetchFAQs();
          setFAQItems(updatedFAQs);
        } else {
          toast.error('Erro ao adicionar pergunta');
        }
      }
      
      // Resetar formulário
      setNewFAQ({
        question: '',
        answer: '',
        active: true
      });
    } catch (error) {
      console.error('Erro ao salvar FAQ:', error);
      toast.error('Ocorreu um erro ao salvar a pergunta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditFAQ = (faq: FAQItem) => {
    setNewFAQ({
      question: faq.question,
      answer: faq.answer,
      active: faq.active
    });
    setEditingId(faq.id);
  };

  const handleCancelEdit = () => {
    setNewFAQ({
      question: '',
      answer: '',
      active: true
    });
    setEditingId(null);
  };

  const handleDeleteFAQ = async (id: string) => {
    try {
      const success = await deleteFAQ(id);
      
      if (success) {
        // Atualizar estado local
        setFAQItems(prev => prev.filter(item => item.id !== id));
        
        // Se estiver editando este item, cancele a edição
        if (editingId === id) {
          handleCancelEdit();
        }
        
        toast.success('Pergunta removida com sucesso!');
      } else {
        toast.error('Erro ao remover pergunta');
      }
    } catch (error) {
      console.error('Erro ao excluir FAQ:', error);
      toast.error('Ocorreu um erro ao excluir a pergunta');
    }
  };

  if (isInitialLoading) {
    return <div className="p-6 animate-fade-in">Carregando perguntas frequentes...</div>;
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Gerenciar Perguntas Frequentes</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6 hover-shadow">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          {editingId ? 'Editar Pergunta' : 'Adicionar Nova Pergunta'}
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pergunta *
          </label>
          <input
            type="text"
            name="question"
            value={newFAQ.question}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resposta *
          </label>
          <textarea
            name="answer"
            value={newFAQ.answer}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="flex justify-end gap-2">
          {editingId && (
            <CustomButton 
              onClick={handleCancelEdit}
              variant="secondary"
              className="bg-gray-200 text-gray-700 hover:bg-gray-300"
              type="button"
            >
              Cancelar
            </CustomButton>
          )}
          <CustomButton 
            onClick={handleAddFAQ}
            variant="primary"
            disabled={isLoading}
            type="button"
          >
            {isLoading 
              ? 'Salvando...' 
              : editingId 
                ? 'Salvar Alterações' 
                : 'Adicionar Pergunta'
            }
          </CustomButton>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Perguntas Existentes</h2>
        
        {faqItems.length === 0 ? (
          <p className="text-gray-500">Nenhuma pergunta encontrada.</p>
        ) : (
          <div className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 transition-all hover:shadow-md">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{item.question}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditFAQ(item)}
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      aria-label="Editar pergunta"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <ConfirmDialog
                      title="Excluir Pergunta"
                      description="Tem certeza que deseja excluir esta pergunta? Esta ação não pode ser desfeita."
                      onConfirm={() => handleDeleteFAQ(item.id)}
                      confirmText="Excluir"
                    >
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Excluir pergunta"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </ConfirmDialog>
                  </div>
                </div>
                <p className="text-gray-700">{item.answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
