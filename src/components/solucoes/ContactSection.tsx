
import React, { useState } from 'react';
import { CustomButton } from '@/components/ui/CustomButton';
import { toast } from 'sonner';
import { saveEmailSubscription } from '@/utils/supabaseClient';
import { supabase } from '@/integrations/supabase/client';
import { useWebhook } from '@/hooks/useWebhook';

interface ContactSectionProps {
  primaryColor: string;
  secondaryColor: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ primaryColor, secondaryColor }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { sendEmailSubscriptionWebhook } = useWebhook();

  async function handleSubscribeEmail(e: React.FormEvent) {
    e.preventDefault();
    
    if (!email) {
      toast.error('Por favor, insira seu e-mail.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log('Enviando email para inscrição:', email);

      // 1. Salvar no banco de dados
      const { data, error } = await supabase
        .from('site_email_subscriptions')
        .insert([{ 
          email, 
          source: 'Página de Soluções' 
        }])
        .select();
      
      if (error) {
        throw error;
      }

      // 2. Buscar URL do webhook da configuração
      const { data: webhookData } = await supabase
        .from('site_texts')
        .select('content')
        .eq('key', 'webhookUrl')
        .maybeSingle();
      
      const webhookUrl = webhookData?.content;

      // 3. Enviar para o webhook diretamente se URL estiver configurada
      if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.trim() !== '') {
        console.log('Enviando email para webhook (ContactSection):', email, webhookUrl);
        
        // Tentativa forçada de envio usando a API fetch diretamente
        try {
          const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              type: 'email_subscription',
              email: email,
              source: 'Página de Soluções',
              date: new Date().toISOString(),
              subscriptionId: `subscription_${Date.now()}`
            })
          });
          
          console.log('Resposta do webhook (ContactSection):', response.status, await response.text());
        } catch (webhookError) {
          console.error('Erro ao enviar diretamente para webhook (ContactSection):', webhookError);
        }
        
        // Usar também o método do hook
        await sendEmailSubscriptionWebhook(webhookUrl, email, 'Página de Soluções');
      } else {
        console.warn('URL de webhook não configurada para envio de email de inscrição');
      }
      
      toast.success('E-mail cadastrado com sucesso!');
      setEmail('');
    } catch (error) {
      console.error('Erro ao cadastrar e-mail:', error);
      toast.error('Ocorreu um erro ao cadastrar seu e-mail. Tente novamente.');
    } finally {
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
