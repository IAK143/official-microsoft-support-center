import React, { useState, useCallback } from 'react';

interface EvadingButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'danger';
}

export const EvadingButton: React.FC<EvadingButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const moveButton = useCallback(() => {
    const randomX = (Math.random() - 0.5) * 300; // Move up to 150px away
    const randomY = (Math.random() - 0.5) * 300;
    setPosition({ x: randomX, y: randomY });
  }, []);

  const bgColor = variant === 'primary' ? 'bg-blue-600' : 'bg-red-600';

  return (
    <button
      onMouseEnter={moveButton}
      onClick={onClick}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s ease-out'
      }}
      className={`${bgColor} text-white font-bold py-4 px-8 rounded-none border-4 border-dotted border-yellow-400 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:rotate-12 active:scale-50 z-10`}
    >
      <span className="animate-pulse">{label}</span>
    </button>
  );
};