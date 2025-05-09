
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';
import { Trash } from 'lucide-react';
import { fetchTestimonials, addTestimonial, deleteTestimonial, Testimonial } from '@/utils/supabaseClient';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    name: '',
    role: '',
    testimonial: '',
    avatarUrl: ''
  });
  
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Carregar depoimentos do Supabase
    const loadTestimonials = async () => {
      try {
        const data = await fetchTestimonials();
        setTestimonials(data);
      } catch (error) {
        console.error('Erro ao carregar depoimentos:', error);
        toast.error('Erro ao carregar depoimentos');
      } finally {
        setIsInitialLoading(false);
      }
    };
    
    loadTestimonials();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.role || !newTestimonial.testimonial) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Garantir que temos uma URL de avatar
      const testimonialToAdd = {
        ...newTestimonial,
        avatarUrl: newTestimonial.avatarUrl || 'https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/99958c2062e54bcd396af977cf7591eddd0afa70?placeholderIfAbsent=true'
      };
      
      // Adicionar ao Supabase
      const success = await addTestimonial(testimonialToAdd);
      
      if (success) {
        // Recarregar depoimentos
        const updatedTestimonials = await fetchTestimonials();
        setTestimonials(updatedTestimonials);
        
        // Resetar formulário
        setNewTestimonial({
          name: '',
          role: '',
          testimonial: '',
          avatarUrl: ''
        });
        
        toast.success('Depoimento adicionado com sucesso!');
      } else {
        toast.error('Erro ao adicionar depoimento');
      }
    } catch (error) {
      console.error('Erro ao adicionar depoimento:', error);
      toast.error('Ocorreu um erro ao adicionar o depoimento');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    try {
      const success = await deleteTestimonial(id);
      
      if (success) {
        // Atualizar estado local
        setTestimonials(prev => prev.filter(t => t.id !== id));
        toast.success('Depoimento removido com sucesso!');
      } else {
        toast.error('Erro ao remover depoimento');
      }
    } catch (error) {
      console.error('Erro ao excluir depoimento:', error);
      toast.error('Ocorreu um erro ao excluir o depoimento');
    }
  };

  if (isInitialLoading) {
    return <div className="p-6">Carregando depoimentos...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Gerenciar Depoimentos</h1>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Adicionar Novo Depoimento</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome *
            </label>
            <input
              type="text"
              name="name"
              value={newTestimonial.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cargo/Função *
            </label>
            <input
              type="text"
              name="role"
              value={newTestimonial.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Depoimento *
          </label>
          <textarea
            name="testimonial"
            value={newTestimonial.testimonial}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            URL da Foto de Perfil
          </label>
          <input
            type="text"
            name="avatarUrl"
            value={newTestimonial.avatarUrl}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Deixe em branco para usar uma imagem padrão"
          />
        </div>
        
        <div className="flex justify-end">
          <CustomButton 
            onClick={handleAddTestimonial}
            variant="primary"
            disabled={isLoading}
            type="button"
          >
            {isLoading ? 'Adicionando...' : 'Adicionar Depoimento'}
          </CustomButton>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">Depoimentos Existentes</h2>
        
        {testimonials.length === 0 ? (
          <p className="text-gray-500">Nenhum depoimento encontrado.</p>
        ) : (
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatarUrl} 
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/99958c2062e54bcd396af977cf7591eddd0afa70?placeholderIfAbsent=true';
                      }}
                    />
                    <div>
                      <h3 className="font-medium">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Excluir depoimento"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-gray-700">{testimonial.testimonial}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
