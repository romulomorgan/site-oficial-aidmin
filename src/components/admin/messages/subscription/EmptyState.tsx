
import React from 'react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = 'Nenhum resultado encontrado.' 
}) => {
  return (
    <p className="text-gray-500 py-4 text-center">{message}</p>
  );
};

export default EmptyState;
