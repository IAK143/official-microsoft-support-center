import React from 'react';

interface FakeAdProps {
  title: string;
  imgSrc?: string;
  bgColor?: string;
  customOnClick?: () => void;
}

export const FakeAd: React.FC<FakeAdProps> = ({ title, bgColor = 'bg-white', customOnClick }) => {
  const handleClick = () => {
    if (customOnClick) {
        customOnClick();
        return;
    }
    
    // Default Fake "Download Virus" action if no custom handler
    alert(`DOWNLOADING ${title.replace("FREE", "").trim()}.exe...\n\n[▓▓▓░░░░░░░] 34%\n\nWARNING: TROJAN DETECTED`);
    
    // Sometimes open a new window to nowhere
    if (Math.random() > 0.7) {
        window.open('', '_blank', 'width=200,height=200');
    }
  };

  return (
    <div 
        onClick={handleClick}
        className={`border-4 border-outset border-blue-800 p-2 m-2 cursor-pointer hover:opacity-80 animate-pulse ${bgColor} text-black max-w-[200px]`}
    >
      <div className="bg-blue-600 text-white font-bold text-xs p-1 mb-1">ADVERTISEMENT</div>
      <h4 className="font-bold text-xl text-center underline text-blue-800 mb-2">{title}</h4>
      <div className="bg-green-500 text-white text-center font-bold p-2 blink border-2 border-red-500">
        CLICK TO CLAIM
      </div>
      <p className="text-[10px] mt-1 text-center">No credit card required*</p>
    </div>
  );
};