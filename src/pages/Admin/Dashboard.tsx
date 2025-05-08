
import React from 'react';

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Textos do Site</h2>
          <p className="text-gray-500 mb-4">Edite os textos principais do site</p>
          <div className="mt-2 flex justify-end">
            <a 
              href="/admin/editar-textos" 
              className="text-[#FF196E] hover:text-[#ff3582] font-medium"
            >
              Gerenciar
            </a>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Depoimentos</h2>
          <p className="text-gray-500 mb-4">Adicionar, editar ou remover depoimentos</p>
          <div className="mt-2 flex justify-end">
            <a 
              href="/admin/depoimentos" 
              className="text-[#FF196E] hover:text-[#ff3582] font-medium"
            >
              Gerenciar
            </a>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-700 mb-2">FAQ</h2>
          <p className="text-gray-500 mb-4">Gerencie perguntas frequentes</p>
          <div className="mt-2 flex justify-end">
            <a 
              href="/admin/faq" 
              className="text-[#FF196E] hover:text-[#ff3582] font-medium"
            >
              Gerenciar
            </a>
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
              <h3 className="font-medium">Como editar textos:</h3>
              <p className="text-gray-600">Acesse a seção "Editar Textos" para modificar os principais textos do site.</p>
            </div>
            <div>
              <h3 className="font-medium">Como gerenciar depoimentos:</h3>
              <p className="text-gray-600">Na seção "Depoimentos", você pode adicionar, editar ou remover depoimentos de clientes.</p>
            </div>
            <div>
              <h3 className="font-medium">Como atualizar FAQ:</h3>
              <p className="text-gray-600">Utilize a seção "Perguntas FAQ" para manter atualizadas as perguntas e respostas frequentes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
