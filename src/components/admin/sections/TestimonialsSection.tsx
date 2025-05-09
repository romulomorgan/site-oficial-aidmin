
import React, { useState, useEffect } from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { Button } from '@/components/ui/button';
import { SectionProps, Testimonial } from '@/utils/supabase/types';
import { PlusIcon, TrashIcon, Edit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const TestimonialsSection: React.FC<Omit<SectionProps, 'handleSwitchChange'>> = ({ 
  sections, 
  handleInputChange, 
  isLoading, 
  handleSaveSection 
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    testimonial: '',
    avatarUrl: ''
  });

  const handleAddTestimonial = () => {
    setIsAddingTestimonial(true);
  };

  const handleCancelAdd = () => {
    setIsAddingTestimonial(false);
    setNewTestimonial({
      name: '',
      role: '',
      testimonial: '',
      avatarUrl: ''
    });
  };

  const handleChangeTestimonial = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTestimonial(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Esta função é um exemplo e precisaria ser conectada à API real
  const handleSaveTestimonial = () => {
    // Validação básica
    if (!newTestimonial.name || !newTestimonial.role || !newTestimonial.testimonial) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    // Simula adição ao estado local
    const mockTestimonial: Testimonial = {
      id: `temp-${Date.now()}`,
      name: newTestimonial.name,
      role: newTestimonial.role,
      testimonial: newTestimonial.testimonial,
      avatarUrl: newTestimonial.avatarUrl
    };

    setTestimonials([...testimonials, mockTestimonial]);
    setIsAddingTestimonial(false);
    setNewTestimonial({
      name: '',
      role: '',
      testimonial: '',
      avatarUrl: ''
    });
    
    toast.success('Depoimento adicionado com sucesso!');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Seção "Depoimentos"</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            name="testimonialsTitle"
            value={sections.testimonialsTitle as string}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-md font-medium">Depoimentos</h3>
            <Button 
              size="sm" 
              onClick={handleAddTestimonial}
              variant="outline"
              className="flex items-center gap-1"
            >
              <PlusIcon size={16} />
              Adicionar Depoimento
            </Button>
          </div>
          
          {testimonials.length > 0 ? (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="p-4 border rounded-md">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-blue-500 hover:text-blue-700">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-500 hover:text-red-700">
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-gray-700">{testimonial.testimonial}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border rounded-md bg-gray-50">
              <p className="text-gray-500">Nenhum depoimento cadastrado.</p>
              <p className="text-sm text-gray-400 mt-1">Adicione depoimentos para exibir na página inicial.</p>
            </div>
          )}
          
          {isAddingTestimonial && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50">
              <h4 className="font-medium mb-3">Novo Depoimento</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <Input 
                    name="name"
                    value={newTestimonial.name}
                    onChange={handleChangeTestimonial}
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cargo</label>
                  <Input 
                    name="role"
                    value={newTestimonial.role}
                    onChange={handleChangeTestimonial}
                    placeholder="Ex: CEO da Empresa X"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Depoimento</label>
                  <Textarea 
                    name="testimonial"
                    value={newTestimonial.testimonial}
                    onChange={handleChangeTestimonial}
                    placeholder="Digite o depoimento..."
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL da Foto (opcional)</label>
                  <Input 
                    name="avatarUrl"
                    value={newTestimonial.avatarUrl}
                    onChange={handleChangeTestimonial}
                    placeholder="https://exemplo.com/foto.jpg"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={handleCancelAdd}>Cancelar</Button>
                  <CustomButton 
                    variant="primary" 
                    onClick={handleSaveTestimonial}
                  >
                    Adicionar
                  </CustomButton>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-end mt-6">
          <CustomButton 
            onClick={() => handleSaveSection('testimonials')}
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

export default TestimonialsSection;
