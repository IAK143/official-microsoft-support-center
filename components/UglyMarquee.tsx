import React from 'react';

interface UglyMarqueeProps {
  text: string;
  speed?: 'fast' | 'slow';
  direction?: 'left' | 'right';
}

export const UglyMarquee: React.FC<UglyMarqueeProps> = ({ text, speed = 'fast', direction = 'left' }) => {
  const animationDuration = speed === 'fast' ? '1s' : '30s';
  
  return (
    <div className="w-full overflow-hidden bg-pain-red border-y-4 border-dashed border-ugly-purple p-2">
      <div 
        className="whitespace-nowrap"
        style={{
            animation: `marquee-${direction} ${animationDuration} linear infinite`,
            // @ts-ignore - Just for this inline style hack to simulate old marquee
            width: "max-content"
        }}
      >
        <span className="text-2xl font-bold text-white uppercase tracking-widest mx-4">
          {text} {text} {text} {text} {text}
        </span>
      </div>
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};