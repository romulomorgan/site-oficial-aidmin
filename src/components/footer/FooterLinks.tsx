
import React from 'react';
import { Link } from 'react-router-dom';

const FooterLinks: React.FC = () => {
  return (
    <div className="col-span-1">
      <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
      <ul className="space-y-2">
        <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
        <li><Link to="/solucoes" className="text-gray-400 hover:text-white transition-colors">Soluções</Link></li>
        <li><Link to="/contato" className="text-gray-400 hover:text-white transition-colors">Contato</Link></li>
        <li><Link to="/admin" className="text-gray-400 hover:text-white transition-colors">Área Admin</Link></li>
      </ul>
    </div>
  );
};

export default FooterLinks;
