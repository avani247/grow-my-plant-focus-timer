import React from 'react';
import { TimerMode } from '../types';
import NeoButton from '../components/NeoButton';
import waterBottlePixel from '../water-bottle-pixel.png';
import coffeeMugPixel from '../coffee-mug-pixel.png';
import plantSmallPixel from '../plant-1-small-pixel.png';
import plantMediumPixel from '../plant-2-medium-pixel.png';
import plantLargePixel from '../plant-3-large-pixel.png';
import plantExtraLargePixel from '../plant-4-extra-large-pixel.png';

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
  
  if (mode === TimerMode.SHORT_BREAK) {
    return (
      <img
        src={waterBottlePixel}
        alt="Water bottle"
        className="h-full w-full object-contain"
      />
    );
  }

  if (mode === TimerMode.LONG_BREAK) {
    return (
      <img
        src={coffeeMugPixel}
        alt="Coffee mug"
        className="h-full w-full object-contain"
      />
    );
  }

  // FOCUS MODE - Growth Stages
  const stage = Math.min(Math.max(sessionCount, 1), 4);
  const plantStages = [
    plantSmallPixel,
    plantMediumPixel,
    plantLargePixel,
    plantExtraLargePixel,
  ];

  return (
    <img
      src={plantStages[stage - 1]}
      alt={`Plant growth stage ${stage}`}
      className="h-full w-full object-contain"
    />
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
