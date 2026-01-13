import React, { useState } from 'react';

interface HellNavBarProps {
    onGiftCardClick: () => void;
}

export const HellNavBar: React.FC<HellNavBarProps> = ({ onGiftCardClick }) => {
  const [style, setStyle] = useState<React.CSSProperties>({
    position: 'sticky',
    top: 0,
    zIndex: 50,
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("SYSTEM ERROR 0x8024901: HARD DRIVE DELETED");
  };

  return (
    <nav 
        style={style} 
        className="w-full bg-[#4A412A] border-b-4 border-white flex gap-2 p-1 shadow-xl items-center flex-wrap"
    >
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold px-4 py-1 italic border-2 border-white rounded-r-lg cursor-pointer hover:invert">
        Start
      </div>
      {['File', 'Edit', 'View', 'History', 'VIRUS SCAN'].map((item) => (
        <a 
            key={item}
            href="#" 
            onClick={handleClick}
            className="text-white text-sm hover:bg-red-600 hover:text-yellow-300 px-2 py-1 font-bold"
        >
            {item}
        </a>
      ))}
      
      <button 
        onClick={onGiftCardClick}
        className="bg-red-600 text-yellow-300 font-bold px-2 py-1 border-2 border-yellow-300 hover:bg-red-700 animate-pulse ml-2"
      >
        🎁 Gift Card
      </button>

      <div className="ml-auto bg-black text-red-500 font-mono px-2 animate-flash hidden md:block">
        WARNING: IP EXPOSED
      </div>
    </nav>
  );
};