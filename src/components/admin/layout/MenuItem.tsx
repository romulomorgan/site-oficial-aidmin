
import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
      {isOpen ? (
        <Link
          to={path}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            isActive
              ? 'bg-primary-color bg-opacity-10 text-primary-color hover:bg-opacity-20'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <span className="mr-3">{icon}</span>
          <span>{name}</span>
        </Link>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              to={path}
              className={`flex items-center justify-center p-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-primary-color bg-opacity-10 text-primary-color hover:bg-opacity-20'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {icon}
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      )}
    </li>
  );
};

export default MenuItem;
