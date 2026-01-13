import React, { useState, useEffect } from 'react';

interface ChaosModalProps {
    onConfirm: () => void;
}

export const ChaosModal: React.FC<ChaosModalProps> = ({ onConfirm }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'left' | 'right' | 'bottom' | 'top'>('bottom');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(true);
      const positions: ('left' | 'right' | 'bottom' | 'top')[] = ['left', 'right', 'bottom', 'top'];
      setPosition(positions[Math.floor(Math.random() * positions.length)]);
    }, 15000); // Pops up every 15 seconds now to be less annoying than the main popups

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  let containerClass = "fixed z-50 p-6 bg-gradient-to-r from-pink-500 to-yellow-500 border-8 border-blue-800 shadow-2xl transition-all duration-1000";
  
  if (position === 'bottom') containerClass += " bottom-0 left-0 right-0 h-1/3 animate-slide-in-annoying";
  if (position === 'top') containerClass += " top-0 left-0 right-0 h-1/3";
  if (position === 'left') containerClass += " top-0 bottom-0 left-0 w-1/3";
  if (position === 'right') containerClass += " top-0 bottom-0 right-0 w-1/3";

  return (
    <div className={containerClass}>
      <h2 className="text-4xl font-extrabold text-white mb-4 blink">ATTENTION USER!!!</h2>
      <p className="text-xl font-bold mb-4 text-black bg-white inline-block">
        Are you enjoying the experience? 
      </p>
      <div className="mt-8 flex gap-4 justify-center flex-wrap">
         <button 
           onClick={() => setIsVisible(false)} 
           className="bg-green-400 p-1 text-[8px] hover:bg-green-500 border border-black"
         >
           Close
         </button>
         <button 
            onClick={() => {
                setIsVisible(false);
                onConfirm();
            }}
            className="bg-red-500 text-white text-3xl font-bold p-4 rounded-full animate-spin"
         >
           YES
         </button>
      </div>
    </div>
  );
};