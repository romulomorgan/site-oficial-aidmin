
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';
import { Trash } from 'lucide-react';
import { fetchFAQs, addFAQ, deleteFAQ, FAQItem } from '@/utils/supabaseClient';

export default function FAQ() {
  const [faqItems, setFAQItems] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newFAQ, setNewFAQ] = useState<Omit<FAQItem, 'id'>>({
    question: '',
    answer: ''
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
      // Adicionar ao Supabase
      const success = await addFAQ(newFAQ);
      
      if (success) {
        // Recarregar FAQs
        const updatedFAQs = await fetchFAQs();
        setFAQItems(updatedFAQs);
        
        // Resetar formulário
        setNewFAQ({
          question: '',
          answer: ''
        });
        
        toast.success('Pergunta adicionada com sucesso!');
      } else {
        toast.error('Erro ao adicionar pergunta');
      }
    } catch (error) {
      console.error('Erro ao adicionar FAQ:', error);
      toast.error('Ocorreu um erro ao adicionar a pergunta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    try {
      const success = await deleteFAQ(id);
      
      if (success) {
        // Atualizar estado local
        setFAQItems(prev => prev.filter(item => item.id !== id));
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
    return <div className="p-6">Carregando perguntas frequentes...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Gerenciar Perguntas Frequentes</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Adicionar Nova Pergunta</h2>
        
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
        
        <div className="flex justify-end">
          <CustomButton 
            onClick={handleAddFAQ}
            variant="primary"
            disabled={isLoading}
            type="button"
          >
            {isLoading ? 'Adicionando...' : 'Adicionar Pergunta'}
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
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <h3 className="font-medium">{item.question}</h3>
                  <button
                    onClick={() => handleDeleteFAQ(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Excluir pergunta"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
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
