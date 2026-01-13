import React, { useState, useEffect, useRef } from 'react';

interface AnnoyingInputProps {
  placeholder: string;
  onValueChange: (val: string) => void;
}

export const AnnoyingInput: React.FC<AnnoyingInputProps> = ({ placeholder, onValueChange }) => {
  const [displayValue, setDisplayValue] = useState('');
  const [isClickable, setIsClickable] = useState(true);
  const [rotation, setRotation] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle clickability to make it hard to focus
  useEffect(() => {
    const interval = setInterval(() => {
      setIsClickable(Math.random() > 0.6); // 40% chance to be unclickable
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Sync with parent
  useEffect(() => {
    onValueChange(displayValue);
  }, [displayValue, onValueChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    
    // Rotate on writing: Add 3 degrees per keystroke
    setRotation(prev => prev + 3);
    
    // Immediate update (No Lag)
    setDisplayValue(newVal);
  };

  return (
    <div className="inline-block relative p-4 transition-transform duration-200" style={{ transform: `rotate(${rotation}deg)` }}>
      <div 
        className="absolute inset-0 bg-transparent z-20 transition-all"
        style={{ 
            pointerEvents: isClickable ? 'none' : 'auto', 
            cursor: isClickable ? 'text' : 'not-allowed'
        }}
      />
      <input
        ref={inputRef}
        type="text"
        value={displayValue} 
        onChange={handleChange}
        placeholder={placeholder}
        className={`
            bg-drab-brown text-green-400 font-mono p-4 
            border-b-8 border-l-8 border-ugly-purple 
            outline-none w-full focus:bg-red-900 placeholder-red-500
            shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
        `}
      />
    </div>
  );
};