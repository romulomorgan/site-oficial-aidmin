
import React, { useState } from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { toast } from 'sonner';
import { saveEmailSubscription } from '@/utils/supabaseClient';

interface ContactSectionProps {
  primaryColor: string;
  secondaryColor: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ primaryColor, secondaryColor }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubscribeEmail(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, insira seu e-mail.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Usar a função do supabaseClient para salvar a inscrição de email
      saveEmailSubscription(email, 'Página de Soluções')
        .then(success => {
          if (success) {
            toast.success('E-mail cadastrado com sucesso!');
            setEmail('');
          } else {
            throw new Error('Falha ao cadastrar email');
          }
        })
        .catch(error => {
          console.error('Erro ao cadastrar e-mail:', error);
          toast.error('Ocorreu um erro ao cadastrar seu e-mail. Tente novamente.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } catch (error) {
      console.error('Erro ao cadastrar e-mail:', error);
      toast.error('Ocorreu um erro ao cadastrar seu e-mail. Tente novamente.');
      setIsSubmitting(false);
    }
  }

  return (
    <section className="w-full py-[60px] text-center animate-on-scroll fade-on-scroll" style={{
        background: `linear-gradient(to bottom right, ${secondaryColor}, ${primaryColor})`,
        animationDelay: '0.3s'
      }}>
      <div className="max-w-[1140px] mx-auto px-5">
        <h2 className="text-white text-[40px] font-semibold mb-2 animate-on-scroll scale-on-scroll">
          Deixe seu contato
        </h2>
        <p className="text-white/80 mb-8 animate-on-scroll slide-up" style={{animationDelay: "0.2s"}}>
          Entraremos em contato brevemente!
        </p>
        <div className="flex justify-center">
          <form onSubmit={handleSubscribeEmail} className="w-full max-w-[444px] animate-on-scroll scale-on-scroll" style={{animationDelay: "0.3s"}}>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-5 rounded-lg bg-transparent border border-white text-white mb-4 placeholder:text-white/70 hover:border-white/80 focus:border-white transition-colors"
            />
            <CustomButton 
              type="submit" 
              variant="primary" 
              className="w-full button-animate pulse-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar"}
            </CustomButton>
          </form>
        </div>
      </div>
    </section>
  );
};
