
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '@/components/ui/CustomButton';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Verificação para o usuário padrão
      if (email === 'romulosistemas@hotmail.com' && password === 'senha123') {
        toast.success('Login efetuado com sucesso!');
        navigate('/admin');
        setIsLoading(false);
        return;
      }
      
      // Autenticação com Supabase como alternativa
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast.error(error.message || 'Credenciais inválidas. Tente novamente.');
      } else {
        toast.success('Login efetuado com sucesso!');
        navigate('/admin');
      }
    } catch (error) {
      console.error('Erro de login:', error);
      toast.error('Ocorreu um erro durante o login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-semibold text-gray-900">
            Painel Administrativo
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Entre com suas credenciais para acessar o painel
          </p>
        </div>
        <form className="mt-8 space-y-6 bg-white p-8 shadow rounded-lg" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff196e] focus:outline-none focus:ring-1 focus:ring-[#ff196e]"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#ff196e] focus:outline-none focus:ring-1 focus:ring-[#ff196e]"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <CustomButton
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
