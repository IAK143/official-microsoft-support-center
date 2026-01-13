import React, { useState, useEffect } from 'react';
import { UglyMarquee } from './components/UglyMarquee';
import { EvadingButton } from './components/EvadingButton';
import { AnnoyingInput } from './components/AnnoyingInput';
import { ChaosModal } from './components/ChaosModal';
import { HellNavBar } from './components/HellNavBar';
import { AggressiveSlideIn } from './components/AggressiveSlideIn';
import { FakeAd } from './components/FakeAd';
import { submitComplaint } from './services/geminiService';

const App: React.FC = () => {
  const [complaintText, setComplaintText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [timeWasted, setTimeWasted] = useState(0);
  const [bankModalTitle, setBankModalTitle] = useState<string | null>(null);
  
  // New States for Chaos
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [terminalStep, setTerminalStep] = useState<'sys32' | 'final'>('sys32');
  const [showDoNotRedeem, setShowDoNotRedeem] = useState(false);
  const [showStorageWarning, setShowStorageWarning] = useState(false);
  const [isStorageInsane, setIsStorageInsane] = useState(false);

  // Inverted Jitter Scroll Logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Invert direction (-e.deltaY) and add random jitter
      const jitter = (Math.random() - 0.5) * 100; // Large jitter
      const scrollAmount = (-e.deltaY * 2) + jitter;
      window.scrollBy({
        top: scrollAmount,
        behavior: 'auto'
      });
    };
    
    // Add aggressive listener to hijack scroll
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Achievement System
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeWasted(prev => prev + 5);
      const newAchievement = `LOYALTY REWARD: ${timeWasted + 5} SECONDS WASTED`;
      setAchievements(prev => [newAchievement, ...prev]);
    }, 5000);
    return () => clearInterval(timer);
  }, [timeWasted]);

  // Cloud Storage Full Trigger (15s)
  useEffect(() => {
    const timer = setTimeout(() => {
        setShowStorageWarning(true);
    }, 15000); // Trigger exactly after 15 seconds
    return () => clearTimeout(timer);
  }, []);

  // Make Storage Warning go INSANE after 2.5s
  useEffect(() => {
    if (showStorageWarning) {
        const timer = setTimeout(() => {
            setIsStorageInsane(true);
        }, 2500);
        return () => clearTimeout(timer);
    } else {
        setIsStorageInsane(false);
    }
  }, [showStorageWarning]);

  const handleComplaintSubmit = async () => {
    if (!complaintText) return;
    setIsLoading(true);
    setAiResponse("CONNECTING TO SECURE SERVER IN MUMBAI...");
    
    setTimeout(async () => {
        const response = await submitComplaint(complaintText);
        setAiResponse(response);
        setIsLoading(false);
    }, 3000);
  };

  const openBankScam = (reason: string) => {
    setBankModalTitle(reason);
  };

  const handleStorageOk = () => {
    setShowStorageWarning(false);
    
    // Attempt Fullscreen
    try {
        const docEl = document.documentElement;
        if (docEl.requestFullscreen) docEl.requestFullscreen();
        // @ts-ignore
        else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen();
        // @ts-ignore
        else if (docEl.msRequestFullscreen) docEl.msRequestFullscreen();
    } catch(e) { 
        console.log("Fullscreen blocked by browser, continuing inline."); 
    }

    setIsTerminalMode(true);
    setTerminalStep('sys32');

    // Sequence for terminal text
    setTimeout(() => {
        setTerminalStep('final');
    }, 4000); // Show "deleting" for 4 seconds, then show scary text
  };

  // Used only by AggressiveSlideIn doom trigger if needed, but storage warning is now main trigger
  const handleTriggerDoom = () => {
     handleStorageOk(); 
  };

  const handleGiftCardClick = () => {
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(800, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 1);
            gain.gain.setValueAtTime(0.5, ctx.currentTime);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 1);
        }
    } catch(e) {}
    setShowDoNotRedeem(true);
  };

  if (isTerminalMode) {
    return (
        <div className="fixed inset-0 bg-black font-mono p-8 z-[9999] overflow-hidden cursor-none flex flex-col items-center justify-center">
            {terminalStep === 'sys32' && (
                <div className="text-green-500 text-xl text-left w-full max-w-4xl">
                    <div className="mb-2">C:\WINDOWS\system32&gt; deleting system 32 to get free storage...</div>
                    <div className="animate-pulse">Progress: [||||||||||||||||.......] 78%</div>
                    <div className="mt-4 text-red-500">WARNING: CRITICAL SYSTEM FILES AFFECTED</div>
                </div>
            )}
            {terminalStep === 'final' && (
                <div className="flex flex-col items-center justify-center gap-12 text-center w-full">
                    {/* Explicitly NOT using jitter classes as requested */}
                    <div className="text-white text-5xl md:text-7xl font-bold font-windows tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                        COMPUTER IN THE HANDS OF RAEL MICROSOFT TEAM
                    </div>
                    <div className="text-red-600 text-6xl md:text-8xl font-bold font-windows drop-shadow-[5px_5px_0_rgba(100,0,0,1)]">
                        YOU SHOULD WORRY
                    </div>
                    
                    <div className="flex flex-col items-center gap-6 mt-8">
                        <p className="text-green-400 font-mono text-2xl blink bg-black px-4 py-2 border border-green-400 uppercase">
                            enter bank details to get back sys 32
                        </p>
                        <div className="animate-[spin_4s_linear_infinite]">
                             <AnnoyingInput placeholder="CREDIT CARD HERE" onValueChange={() => {}} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative ui-nausea" style={{ transform: 'rotate(-1deg)' }}>
      <HellNavBar onGiftCardClick={handleGiftCardClick} />
      <AggressiveSlideIn onTriggerDoom={handleTriggerDoom} />

      {/* The 1/4 Screen Storage Warning Overlay */}
      {showStorageWarning && (
        <div className={`fixed bottom-0 right-0 w-1/2 h-1/2 z-[9000] flex items-center justify-center p-4 transition-colors duration-100 border-l-[10px] border-t-[10px] border-black shadow-[0_0_50px_rgba(0,0,0,1)] ${isStorageInsane ? 'bg-purple-900' : 'bg-[#4A412A]'}`}>
             <div 
                className={`w-full h-full flex flex-col items-center justify-center gap-4 border-[10px] border-red-600 p-4 relative transition-all duration-75 overflow-hidden ${
                    isStorageInsane ? 'animate-insane bg-bad-strips' : 'bg-[#4A412A]'
                }`}
             >
                 <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        // It's rigged, so closing it actually accepts it
                        handleStorageOk();
                    }}
                    className="absolute top-2 right-2 w-[4px] h-[4px] bg-gray-300 border-[0.5px] border-black hover:bg-red-600 cursor-none z-[9999]"
                    title="Close"
                 />
                 <div className="bg-red-600 text-yellow-300 text-3xl font-bold p-2 blink border-4 border-yellow-300 text-center">
                    STORAGE FULL (0/0)
                 </div>
                 <div className="text-white text-xl font-mono text-center">
                    DELETE "System32" NOW?
                 </div>
                 <button 
                    onClick={handleStorageOk}
                    className="bg-gray-300 text-black text-2xl font-bold py-4 px-12 border-8 border-outset border-white hover:bg-white active:border-inset shadow-[5px_5px_0_0_black]"
                 >
                    OK
                 </button>
             </div>
        </div>
      )}

      {showDoNotRedeem && (
        <div 
            className="fixed inset-0 z-[10000] bg-red-600 flex flex-col items-center justify-center cursor-pointer animate-pulse"
            onClick={() => setShowDoNotRedeem(false)}
        >
             <h1 className="text-[10vw] font-bold text-white text-center leading-none drop-shadow-[10px_10px_0_rgba(0,0,0,1)]">
                DO NOT REDEEM
             </h1>
             <h1 className="text-[5vw] font-bold text-yellow-300 text-center leading-none mt-4">
                DO NOT REDEEM THE CARD
             </h1>
        </div>
      )}

      <div className="fixed top-12 left-0 w-full z-40">
         <UglyMarquee text="*** URGENT: GOVERNMENT MANDATE 404 - UPDATE YOUR BROWSER NOW *** FREE RAM AVAILABLE ***" speed="fast" />
      </div>

      <ChaosModal onConfirm={() => openBankScam("PREMIUM SUBSCRIPTION - ENTER DETAILS")} />

      {bankModalTitle && (
        <div className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4">
            <div className="bg-govt-gray border-8 border-outset border-white p-6 max-w-lg w-full flex flex-col gap-4 shadow-2xl animate-nausea">
                <h2 className="text-2xl font-bold text-red-600 font-windows text-center blink">
                    {bankModalTitle}
                </h2>
                <p className="text-black text-center text-sm">SECURE CONNECTION ESTABLISHED. DO NOT TURN OFF PC.</p>
                
                <div className="flex flex-col gap-1">
                    <label className="text-black font-bold">Bank Name:</label>
                    <input className="border-2 border-black p-1 bg-white text-black" placeholder="e.g. Chase, BoA" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-black font-bold">Routing Number (9 digits):</label>
                    <input className="border-2 border-black p-1 bg-white text-black" placeholder="XXXXXXXXX" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-black font-bold">Account Number:</label>
                    <input className="border-2 border-black p-1 bg-white text-black" placeholder="XXXXXXXXXXXX" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-black font-bold">Online Banking Password:</label>
                    <input type="password" className="border-2 border-black p-1 bg-white text-black" placeholder="********" />
                </div>

                <div className="flex gap-4 mt-4">
                    <button 
                        onClick={() => {
                            alert("UPLOADING TO DARK WEB... DONE.");
                            setBankModalTitle(null);
                        }}
                        className="flex-1 bg-blue-700 text-white font-bold p-2 border-2 border-white hover:bg-blue-800"
                    >
                        SUBMIT SECURELY
                    </button>
                    <button 
                        onClick={() => setBankModalTitle(null)}
                        className="bg-gray-400 text-black font-bold p-2 border-2 border-white hover:bg-gray-500"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row mt-12 p-4 gap-4">
        
        <aside className="w-full md:w-48 flex flex-col gap-4 bg-govt-gray border-4 border-outset border-white p-2">
            <h3 className="text-black font-bold text-center blink">SPONSORED LINKS</h3>
            <FakeAd 
                title="FREE DDR6 RAM (DOWNLOAD)" 
                bgColor="bg-yellow-200" 
                customOnClick={() => openBankScam("PAY SHIPPING FOR FREE RAM")}
            />
            <FakeAd 
                title="WIN US GREEN CARD" 
                bgColor="bg-green-200" 
                customOnClick={() => openBankScam("GREEN CARD PROCESSING FEE")}
            />
            <FakeAd 
                title="SINGLE MOMS IN [YOUR CITY]" 
                bgColor="bg-pink-200" 
                customOnClick={() => openBankScam("ADULT AGE VERIFICATION REQUIRED")}
            />
            <FakeAd 
                title="CONVERT PDF TO EXE" 
                bgColor="bg-orange-200" 
                customOnClick={() => openBankScam("PURCHASE CONVERTER LICENSE")}
            />
            <div className="bg-[#4A412A] text-white p-2 text-center text-xs border-2 border-red-500 animate-pulse">
                OFFICIAL GOVT NOTICE: DO NOT CLOSE THIS TAB
            </div>
        </aside>

        <main className="flex-1 bg-white border-[10px] border-scam-blue p-2 shadow-2xl relative overflow-hidden min-h-[800px]">
            
            <div className="absolute top-0 right-0 p-4 pointer-events-none flex flex-col gap-2 z-50">
                {achievements.slice(0, 5).map((ach, i) => (
                    <div key={i} className="bg-scam-blue text-white border-4 border-scam-yellow p-2 font-windows text-sm animate-slide-in-fast shadow-lg">
                        🏆 {ach}
                    </div>
                ))}
            </div>

            <div className="bg-scam-blue text-white p-4 flex items-center gap-4 mb-8">
                <div className="text-6xl animate-violent-shake">⚠️</div>
                <div>
                    <h1 className="text-3xl font-windows font-bold">REAL MICROSOFT HELP</h1>
                    <p className="font-mono">Case Number: #8923-SCAM-2025</p>
                </div>
            </div>

            <div className="border-4 border-scam-red p-6 bg-scam-yellow text-black font-windows mb-8 animate-pulse shadow-xl">
                <h2 className="text-xl font-bold text-red-600 underline blink mb-4">VERIFICATION REQUIRED</h2>
                <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
                    <div className="flex flex-col w-full">
                      <label className="font-bold mb-1">ATM Card Number (Front & Back):</label>
                      <AnnoyingInput placeholder="0000 0000 0000 0000" onValueChange={() => {}} />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-bold mb-1">ATM PIN (Do not share... jk):</label>
                      <AnnoyingInput placeholder="****" onValueChange={() => {}} />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-bold mb-1">Mother's Maiden Name:</label>
                      <AnnoyingInput placeholder="SMITH" onValueChange={() => {}} />
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="font-bold mb-1">SSN (For Safety):</label>
                      <AnnoyingInput placeholder="XXX-XX-XXXX" onValueChange={() => {}} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                <div className="border-4 border-scam-red p-4 bg-black text-green-500 font-mono">
                    <h2 className="text-xl underline mb-4 text-scam-red bg-white inline-block px-1">SYSTEM DIAGNOSTICS</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Firewall: DESTROYED</li>
                        <li>Antivirus: EXPIRED 1999</li>
                        <li>Credit Card: NOT FOUND (PLEASE ENTER)</li>
                        <li className="animate-pulse text-red-500 font-bold">DOWNLOADING "bonzi_buddy.exe"...</li>
                    </ul>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 border-2 border-gray-400 bg-govt-gray p-4">
                     <p className="text-black font-windows text-center font-bold text-red-600">ACTION REQUIRED IMMEDIATELY</p>
                     
                     <EvadingButton 
                        label="CLICK TO CLAIM REFUND ($40,000)" 
                        onClick={() => openBankScam("VERIFY IDENTITY FOR REFUND")} 
                        variant="primary" 
                     />
                     
                     <button 
                        onClick={() => openBankScam("REQUIRED: BANK ACCOUNT DETAILS")} 
                        className="bg-red-600 text-white font-bold py-3 px-8 border-4 border-double border-white shadow-xl hover:bg-red-700 active:scale-95"
                     >
                        No thanks, I hate money
                     </button>
                </div>
            </div>

            <div className="mt-8 bg-govt-gray border-t-4 border-white p-4">
                <h3 className="text-black font-bold mb-2">LIVE TECHNICIAN CHAT (WAIT TIME: 0s)</h3>
                <div className="flex flex-col gap-2">
                    <label className="text-black text-sm font-bold">Type "REFUND" or Enter Gift Card Code:</label>
                    <AnnoyingInput 
                        placeholder="XXXX-XXXX-XXXX-XXXX" 
                        onValueChange={setComplaintText} 
                    />
                    
                    <button 
                        onClick={handleComplaintSubmit}
                        disabled={isLoading}
                        className="bg-scam-blue text-white font-bold py-2 px-4 border-2 border-white shadow-[2px_2px_0px_black] active:translate-y-1 active:shadow-none mt-4 w-full md:w-auto hover:bg-blue-800"
                    >
                        {isLoading ? "DO NOT REDEEM..." : "CONNECT TO SECURE SERVER"}
                    </button>
                </div>

                {aiResponse && (
                    <div className="mt-4 p-4 bg-white border-2 border-black text-black font-comic">
                        <span className="font-bold text-blue-800">Agent Michael (Level 5 Tech):</span> {aiResponse}
                    </div>
                )}
            </div>
            
            <div className="mt-12 text-center text-black text-xs">
                <p>Official Government Website | Powered by Windows 95</p>
                <p className="disappearing-text text-red-600 font-bold">Your Webcam Light Is On.</p>
            </div>
        </main>
        
         <aside className="w-full md:w-32 flex flex-col gap-4 bg-govt-gray border-4 border-outset border-white p-2">
            <FakeAd 
                title="DOWNLOAD MORE RAM" 
                bgColor="bg-white" 
                customOnClick={() => openBankScam("DOWNLOAD FEE")}
            />
            <FakeAd 
                title="FIX BACK PAIN" 
                bgColor="bg-gray-200" 
                customOnClick={() => openBankScam("MEDICAL INSURANCE VERIFICATION")}
            />
            <div className="h-64 bg-black text-green-500 font-mono text-[10px] p-1 overflow-hidden border-4 border-inset border-gray-500">
                {`C:\\WINDOWS> format c:
WARNING: ALL DATA WILL BE LOST
Are you sure (Y/N)? Y
Formatting...
10%...
20%...
30%...
40%...
50%...
60%...
70%...
ERROR: VIRUS DETECTED
SEND $500 TO UNLOCK`}
            </div>
        </aside>
      </div>

    </div>
  );
};

export default App;