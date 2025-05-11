
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CustomButton } from './CustomButton';
import { Menu, X } from 'lucide-react';

export const NavigationBar: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="items-center absolute z-40 flex w-full max-w-[1140px] mx-auto text-base text-white leading-loose flex-wrap justify-between top-[30px] inset-x-0 md:px-5">
      <Link to="/" className="flex items-center gap-1.5 z-50 relative hover-scale">
        <div className="flex text-[32px] text-[#ff196e] font-semibold whitespace-nowrap capitalize leading-[0.7] items-center gap-1.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/1c07b1cd58224b228ea174fbb56360aa/5b8e380689abbb696f1a70d356bb34fb2c6e00d8?placeholderIfAbsent=true"
            alt="IAdmin Logo"
            className="aspect-[1] object-contain w-9 shrink-0 rounded-[500px] hover-float"
          />
          <div className="text-[32px] font-semibold leading-[22.4px]">
            IAdmin
          </div>
        </div>
      </Link>
      
      <div className="justify-center items-center backdrop-blur-[10px] bg-white/10 px-[17px] py-[1px] rounded-[99px] border border-white/10 hidden md:block">
        <div className="justify-center items-center self-stretch flex gap-2 my-auto pr-2">
          <Link 
            to="/" 
            className={`nav-menu-item px-4 py-3 transition-colors ${isActive('/') ? 'text-[#ff196e] active' : 'text-white hover:text-[#ff196e]'}`}
          >
            Home
          </Link>
          <Link 
            to="/solucoes" 
            className={`nav-menu-item px-4 py-3 transition-colors ${isActive('/solucoes') ? 'text-[#ff196e] active' : 'text-white hover:text-[#ff196e]'}`}
          >
            Soluções
          </Link>
          <Link 
            to="/contato" 
            className={`nav-menu-item px-4 py-3 transition-colors ${isActive('/contato') ? 'text-[#ff196e] active' : 'text-white hover:text-[#ff196e]'}`}
          >
            Contato
          </Link>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden z-50 relative">
        <button 
          onClick={toggleMenu}
          className="text-white p-2 hover-scale"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#2D0A16] to-[#FF196E] z-40 md:hidden animate-fade-in">
          <div className="flex justify-end p-5">
            <button onClick={toggleMenu} className="text-white hover-scale">
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-6 mt-20">
            <Link 
              to="/" 
              onClick={toggleMenu}
              className={`nav-menu-item text-2xl ${isActive('/') ? 'text-[#ff196e] active' : 'text-white'}`}
            >
              Home
            </Link>
            <Link 
              to="/solucoes" 
              onClick={toggleMenu}
              className={`nav-menu-item text-2xl ${isActive('/solucoes') ? 'text-[#ff196e] active' : 'text-white'}`}
            >
              Soluções
            </Link>
            <Link 
              to="/contato" 
              onClick={toggleMenu}
              className={`nav-menu-item text-2xl ${isActive('/contato') ? 'text-[#ff196e] active' : 'text-white'}`}
            >
              Contato
            </Link>
            <Link to="/solucoes" onClick={toggleMenu} className="mt-4">
              <CustomButton variant="primary" className="button-animate">
                Soluções
              </CustomButton>
            </Link>
          </div>
        </div>
      )}

      <div className="hidden md:block">
        <Link to="/solucoes">
          <CustomButton variant="primary" className="button-animate pulse-btn">
            Soluções
          </CustomButton>
        </Link>
      </div>
    </nav>
  );
};
