
import React from 'react';

interface EmbedPositionSelectorProps {
  embedPosition: 'left' | 'right';
  setEmbedPosition: (position: 'left' | 'right') => void;
}

export const EmbedPositionSelector: React.FC<EmbedPositionSelectorProps> = ({
  embedPosition,
  setEmbedPosition
}) => {
  return (
    <div>
      <h3 className="text-md font-medium text-gray-800">Posição no Site</h3>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="position-left"
            name="embedPosition"
            checked={embedPosition === 'left'}
            onChange={() => setEmbedPosition('left')}
            className="mr-2"
          />
          <label htmlFor="position-left">Canto Inferior Esquerdo</label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="position-right"
            name="embedPosition"
            checked={embedPosition === 'right'}
            onChange={() => setEmbedPosition('right')}
            className="mr-2"
          />
          <label htmlFor="position-right">Canto Inferior Direito</label>
        </div>
      </div>
    </div>
  );
};
