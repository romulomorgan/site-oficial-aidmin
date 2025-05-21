
import React from 'react';
import { renderEmbedButtonIcon } from '@/utils/icons/embedButtonIcons';

interface EmbedButtonProps {
  onClick: () => void;
  position: 'left' | 'right';
  buttonColor: string;
  buttonIcon: string;
}

const EmbedButton: React.FC<EmbedButtonProps> = ({ onClick, position, buttonColor, buttonIcon }) => {
  return (
    <button
      onClick={onClick}
      className="fixed text-white p-3 rounded-full shadow-lg m-4 hover:scale-110 transition-all z-50"
      aria-label="Abrir suporte"
      id="embed-chat-button"
      style={{ 
        backgroundColor: buttonColor,
        [position === 'left' ? 'left' : 'right']: '20px',
        bottom: '20px'
      }}
    >
      {renderEmbedButtonIcon(buttonIcon)}
    </button>
  );
};

export default EmbedButton;
