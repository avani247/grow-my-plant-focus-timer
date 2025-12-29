import React from 'react';
import { TimerMode } from '../types';
import NeoButton from '../components/NeoButton';

interface TimerViewProps {
  mode: TimerMode;
  timeLeft: number;
  isActive: boolean;
  sessionCount: number;
  onToggle: () => void;
  onReset: () => void;
}

const LeafIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-300 hover:scale-110 sm:w-[28px] sm:h-[28px]"
  >
    <path 
      d="M12 21C12 21 3 14.5 3 8.5C3 2.5 12 2 12 2C12 2 21 2.5 21 8.5C21 14.5 12 21 12 21Z" 
      fill={filled ? "#00FF94" : "white"} 
      stroke="#121212" 
      strokeWidth="2.5" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 21V8" 
      stroke="#121212" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
  </svg>
);

const PlantVisuals: React.FC<{ mode: TimerMode; sessionCount: number }> = ({ mode, sessionCount }) => {
  
  // Common Pot Component
  const Pot = () => (
    <g>
       <rect x="6" y="14" width="12" height="8" fill="#FF90E8" stroke="#121212" strokeWidth="2" />
       <rect x="5" y="14" width="14" height="2" fill="#FF90E8" stroke="#121212" strokeWidth="2" />
       {/* Soil */}
       <rect x="8" y="16" width="8" height="2" fill="#121212" opacity="0.1" />
    </g>
  );

  if (mode === TimerMode.SHORT_BREAK) {
    // Water Bottle Icon
    return (
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C12 2 8 7 8 12C8 16 9.79 19 12 19C14.21 19 16 16 16 12C16 7 12 2 12 2Z" fill="#40E0D0" stroke="#121212" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M12 2V19" stroke="#121212" strokeWidth="1.5" opacity="0.2"/>
        <circle cx="13.5" cy="10" r="1" fill="white" />
        <rect x="10" y="21" width="4" height="1" fill="#121212" opacity="0.2" />
      </svg>
    );
  }

  if (mode === TimerMode.LONG_BREAK) {
    // Coffee Mug Icon
    return (
       <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
         <rect x="5" y="6" width="12" height="14" rx="1" fill="#FFF000" stroke="#121212" strokeWidth="2" />
         <path d="M17 8H19C20.1 8 21 8.9 21 10V12C21 13.1 20.1 14 19 14H17" stroke="#121212" strokeWidth="2" fill="none"/>
         {/* Steam */}
         <path d="M8 3V5" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
         <path d="M11 2V5" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
         <path d="M14 3V5" stroke="#121212" strokeWidth="2" strokeLinecap="round" />
       </svg>
    );
  }

  // FOCUS MODE - Growth Stages
  const stage = Math.min(Math.max(sessionCount, 1), 4);

  return (
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Pot />
      
      {stage >= 1 && (
        // Stage 1: Sprout
        <g>
          <path d="M12 14V11" stroke="#00FF94" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 11L10 9" stroke="#00FF94" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 11L14 9" stroke="#00FF94" strokeWidth="2" strokeLinecap="round"/>
        </g>
      )}

      {stage >= 2 && (
         // Stage 2: Taller Stem
         <g>
            <path d="M12 11V8" stroke="#00FF94" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 9L9 7" stroke="#00FF94" strokeWidth="2" strokeLinecap="round"/>
         </g>
      )}

      {stage >= 3 && (
         // Stage 3: Bushier
         <g>
            <path d="M12 8V6" stroke="#00FF94" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12 7L15 5" stroke="#00FF94" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="9" cy="7" r="1" fill="#00FF94" stroke="#121212" strokeWidth="1"/>
            <circle cx="15" cy="5" r="1" fill="#00FF94" stroke="#121212" strokeWidth="1"/>
            <circle cx="10" cy="9" r="1" fill="#00FF94" stroke="#121212" strokeWidth="1"/>
            <circle cx="14" cy="9" r="1" fill="#00FF94" stroke="#121212" strokeWidth="1"/>
         </g>
      )}

      {stage >= 4 && (
         // Stage 4: Flower
         <g>
            <circle cx="12" cy="5" r="3" fill="#FFF000" stroke="#121212" strokeWidth="1.5" />
            <circle cx="12" cy="5" r="1" fill="#121212" />
            {/* Sparkles */}
            <path d="M7 4L8 4" stroke="#121212" strokeWidth="1"/>
            <path d="M17 6L16 6" stroke="#121212" strokeWidth="1"/>
         </g>
      )}
    </svg>
  );
};

const TimerView: React.FC<TimerViewProps> = ({
  mode,
  timeLeft,
  isActive,
  sessionCount,
  onToggle,
  onReset,
}) => {
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isBreak = mode !== TimerMode.FOCUS;
  const completedSessions = isBreak ? sessionCount : sessionCount - 1;

  const getSessionLabel = () => {
    if (mode === TimerMode.FOCUS) return "FOCUS TIME";
    if (mode === TimerMode.SHORT_BREAK) return "SHORT BREAK";
    if (mode === TimerMode.LONG_BREAK) return "LONG BREAK";
    return "GROW";
  };

  const getLabelColor = () => {
    if (mode === TimerMode.FOCUS) return "bg-neo-green";
    if (mode === TimerMode.SHORT_BREAK) return "bg-neo-yellow";
    if (mode === TimerMode.LONG_BREAK) return "bg-neo-pink";
    return "bg-white";
  };

  return (
    <div className="flex flex-col items-center h-full w-full p-4 overflow-hidden">
      
      {/* Top Section: Visuals & Label (Flexible space) */}
      <div className="flex-1 flex flex-col items-center justify-center w-full min-h-0">
        
        {/* Plant Circle - Responsive Sizing */}
        <div className="relative group shrink-0 mb-3">
          <div className="w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 rounded-full border-3 border-black bg-neo-blue/40 overflow-hidden flex items-center justify-center relative z-10 transition-transform group-hover:scale-105">
             <div className="w-28 h-28 xs:w-32 xs:h-32 sm:w-40 sm:h-40">
                <PlantVisuals mode={mode} sessionCount={sessionCount} />
             </div>
          </div>
          {/* Decorative offset */}
          <div className="absolute top-0 left-0 w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 rounded-full border-3 border-black bg-neo-pink -z-10 translate-x-3 translate-y-3"></div>
        </div>

        {/* Label */}
        <div className="z-10 relative shrink-0">
          <div className={`
              ${getLabelColor()} 
              border-3 border-black 
              px-4 py-1 sm:px-6 sm:py-2 
              font-display font-bold text-sm xs:text-base sm:text-xl 
              uppercase tracking-widest 
              shadow-neo-sm 
              transform -rotate-2
              hover:rotate-0 transition-transform cursor-default
          `}>
              {getSessionLabel()}
          </div>
        </div>
      </div>

      {/* Bottom Section: Timer & Controls (Fixed-ish size, anchored bottom) */}
      <div className="flex flex-col items-center w-full shrink-0 gap-3 sm:gap-4 mt-2">
        
        {/* Big Timer Card */}
        <div className="w-full bg-white border-3 border-black p-4 sm:p-6 shadow-neo text-center relative">
          {/* Decorative Screws */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black"></div>
          <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black"></div>
          <div className="absolute bottom-2 left-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black"></div>
          <div className="absolute bottom-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black"></div>
          
          <h1 className="text-5xl xs:text-6xl sm:text-7xl font-display font-bold tracking-tighter tabular-nums leading-none my-1 sm:my-2">
            {formatTime(timeLeft)}
          </h1>
          
          {/* Progress Leaves */}
          <div className="mt-2 sm:mt-4 flex justify-center items-center gap-2 sm:gap-3">
             {[1, 2, 3, 4].map((i) => (
               <LeafIcon key={i} filled={i <= completedSessions} />
             ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 sm:gap-4 w-full">
          <NeoButton 
            onClick={onToggle} 
            variant={isActive ? 'neutral' : 'primary'}
            fullWidth
            className="flex-1 py-3 sm:py-4 text-xs sm:text-sm"
          >
            {isActive ? 'PAUSE' : 'START'}
          </NeoButton>
          
          <NeoButton 
            onClick={onReset} 
            variant="danger"
            className="px-4 sm:px-5 py-3 sm:py-4 text-xs sm:text-sm"
            title="Reset Timer"
          >
            ↻
          </NeoButton>
        </div>
      </div>

    </div>
  );
};

export default TimerView;