import React, { useState, useEffect } from 'react';

interface AggressiveSlideInProps {
    onTriggerDoom: () => void;
}

export const AggressiveSlideIn: React.FC<AggressiveSlideInProps> = ({ onTriggerDoom }) => {
  const [elements, setElements] = useState<{id: number, text: string}[]>([]);

  const messages = [
    "YOUR TAX RETURNS ARE PENDING",
    "WINDOWS 98 UPDATE AVAILABLE",
    "PLEASE VERIFY YOUR SSN",
    "INTERNET EXPLORER HAS STOPPED",
    "GOVERNMENT DRONE DISPATCHED",
    "DDR6 RAM DOWNLOAD READY"
  ];

  const playWhoosh = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.type = 'sawtooth'; // Harsh sound
      oscillator.frequency.setValueAtTime(150, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2); 

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.error("Audio failed", e);
    }
  };

  useEffect(() => {
    // Exact 8 second interval
    const loop = () => {
        const delay = 8000;
        setTimeout(() => {
            setElements(prev => [...prev, {
                id: Date.now(),
                text: messages[Math.floor(Math.random() * messages.length)]
            }]);
            playWhoosh();
            loop();
        }, delay);
    };

    loop();

    return () => {}; 
  }, []);

  const handleOkClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLButtonElement;
    target.closest('div')?.remove();
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {elements.map((el) => (
        <div 
            key={el.id}
            className="absolute p-6 text-white font-bold text-xl animate-slide-in-slow shadow-[10px_10px_0_0_rgba(0,0,0,1)] pointer-events-auto flex flex-col items-center justify-center text-center border-4 border-scam-yellow"
            style={{
                backgroundColor: '#4A412A', // Pantone 448 C
                top: `${10 + Math.random() * 70}%`,
                left: `${10 + Math.random() * 60}%`,
                width: '500px', 
                height: '300px', 
                zIndex: 1000,
            }}
        >
            <div className="w-full bg-scam-red text-white font-mono text-xs mb-2">OFFICIAL ALERT</div>
            <h2 className="mb-4 text-3xl">{el.text}</h2>
            
            <button 
                className="bg-govt-gray text-black border-2 border-white border-outset py-2 px-8 hover:bg-white active:border-inset font-bold text-xl"
                onClick={handleOkClick}
            >
                OK
            </button>
        </div>
      ))}
    </div>
  );
};