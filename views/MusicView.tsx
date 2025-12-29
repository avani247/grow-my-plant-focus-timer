import React, { useState } from 'react';
import { MusicCategory, MusicTrack } from '../types';
import { MUSIC_TRACKS } from '../constants';
import { useMusicPlayer } from '../hooks/useMusicPlayer';

const CATEGORIES = [
  { id: MusicCategory.NOISE, label: 'NOISE' },
  { id: MusicCategory.NATURE, label: 'NATURE' },
  { id: MusicCategory.MUSIC, label: 'MUSIC' },
];

const MusicIcon: React.FC<{ category: MusicCategory }> = ({ category }) => {
  if (category === MusicCategory.NOISE) {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 12h20M2 12l2-3m-2 3l2 3m16-3l-2-3m2 3l-2 3M6 9l2-3m0 6l-2 3m4-6l2-3m0 6l-2 3m4-6l2-3m0 6l-2 3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (category === MusicCategory.NATURE) {
    return (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeLinecap="round"/>
        <path d="M9 9h.01M15 9h.01" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    );
  }
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="6" cy="18" r="3" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="16" r="3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const MusicView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<MusicCategory>(MusicCategory.NOISE);
  const { currentTrack, isPlaying, playTrack } = useMusicPlayer();

  const filteredTracks = MUSIC_TRACKS.filter(track => track.category === activeCategory);

  return (
    <div className="flex flex-col h-full bg-neo-offwhite">
      
      {/* Category Tabs */}
      <div className="flex border-b-3 border-black bg-white sticky top-0 z-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              flex-1 py-4 font-display font-bold text-xs sm:text-sm uppercase tracking-wider
              border-r-3 border-black last:border-r-0 transition-colors
              ${activeCategory === cat.id ? 'bg-neo-yellow' : 'bg-white hover:bg-gray-100'}
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Track Grid */}
      <div className="p-6 grid grid-cols-2 gap-4 overflow-y-auto pb-20">
        {filteredTracks.map((track) => {
          const isCurrent = currentTrack?.id === track.id;
          const isTrackPlaying = isCurrent && isPlaying;

          return (
            <button
              key={track.id}
              onClick={() => playTrack(track)}
              className={`
                group relative aspect-square flex flex-col items-center justify-center
                border-3 border-black shadow-neo transition-all
                hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none
                ${isTrackPlaying ? 'bg-neo-green' : 'bg-white'}
              `}
            >
              {/* Icon */}
              <div className={`mb-3 transition-transform ${isTrackPlaying ? 'scale-110' : 'group-hover:scale-110'}`}>
                <MusicIcon category={track.category} />
              </div>

              {/* Title */}
              <span className="font-display font-bold text-xs sm:text-sm uppercase text-center px-2">
                {track.title}
              </span>

              {/* Status Indicator */}
              <div className="absolute top-2 right-2">
                {isTrackPlaying ? (
                  <div className="w-3 h-3 bg-black animate-bounce rounded-full"></div>
                ) : (
                   <div className="w-3 h-3 border-2 border-black rounded-full"></div>
                )}
              </div>
              
              {/* Play/Pause Overlay */}
              <div className={`
                absolute inset-0 bg-black/10 flex items-center justify-center transition-opacity
                ${isTrackPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
              `}>
                {isTrackPlaying ? (
                    // Pause Icon
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="black">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                ) : (
                    // Play Icon
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="black">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                )}
              </div>

            </button>
          );
        })}

        {filteredTracks.length === 0 && (
          <div className="col-span-2 text-center py-10 opacity-50 font-display">
            NO TRACKS FOUND
          </div>
        )}
      </div>

      {/* Now Playing Footer (Optional, mini player could go here) */}
      {currentTrack && isPlaying && (
        <div className="absolute bottom-4 left-4 right-4 bg-black text-white p-3 border-3 border-white shadow-lg flex items-center justify-between z-20 animate-slide-up">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-neo-green rounded-full animate-pulse"></div>
              <span className="font-display text-xs truncate max-w-[150px]">PLAYING: {currentTrack.title}</span>
           </div>
           <span className="font-mono text-xs">LOOP ON</span>
        </div>
      )}

    </div>
  );
};

export default MusicView;