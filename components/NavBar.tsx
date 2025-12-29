import React from 'react';
import { AppView } from '../types';

interface NavBarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const NavBar: React.FC<NavBarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.TIMER, label: 'TIMER' },
    { id: AppView.MUSIC, label: 'MUSIC' },
    { id: AppView.SETTINGS, label: 'CONFIG' },
  ];

  return (
    <nav className="w-full border-t-3 border-black bg-neo-offwhite flex">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`
              flex-1 py-4 text-xs sm:text-sm font-bold tracking-wider border-black transition-all font-display uppercase
              ${index !== navItems.length - 1 ? 'border-r-3' : ''}
              ${currentView === item.id 
                ? 'bg-black text-neo-white' 
                : 'bg-neo-white text-black hover:bg-neo-yellow'}
            `}
          >
            {item.label}
          </button>
        ))}
    </nav>
  );
};

export default NavBar;