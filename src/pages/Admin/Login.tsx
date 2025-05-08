
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { CustomButton } from '@/components/ui/CustomButton';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const adminAuthenticated = localStorage.getItem('adminAuthenticated');
    if (adminAuthenticated === 'true') {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication
    if (email === 'romulosistemas@hotmail.com' && password === 'senha123') {
      // Set admin as authenticated
      localStorage.setItem('adminAuthenticated', 'true');
      
      // Show success message
      toast.success('Login realizado com sucesso!');
      
      // Redirect to admin dashboard
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 1000);
    } else {
      toast.error('Credenciais inválidas. Por favor, tente novamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2D0A16] to-[#FF196E] p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex justify-center mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-pink-100">
              <span className="text-[#FF196E] text-xl font-semibold">
                IAdmin
              </span>
            </div>
          </div>
          
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Login Administrativo
          </h1>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF196E] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF196E] focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <CustomButton
                  type="submit"
                  variant="primary"
                  disabled={isLoading}
                  className="w-full justify-center"
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </CustomButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
