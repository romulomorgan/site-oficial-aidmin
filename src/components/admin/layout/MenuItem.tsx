
import React from 'react';
import { Link } from 'react-router-dom';

export type MenuItemProps = {
  name: string;
  path: string;
  icon: React.ReactNode;
  isActive: boolean;
  isOpen: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ name, path, icon, isActive, isOpen }) => {
  return (
    <li>
      <Link
        to={path}
        className={`flex items-center px-4 py-2 rounded-md transition-colors ${
          isActive
            ? 'bg-primary-color bg-opacity-10 text-primary-color hover:bg-opacity-20'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <span className="mr-3">{icon}</span>
        {isOpen && <span>{name}</span>}
      </Link>
    </li>
  );
};

export default MenuItem;
