import React, { useState } from 'react';
import { MusicCategory } from '../types';
import { MUSIC_TRACKS, YOUTUBE_TRACKS } from '../constants';
import { useMusicPlayer } from '../hooks/useMusicPlayer';

const CATEGORIES = [
  { id: MusicCategory.NOISE, label: 'NOISE' },
  { id: MusicCategory.NATURE, label: 'NATURE' },
  { id: MusicCategory.MUSIC, label: 'MUSIC' },
  { id: MusicCategory.YOUTUBE, label: 'YOUTUBE' },
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
  const [activeYoutubeId, setActiveYoutubeId] = useState<string | null>(null);
  const { currentTrack, isPlaying, playTrack, stopAll } = useMusicPlayer();

  const filteredTracks = MUSIC_TRACKS.filter(track => track.category === activeCategory);
  const isYoutubeTab = activeCategory === MusicCategory.YOUTUBE;

  return (
    <div className="flex flex-col h-full bg-neo-offwhite">
      
      {/* Category Tabs */}
      <div className="flex flex-wrap border-b-3 border-black bg-white sticky top-0 z-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              if (cat.id === MusicCategory.YOUTUBE) {
                stopAll();
              }
            }}
            className={`
              flex-1 min-w-[120px] sm:min-w-0 py-4 font-display font-bold text-xs sm:text-sm uppercase tracking-wider
              border-r-3 border-black last:border-r-0 transition-colors
              ${activeCategory === cat.id ? 'bg-neo-yellow' : 'bg-white hover:bg-gray-100'}
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {isYoutubeTab ? (
        <div className="p-6 flex flex-col gap-6 overflow-y-auto pb-20">
          <div className="grid grid-cols-1 gap-6">
            {YOUTUBE_TRACKS.map((track) => {
              const isActive = activeYoutubeId === track.videoId;
              return (
                <div
                  key={track.id}
                  className={`
                    group relative flex flex-col overflow-hidden border-3 border-black shadow-neo text-left bg-white
                  `}
                >
                  <div className="relative w-full bg-black aspect-video">
                    {isActive ? (
                      <>
                        <iframe
                          title={track.title}
                          className="absolute inset-0 h-full w-full"
                          src={`https://www.youtube.com/embed/${track.videoId}?autoplay=1&rel=0&playsinline=1`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                        <button
                          type="button"
                          onClick={() => {
                            stopAll();
                            setActiveYoutubeId(null);
                          }}
                          className="absolute right-2 top-2 rounded-full bg-black/70 p-2 text-white transition hover:bg-black"
                          aria-label={`Close ${track.title}`}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <img
                          src={track.thumbnailUrl}
                          alt={track.title}
                          className="absolute inset-0 h-full w-full object-cover"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            stopAll();
                            setActiveYoutubeId(track.videoId);
                          }}
                          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity group-hover:bg-black/30"
                          aria-label={`Play ${track.title}`}
                        >
                          <svg width="56" height="56" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  <div className="p-3">
                    <span className="font-display font-bold text-xs sm:text-sm uppercase">
                      {track.title}
                    </span>
                  </div>
                </div>
              );
            })}
            {YOUTUBE_TRACKS.length === 0 && (
              <div className="col-span-1 text-center py-10 opacity-50 font-display">
                NO VIDEOS FOUND
              </div>
            )}
          </div>
        </div>
      ) : (
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
      )}

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
