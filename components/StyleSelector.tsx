
import React from 'react';
import type { HeadshotStyle } from '../types';

interface StyleSelectorProps {
  styles: HeadshotStyle[];
  selectedStyle: HeadshotStyle | null;
  onSelectStyle: (style: HeadshotStyle) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onSelectStyle }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Choose a Style</h3>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onSelectStyle(style)}
            className={`text-left p-3 rounded-xl border-2 transition-all duration-200 transform hover:-translate-y-1 ${
              selectedStyle?.id === style.id ? 'border-indigo-500 ring-2 ring-indigo-500 bg-indigo-900/30' : 'border-gray-700 hover:border-gray-600 bg-gray-800/60'
            }`}
          >
            <img src={style.imageUrl} alt={style.name} className="w-full h-24 object-cover rounded-lg mb-3" />
            <h4 className="font-semibold text-white">{style.name}</h4>
            <p className="text-xs text-gray-400">{style.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};
