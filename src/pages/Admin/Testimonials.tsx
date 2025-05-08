
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';
import { trash } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  testimonial: string;
  avatarUrl: string;
}

export default function Testimonials() {
  const defaultTestimonials = [
    {
      id: 1,
      name: "Carlos M.",
      role: "Gerente de Projetos",
      testimonial: "Com a AI da IAdmin, conseguimos reduzir o tempo de planejamento em 30%. Ela nos fornece insights precisos, ajustando automaticamente o cronograma de acordo com o andamento das obras. Nunca tivemos tanto controle!",
      avatarUrl: "https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/99958c2062e54bcd396af977cf7591eddd0afa70?placeholderIfAbsent=true"
    },
    {
      id: 2,
      name: "Mariana P.",
      role: "Diretora de operações",
      testimonial: "A IAdmin trouxe uma transformação real à nossa empresa. A rapidez com que automatiza processos e interpreta documentos é impressionante, e seu sistema de apoio à decisão nos permite ser mais estratégicos.",
      avatarUrl: "https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/09b122a661f457926e57ea75f3ccd16a13770c01?placeholderIfAbsent=true"
    },
    {
      id: 3,
      name: "Lucas K.",
      role: "Coordenador de obras",
      testimonial: "O que a IAdmin realiza diária do nosso time com SmartCity é preciso e intuitivo. A visualização de relatórios e o gerenciamento ágil são diferenciais que nos ajudam a manter as obras no cronograma.",
      avatarUrl: "https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/8491a3ecf4b307f91edcd2d89f2c8c01096ca3cb?placeholderIfAbsent=true"
    }
  ];

  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [isLoading, setIsLoading] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({
    name: '',
    role: '',
    testimonial: '',
    avatarUrl: ''
  });

  useEffect(() => {
    // Load saved testimonials from localStorage if available
    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTestimonial = () => {
    if (!newTestimonial.name || !newTestimonial.role || !newTestimonial.testimonial) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }
    
    setIsLoading(true);
    
    // Create new testimonial with a unique ID
    const newId = testimonials.length > 0 
      ? Math.max(...testimonials.map(t => t.id)) + 1 
      : 1;
    
    const updatedTestimonials = [
      ...testimonials,
      {
        ...newTestimonial,
        id: newId,
        avatarUrl: newTestimonial.avatarUrl || 'https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/99958c2062e54bcd396af977cf7591eddd0afa70?placeholderIfAbsent=true'
      }
    ];
    
    // Save to localStorage
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    setTestimonials(updatedTestimonials);
    
    // Reset form
    setNewTestimonial({
      name: '',
      role: '',
      testimonial: '',
      avatarUrl: ''
    });
    
    toast.success('Depoimento adicionado com sucesso!');
    setIsLoading(false);
  };

  const handleDeleteTestimonial = (id: number) => {
    const updatedTestimonials = testimonials.filter(t => t.id !== id);
    localStorage.setItem('testimonials', JSON.stringify(updatedTestimonials));
    setTestimonials(updatedTestimonials);
    toast.success('Depoimento removido com sucesso!');
  };

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
                    <trash className="h-5 w-5" />
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
