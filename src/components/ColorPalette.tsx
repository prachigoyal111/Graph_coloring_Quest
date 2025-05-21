
import React from 'react';
import { motion } from 'framer-motion';
import { colorPalette } from '../data/colors';

interface ColorPaletteProps {
  onSelectColor: (color: string) => void;
  selectedColor: string | null;
  unavailableColors?: Set<string>;
  disabled?: boolean;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({ 
  onSelectColor, 
  selectedColor, 
  unavailableColors = new Set(),
  disabled = false
}) => {
  return (
    <div className="flex flex-wrap gap-2 p-2">
      {colorPalette.map(color => {
        const isSelected = selectedColor === color.value;
        const isUnavailable = unavailableColors.has(color.value);
        
        return (
          <motion.button
            key={color.name}
            className={`
              w-10 h-10 rounded-full border-2 relative
              ${isSelected ? 'ring-2 ring-offset-2 ring-primary' : ''}
              ${isUnavailable ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110'}
            `}
            style={{
              backgroundColor: color.value,
              borderColor: isColorDark(color.value) ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
            }}
            onClick={() => !disabled && !isUnavailable && onSelectColor(color.value)}
            whileHover={!disabled && !isUnavailable ? { scale: 1.1 } : {}}
            whileTap={!disabled && !isUnavailable ? { scale: 0.95 } : {}}
            disabled={disabled || isUnavailable}
            title={`${color.name}${isUnavailable ? ' (unavailable)' : ''}`}
          >
            {isSelected && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring' }}
              >
                <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke={isColorDark(color.value) ? "white" : "black"}>
                  <path
                    d="M5 13l4 4L19 7"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

// Helper function to determine if text should be white or black based on background color
function isColorDark(color: string): boolean {
  // For hex colors
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) < 128;
  }
  return false;
}

export default ColorPalette;
