import React, { useState, useEffect } from 'react';
import { TimerMode, TimerSettings } from '../types';

interface SettingsViewProps {
  settings: TimerSettings;
  onUpdateSettings: (newSettings: TimerSettings) => void;
}

const SliderControl = ({ 
  label, 
  value, 
  min, 
  max, 
  mode,
  onChange
}: { 
  label: string, 
  value: number, 
  min: number, 
  max: number,
  mode: TimerMode,
  onChange: (mode: TimerMode, minutes: number) => void
}) => {
  // Convert seconds (prop) to minutes (local state)
  const propMinutes = Math.floor(value / 60);
  const [localValue, setLocalValue] = useState(propMinutes);

  // Sync local state if props change externally
  useEffect(() => {
    setLocalValue(propMinutes);
  }, [propMinutes]);

  const handleSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(parseInt(e.target.value));
  };

  const handleCommit = () => {
    // Only update the global state when the user is done interacting
    if (localValue !== propMinutes) {
      onChange(mode, localValue);
    }
  };

  return (
    <div className="bg-white border-3 border-black p-4 shadow-neo">
      <div className="flex justify-between items-end mb-2">
        <label className="font-display font-bold text-sm sm:text-base uppercase">{label}</label>
        <span className="font-mono font-bold text-lg bg-black text-white px-2">
          {localValue}m
        </span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        value={localValue}
        onChange={handleSlide}
        onPointerUp={handleCommit}
        onKeyUp={handleCommit}
        className="w-full h-4 bg-neo-offwhite border-2 border-black appearance-none cursor-pointer outline-none
          [&::-webkit-slider-thumb]:appearance-none 
          [&::-webkit-slider-thumb]:w-6 
          [&::-webkit-slider-thumb]:h-6 
          [&::-webkit-slider-thumb]:bg-neo-green 
          [&::-webkit-slider-thumb]:border-2 
          [&::-webkit-slider-thumb]:border-black 
          [&::-webkit-slider-thumb]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
          active:[&::-webkit-slider-thumb]:translate-x-[1px]
          active:[&::-webkit-slider-thumb]:translate-y-[1px]
          active:[&::-webkit-slider-thumb]:shadow-none
          hover:[&::-webkit-slider-thumb]:bg-neo-yellow
          
          [&::-moz-range-thumb]:appearance-none 
          [&::-moz-range-thumb]:w-6 
          [&::-moz-range-thumb]:h-6 
          [&::-moz-range-thumb]:bg-neo-green 
          [&::-moz-range-thumb]:border-2 
          [&::-moz-range-thumb]:border-black 
          [&::-moz-range-thumb]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] 
          active:[&::-moz-range-thumb]:translate-x-[1px]
          active:[&::-moz-range-thumb]:translate-y-[1px]
          active:[&::-moz-range-thumb]:shadow-none
          hover:[&::-moz-range-thumb]:bg-neo-yellow"
      />
      <div className="flex justify-between mt-1 text-xs font-mono text-gray-500">
        <span>{min}m</span>
        <span>{max}m</span>
      </div>
    </div>
  );
};

const SettingsView: React.FC<SettingsViewProps> = ({ settings, onUpdateSettings }) => {
  
  const handleChange = (mode: TimerMode, minutes: number) => {
    onUpdateSettings({
      ...settings,
      [mode]: minutes * 60,
    });
  };

  const handleToggle = (key: 'enableTickSound' | 'enableSessionEndSound') => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      onUpdateSettings({
        ...settings,
        [key]: event.target.checked,
      });
    };
  };

  return (
    <div className="flex flex-col h-full bg-neo-offwhite p-6 overflow-y-auto">
      <div className="mb-6 text-center">
        <h2 className="font-display font-bold text-2xl uppercase tracking-wider mb-1">Config</h2>
        <div className="w-16 h-1 bg-black mx-auto"></div>
      </div>

      <div className="space-y-6 max-w-sm mx-auto w-full pb-20">
        
        <SliderControl 
          label="Focus Time"
          mode={TimerMode.FOCUS}
          value={settings[TimerMode.FOCUS]}
          min={15}
          max={60}
          onChange={handleChange}
        />

        <SliderControl 
          label="Short Break"
          mode={TimerMode.SHORT_BREAK}
          value={settings[TimerMode.SHORT_BREAK]}
          min={5}
          max={10}
          onChange={handleChange}
        />

        <SliderControl 
          label="Long Break"
          mode={TimerMode.LONG_BREAK}
          value={settings[TimerMode.LONG_BREAK]}
          min={5}
          max={20}
          onChange={handleChange}
        />

        <div className="bg-white border-3 border-black p-4 shadow-neo space-y-3">
          <h3 className="font-display font-bold text-sm uppercase">Sound</h3>
          <label className="flex items-center justify-between gap-3 text-sm font-mono">
            <span>Tick sound</span>
            <input
              type="checkbox"
              checked={settings.enableTickSound}
              onChange={handleToggle('enableTickSound')}
              className="h-4 w-4 accent-neo-green"
            />
          </label>
          <label className="flex items-center justify-between gap-3 text-sm font-mono">
            <span>Session end sound</span>
            <input
              type="checkbox"
              checked={settings.enableSessionEndSound}
              onChange={handleToggle('enableSessionEndSound')}
              className="h-4 w-4 accent-neo-green"
            />
          </label>
        </div>

        <div className="bg-neo-yellow border-3 border-black p-4 text-xs font-mono mt-8">
          <p><strong>NOTE:</strong> Changes apply immediately to the timer if it is paused. If running, changes apply on reset or next session.</p>
        </div>

      </div>
    </div>
  );
};

export default SettingsView;
