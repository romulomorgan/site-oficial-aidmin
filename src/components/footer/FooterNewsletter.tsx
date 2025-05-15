
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { CustomButton } from '@/components/ui/CustomButton';
import { supabase } from '@/integrations/supabase/client';
import { useWebhook } from '@/hooks/useWebhook';

const FooterNewsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Usar o hook personalizado para enviar emails para o webhook
  const { sendEmailSubscriptionWebhook } = useWebhook();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast.error('Por favor, insira um email válido');
      return;
    }
    
    setLoading(true);
    
    try {
      console.log('Enviando email para inscrição da newsletter:', email);
      
      // 1. Salvar no banco de dados
      const { error } = await supabase
        .from('site_email_subscriptions')
        .insert([{ 
          email, 
          source: 'Newsletter Rodapé' 
        }]);
      
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
      
      // 3. Enviar para o webhook se URL estiver configurada
      if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.trim() !== '') {
        await sendEmailSubscriptionWebhook(webhookUrl, email, 'Newsletter Rodapé');
      }
      
      toast.success('Inscrição realizada com sucesso!');
      setEmail('');
    } catch (error) {
      console.error('Erro ao salvar email:', error);
      toast.error('Erro ao realizar inscrição. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <p className="text-white/80 mb-4">Receba novidades e atualizações diretamente em seu email.</p>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="email"
          placeholder="Seu email"
          className="bg-white/10 text-white px-4 py-2 rounded-l-md focus:outline-none w-full border border-white/20"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <CustomButton
          type="submit"
          variant="primary"
          className="rounded-l-none"
          disabled={loading}
        >
          {loading ? "..." : <Send size={16} />}
        </CustomButton>
      </form>
    </div>
  );
};

export default FooterNewsletter;
