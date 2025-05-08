
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';
import { Trash } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const defaultFAQItems = [
    {
      id: 1,
      question: "Como funciona a Inteligência Artificial da IAdmin?",
      answer: "A IAdmin utiliza tecnologia de ponta em IA para automatizar e otimizar processos na construção civil e outros setores. Nosso sistema analisa dados, identifica padrões e fornece insights valiosos para tomada de decisão."
    },
    {
      id: 2,
      question: "Posso ter uma integração completa com nosso departamento operacional?",
      answer: "Sim, nossos sistemas de IA são desenvolvidos para integrar perfeitamente com seus sistemas existentes, garantindo uma transição suave e eficiente para processos mais automatizados."
    },
    {
      id: 3,
      question: "A Inteligência Artificial funciona com o WhatsApp?",
      answer: "Sim! Nossa IA se integra perfeitamente com o WhatsApp Business, permitindo automação de atendimento, respostas inteligentes e gerenciamento eficiente de conversas com seus clientes."
    },
    {
      id: 4,
      question: "Podemos integrar a IAdmin com outros sistemas que já utilizamos?",
      answer: "Absolutamente. Nossa solução foi projetada para ser flexível e se integrar a sistemas existentes através de APIs e conectores personalizados, minimizando a curva de aprendizado."
    },
    {
      id: 5,
      question: "Teremos algum painel para gerenciar?",
      answer: "Sim, oferecemos um painel administrativo intuitivo e completo que permite configurar, monitorar e analisar o desempenho da sua IA, incluindo métricas de atendimento e automação."
    }
  ];

  const [faqItems, setFAQItems] = useState<FAQItem[]>(defaultFAQItems);
  const [isLoading, setIsLoading] = useState(false);
  const [newFAQ, setNewFAQ] = useState<Omit<FAQItem, 'id'>>({
    question: '',
    answer: ''
  });

  useEffect(() => {
    // Load saved FAQ items from localStorage if available
    const savedFAQItems = localStorage.getItem('faqItems');
    if (savedFAQItems) {
      setFAQItems(JSON.parse(savedFAQItems));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFAQ(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddFAQ = () => {
    if (!newFAQ.question || !newFAQ.answer) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }
    
    setIsLoading(true);
    
    // Create new FAQ item with a unique ID
    const newId = faqItems.length > 0 
      ? Math.max(...faqItems.map(item => item.id)) + 1 
      : 1;
    
    const updatedFAQItems = [
      ...faqItems,
      {
        ...newFAQ,
        id: newId
      }
    ];
    
    // Save to localStorage
    localStorage.setItem('faqItems', JSON.stringify(updatedFAQItems));
    setFAQItems(updatedFAQItems);
    
    // Reset form
    setNewFAQ({
      question: '',
      answer: ''
    });
    
    toast.success('Pergunta adicionada com sucesso!');
    setIsLoading(false);
  };

  const handleDeleteFAQ = (id: number) => {
    const updatedFAQItems = faqItems.filter(item => item.id !== id);
    localStorage.setItem('faqItems', JSON.stringify(updatedFAQItems));
    setFAQItems(updatedFAQItems);
    toast.success('Pergunta removida com sucesso!');
  };

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
