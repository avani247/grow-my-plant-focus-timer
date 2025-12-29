import React, { useState } from 'react';
import { AppView, TimerSettings } from './types';
import { DEFAULT_SETTINGS } from './constants';
import NavBar from './components/NavBar';
import TimerView from './views/TimerView';
import MusicView from './views/MusicView';
import SettingsView from './views/SettingsView';
import { usePomodoro } from './hooks/usePomodoro';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.TIMER);
  const [timerSettings, setTimerSettings] = useState<TimerSettings>(DEFAULT_SETTINGS);
  
  const { mode, timeLeft, isActive, sessionCount, toggleTimer, resetTimer } = usePomodoro(timerSettings);

  return (
    // Changed min-h-screen to h-dvh for mobile browser support
    // Removed p-4 on mobile, added it back on sm screens
    <div className="h-dvh w-screen font-sans flex flex-col items-center justify-center sm:p-4 bg-neo-yellow overflow-hidden">
      
      {/* Main App Container - The "Window" */}
      {/* Changed h-[92vh] to h-full on mobile to fill screen */}
      <main className="w-full h-full sm:h-[92vh] max-w-md sm:max-h-[950px] bg-neo-white sm:border-3 border-black sm:shadow-neo-lg flex flex-col relative overflow-hidden transition-all">
        
        {/* Window Header - Hidden on very small mobile to save space, visible on sm+ */}
        <header className="border-b-3 border-black p-3 bg-neo-offwhite flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-neo-pink border-2 border-black rounded-full"></div>
            <span className="font-display font-bold text-xs tracking-tighter truncate">GROW_MY_PLANT.EXE</span>
          </div>
          <div className="flex gap-1">
             <div className="w-3 h-3 border-2 border-black bg-neo-green"></div>
             <div className="w-3 h-3 border-2 border-black bg-neo-yellow"></div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto bg-neo-white relative scrollbar-hide">
          {currentView === AppView.TIMER && (
            <TimerView
              mode={mode}
              timeLeft={timeLeft}
              isActive={isActive}
              sessionCount={sessionCount}
              onToggle={toggleTimer}
              onReset={resetTimer}
            />
          )}
          
          {currentView === AppView.MUSIC && (
            <MusicView />
          )}

          {currentView === AppView.SETTINGS && (
            <SettingsView 
              settings={timerSettings} 
              onUpdateSettings={setTimerSettings} 
            />
          )}
        </div>

        {/* Navigation Bar - Stick to bottom of card */}
        <div className="shrink-0 z-10">
           <NavBar currentView={currentView} setView={setCurrentView} />
        </div>
      </main>
    </div>
  );
};

export default App;