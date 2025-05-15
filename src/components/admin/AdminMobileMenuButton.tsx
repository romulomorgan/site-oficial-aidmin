
import React from 'react';
import { Menu } from 'lucide-react';

interface AdminMobileMenuButtonProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isMobileMenuOpen: boolean;
}

const AdminMobileMenuButton: React.FC<AdminMobileMenuButtonProps> = ({ 
  setIsMobileMenuOpen, 
  isMobileMenuOpen 
}) => {
  return (
    <div className="md:hidden fixed top-0 left-0 z-30 m-4">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 bg-white rounded-md shadow-md"
        aria-label="Menu"
      >
        <Menu size={24} />
      </button>
    </div>
  );
};

export default AdminMobileMenuButton;
