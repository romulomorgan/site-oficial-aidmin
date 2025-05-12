
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { CustomButton } from './ui/CustomButton';
import { supabase } from '@/integrations/supabase/client';
import { useWebhook } from '@/hooks/useWebhook';
import { fetchSiteTexts } from '@/utils/supabaseClient';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [footerData, setFooterData] = useState({
    companyName: 'iAdmin',
    footerAbout: 'Transforme seu atendimento com soluções inteligentes de IA, automatize respostas e gerencie seus clientes com eficiência.',
    footerPhoneNumber: '+55 (11) 99999-9999',
    footerEmail: 'contato@iadmin.com.br',
    copyrightText: '© 2023 iAdmin. Todos os direitos reservados.',
    logoUrl: '/lovable-uploads/3a83de09-ec2f-4458-96fa-750a22731ea4.png',
    footerLogoUrl: '',
    footerLocation: 'São Paulo, SP - Brasil'
  });
  const [socialLinks, setSocialLinks] = useState({
    facebookUrl: '#',
    instagramUrl: '#',
    twitterUrl: '#',
    facebookActive: true,
    instagramActive: true,
    twitterActive: true
  });
  
  // Usar o hook personalizado para enviar emails para o webhook
  const { sendEmailSubscriptionWebhook } = useWebhook();
  
  useEffect(() => {
    // Carregar dados do footer do banco de dados
    const loadFooterData = async () => {
      try {
        const siteTexts = await fetchSiteTexts();
        
        // Atualizar dados do footer
        setFooterData({
          companyName: siteTexts.companyName?.toString() || 'iAdmin',
          footerAbout: siteTexts.footerAbout?.toString() || 'Transforme seu atendimento com soluções inteligentes de IA, automatize respostas e gerencie seus clientes com eficiência.',
          footerPhoneNumber: siteTexts.footerPhoneNumber?.toString() || '+55 (11) 99999-9999',
          footerEmail: siteTexts.footerEmail?.toString() || 'contato@iadmin.com.br',
          copyrightText: siteTexts.copyrightText?.toString() || '© 2023 iAdmin. Todos os direitos reservados.',
          logoUrl: siteTexts.logoUrl?.toString() || '/lovable-uploads/3a83de09-ec2f-4458-96fa-750a22731ea4.png',
          footerLogoUrl: siteTexts.footerLogoUrl?.toString() || '',
          footerLocation: siteTexts.footerLocation?.toString() || 'São Paulo, SP - Brasil'
        });
        
        // Atualizar links de redes sociais
        setSocialLinks({
          facebookUrl: siteTexts.facebookUrl?.toString() || '#',
          instagramUrl: siteTexts.instagramUrl?.toString() || '#',
          twitterUrl: siteTexts.twitterUrl?.toString() || '#',
          facebookActive: siteTexts.facebookActive === false ? false : true,
          instagramActive: siteTexts.instagramActive === false ? false : true,
          twitterActive: siteTexts.twitterActive === false ? false : true
        });
      } catch (error) {
        console.error('Erro ao carregar dados do rodapé:', error);
      }
    };
    
    loadFooterData();
  }, []);
  
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
      
      // 3. Enviar para o webhook diretamente se URL estiver configurada
      if (webhookUrl && typeof webhookUrl === 'string' && webhookUrl.trim() !== '') {
        console.log('Enviando email para webhook:', email);
        
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
              source: 'Newsletter Rodapé',
              date: new Date().toISOString(),
              subscriptionId: `subscription_${Date.now()}`
            })
          });
          
          console.log('Resposta do webhook:', response.status, await response.text());
        } catch (webhookError) {
          console.error('Erro ao enviar diretamente para webhook:', webhookError);
        }
        
        // Usar também o método do hook
        await sendEmailSubscriptionWebhook(webhookUrl, email, 'Newsletter Rodapé');
      } else {
        console.warn('URL de webhook não configurada para envio de email de inscrição');
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
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Coluna 1 - Logo e Sobre */}
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-4">
              <img 
                src={footerData.footerLogoUrl || footerData.logoUrl} 
                alt={`Logo ${footerData.companyName}`} 
                className="h-12" 
              />
            </div>
            <p className="text-gray-400 mb-4">
              {footerData.footerAbout}
            </p>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/solucoes" className="text-gray-400 hover:text-white transition-colors">Soluções</Link></li>
              <li><Link to="/contato" className="text-gray-400 hover:text-white transition-colors">Contato</Link></li>
              <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">Área Admin</Link></li>
            </ul>
          </div>

          {/* Coluna 3 - Contato */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">{footerData.footerEmail}</li>
              <li className="text-gray-400">{footerData.footerPhoneNumber}</li>
              <li className="text-gray-400">{footerData.footerLocation}</li>
            </ul>
          </div>

          {/* Coluna 4 - Newsletter */}
          <div className="col-span-1">
            <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">Receba novidades e atualizações diretamente em seu email.</p>
            <form onSubmit={handleSubmit} className="flex">
              <input
                type="email"
                placeholder="Seu email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-full"
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
        </div>

        {/* Rodapé */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">{footerData.copyrightText}</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              {socialLinks.facebookActive && (
                <a href={socialLinks.facebookUrl} className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {socialLinks.instagramActive && (
                <a href={socialLinks.instagramUrl} className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {socialLinks.twitterActive && (
                <a href={socialLinks.twitterUrl} className="text-gray-400 hover:text-white transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
