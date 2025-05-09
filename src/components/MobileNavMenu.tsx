
import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileNavMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavMenu: React.FC<MobileNavMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-secondary-color text-white z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 border-b border-gray-800">
        <Link to="/" className="text-2xl font-bold text-primary-color">IAdmin</Link>
        <button onClick={onClose} className="text-white p-2">
          <X size={24} />
        </button>
      </div>
      
      <nav className="flex-1 flex flex-col justify-center items-center gap-8 text-center">
        <Link to="/" onClick={onClose} className="text-2xl font-medium text-menu-text-color hover:text-primary-color">
          Home
        </Link>
        <Link to="/solucoes" onClick={onClose} className="text-2xl font-medium text-menu-text-color hover:text-primary-color">
          Soluções
        </Link>
        <Link to="/contato" onClick={onClose} className="text-2xl font-medium text-menu-text-color hover:text-primary-color">
          Contato
        </Link>
      </nav>
    </div>
  );
};

export default MobileNavMenu;
