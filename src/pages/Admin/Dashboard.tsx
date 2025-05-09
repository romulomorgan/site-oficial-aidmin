
import React from 'react';
import { Link } from 'react-router-dom';
import { Settings, MessageSquare, Image, FileText, Palette, Layers } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Seções da Página</h2>
          <p className="text-gray-500 mb-4">Gerencie todas as seções e textos do site</p>
          <div className="mt-2 flex justify-end">
            <Link 
              to="/admin/secoes" 
              className="text-[#FF196E] hover:text-[#ff3582] font-medium flex items-center"
            >
              <Layers size={16} className="mr-1" />
              Gerenciar
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Depoimentos</h2>
          <p className="text-gray-500 mb-4">Adicionar, editar ou remover depoimentos</p>
          <div className="mt-2 flex justify-end">
            <Link 
              to="/admin/depoimentos" 
              className="text-[#FF196E] hover:text-[#ff3582] font-medium flex items-center"
            >
              <FileText size={16} className="mr-1" />
              Gerenciar
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
          <h2 className="text-lg font-medium text-gray-700 mb-2">FAQ</h2>
          <p className="text-gray-500 mb-4">Gerencie perguntas frequentes</p>
          <div className="mt-2 flex justify-end">
            <Link 
              to="/admin/faq" 
              className="text-[#FF196E] hover:text-[#ff3582] font-medium flex items-center"
            >
              <Settings size={16} className="mr-1" />
              Gerenciar
            </Link>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Mensagens</h2>
          <p className="text-gray-500 mb-4">Visualize e responda mensagens do formulário de contato</p>
          <div className="mt-2 flex justify-end">
            <Link 
              to="/admin/mensagens" 
              className="text-[#FF196E] hover:text-[#ff3582] font-medium flex items-center"
            >
              <MessageSquare size={16} className="mr-1" />
              Ver Mensagens
            </Link>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm transition-all hover:shadow-md">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Aparência</h2>
          <p className="text-gray-500 mb-4">Personalize cores, favicon e aparência geral do site</p>
          <div className="mt-2 flex justify-end">
            <Link 
              to="/admin/configuracoes" 
              className="text-[#FF196E] hover:text-[#ff3582] font-medium flex items-center"
            >
              <Palette size={16} className="mr-1" />
              Personalizar
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Guia Rápido</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="mb-4">
            Bem-vindo ao painel administrativo da IAdmin! Aqui você pode gerenciar todo o conteúdo do seu site.
          </p>
          <div className="space-y-2">
            <div>
              <h3 className="font-medium">Como editar textos e imagens:</h3>
              <p className="text-gray-600">Na seção "Seções da Página", você pode modificar todos os principais textos e imagens do site. Utilize as diferentes abas para acessar grupos específicos de conteúdo.</p>
            </div>
            <div>
              <h3 className="font-medium">Como personalizar a aparência:</h3>
              <p className="text-gray-600">Na seção "Aparência", você pode escolher entre templates de cores, criar temas personalizados e definir o favicon do site.</p>
            </div>
            <div>
              <h3 className="font-medium">Como gerenciar mensagens:</h3>
              <p className="text-gray-600">Todas as mensagens enviadas através do formulário de contato ficam disponíveis na seção "Mensagens". Lá você pode visualizar, responder e gerenciar as mensagens recebidas.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
