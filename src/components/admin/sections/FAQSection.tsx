import React, { useState, useEffect } from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { fetchFAQs, addFAQ, updateFAQ, deleteFAQ } from '@/utils/supabaseClient';
import { PlusCircle, Edit, Trash, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { FAQItem, SectionProps } from '@/utils/supabase/types';

interface FAQSectionProps {
  sections: Record<string, string | boolean>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isLoading: boolean;
  handleSaveSection: (section: string) => void;
}

const FAQSection: React.FC<SectionProps> = ({ 
  sections, 
  handleInputChange, 
  isLoading, 
  handleSaveSection 
}) => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loadingFaqs, setLoadingFaqs] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [newFaq, setNewFaq] = useState<{question: string, answer: string}>({
    question: '',
    answer: ''
  });
  const [showNewForm, setShowNewForm] = useState(false);
  
  useEffect(() => {
    loadFAQs();
  }, []);
  
  const loadFAQs = async () => {
    setLoadingFaqs(true);
    try {
      const data = await fetchFAQs();
      setFaqs(data);
    } catch (error) {
      console.error("Erro ao carregar FAQs:", error);
      toast.error("Erro ao carregar perguntas frequentes");
    } finally {
      setLoadingFaqs(false);
    }
  };
  
  const handleNewFaqChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFaq(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEditFaqChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingFaq(prev => ({
      ...prev!,
      [name]: value
    }));
  };
  
  const handleAddFaq = async () => {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      toast.error("Pergunta e resposta são obrigatórias");
      return;
    }
    
    try {
      await addFAQ({
        question: newFaq.question,
        answer: newFaq.answer,
        order: faqs.length + 1,
        active: true
      });
      
      setNewFaq({ question: '', answer: '' });
      setShowNewForm(false);
      toast.success("FAQ adicionada com sucesso");
      await loadFAQs();
    } catch (error) {
      console.error("Erro ao adicionar FAQ:", error);
      toast.error("Erro ao adicionar nova pergunta");
    }
  };
  
  const handleUpdateFaq = async () => {
    if (!editingFaq || !editingFaq.question.trim() || !editingFaq.answer.trim()) {
      toast.error("Pergunta e resposta são obrigatórias");
      return;
    }
    
    try {
      await updateFAQ(editingFaq.id, {
        question: editingFaq.question,
        answer: editingFaq.answer,
        order: editingFaq.order
      });
      
      setEditingFaq(null);
      toast.success("FAQ atualizada com sucesso");
      await loadFAQs();
    } catch (error) {
      console.error("Erro ao atualizar FAQ:", error);
      toast.error("Erro ao atualizar pergunta");
    }
  };
  
  const handleDeleteFaq = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja excluir esta pergunta?")) {
      return;
    }
    
    try {
      await deleteFAQ(id);
      toast.success("FAQ excluída com sucesso");
      await loadFAQs();
    } catch (error) {
      console.error("Erro ao excluir FAQ:", error);
      toast.error("Erro ao excluir pergunta");
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-800">Seção "FAQ"</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            name="faqTitle"
            value={sections.faqTitle as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="flex justify-between items-center mt-6 mb-2">
          <h3 className="text-md font-medium text-gray-700">Perguntas Frequentes</h3>
          <CustomButton 
            variant="secondary" 
            onClick={() => setShowNewForm(!showNewForm)}
            className="flex items-center"
          >
            <PlusCircle size={16} className="mr-1" />
            {showNewForm ? "Cancelar" : "Adicionar Pergunta"}
          </CustomButton>
        </div>
        
        {showNewForm && (
          <div className="bg-gray-50 p-4 rounded-md border mb-4">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Pergunta</label>
              <input
                type="text"
                name="question"
                value={newFaq.question}
                onChange={handleNewFaqChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Resposta</label>
              <textarea
                name="answer"
                value={newFaq.answer}
                onChange={handleNewFaqChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div className="flex justify-end">
              <CustomButton 
                variant="secondary" 
                onClick={() => setShowNewForm(false)}
                className="mr-2"
              >
                Cancelar
              </CustomButton>
              <CustomButton 
                variant="primary" 
                onClick={handleAddFaq}
              >
                Adicionar FAQ
              </CustomButton>
            </div>
          </div>
        )}
        
        {loadingFaqs ? (
          <div className="text-center py-4">Carregando FAQs...</div>
        ) : (
          <div className="space-y-4">
            {faqs.length === 0 && !loadingFaqs ? (
              <div className="text-center py-4 text-gray-500">Nenhuma pergunta cadastrada</div>
            ) : (
              faqs.map(faq => (
                <div key={faq.id} className="bg-gray-50 p-4 rounded-md border">
                  {editingFaq && editingFaq.id === faq.id ? (
                    <>
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pergunta</label>
                        <input
                          type="text"
                          name="question"
                          value={editingFaq.question}
                          onChange={handleEditFaqChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="mb-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Resposta</label>
                        <textarea
                          name="answer"
                          value={editingFaq.answer}
                          onChange={handleEditFaqChange}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <CustomButton 
                          variant="secondary" 
                          onClick={() => setEditingFaq(null)}
                          className="mr-2"
                        >
                          <X size={16} className="mr-1" />
                          Cancelar
                        </CustomButton>
                        <CustomButton 
                          variant="primary" 
                          onClick={handleUpdateFaq}
                        >
                          <Save size={16} className="mr-1" />
                          Salvar
                        </CustomButton>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <h4 className="font-medium text-gray-800">{faq.question}</h4>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setEditingFaq(faq)} 
                            className="text-blue-500 hover:text-blue-700"
                            title="Editar"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteFaq(faq.id)} 
                            className="text-red-500 hover:text-red-700"
                            title="Excluir"
                          >
                            <Trash size={16} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-1">{faq.answer}</p>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}
        
        <div className="flex justify-end mt-4">
          <CustomButton 
            onClick={() => handleSaveSection('faq')}
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
