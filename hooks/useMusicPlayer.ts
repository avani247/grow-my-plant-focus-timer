import { useState, useRef, useEffect, useCallback } from 'react';
import { MusicTrack } from '../types';
import { createNoiseSource } from '../utils/noise';

export const useMusicPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs to hold audio instances
  const audioFileRef = useRef<HTMLAudioElement | null>(null);
  const synthSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);

  const stopAll = useCallback(() => {
    // Stop File Audio
    if (audioFileRef.current) {
      audioFileRef.current.pause();
      audioFileRef.current.currentTime = 0;
    }

    // Stop Synth Audio
    if (synthSourceRef.current) {
      try {
        synthSourceRef.current.stop();
        synthSourceRef.current.disconnect();
      } catch (e) {
        // Ignore errors if already stopped
      }
      synthSourceRef.current = null;
    }
    
    if (synthGainRef.current) {
      synthGainRef.current.disconnect();
      synthGainRef.current = null;
    }

    setIsPlaying(false);
  }, []);

  const playTrack = useCallback((track: MusicTrack) => {
    // If clicking the same track that is already playing, pause it.
    if (currentTrack?.id === track.id && isPlaying) {
      if (track.type === 'FILE' && audioFileRef.current) {
        audioFileRef.current.pause();
      } else if (track.type === 'SYNTH') {
        // For synth, we actually have to stop and recreate it later to "pause", 
        // or just mute gain. For simplicity, we stop.
        stopAll();
        setIsPlaying(false);
        return;
      }
      setIsPlaying(false);
      return;
    }

    // If clicking same track but it was paused
    if (currentTrack?.id === track.id && !isPlaying) {
        if (track.type === 'FILE' && audioFileRef.current) {
            audioFileRef.current.play().catch(e => console.error("Play error", e));
            setIsPlaying(true);
            return;
        }
        // For synth, we stopped it completely, so we fall through to restart logic
    }

    // Changing tracks or starting fresh
    stopAll();
    setCurrentTrack(track);

    if (track.type === 'FILE') {
      const audio = new Audio(track.src);
      audio.loop = true; // IMPORTANT: Auto-restart when ends
      audio.volume = 0.7;
      audio.preload = 'auto';
      audio.crossOrigin = 'anonymous';
      audioFileRef.current = audio;
      
      // Handle loading errors for files
      audio.onerror = () => {
        console.error(`Failed to load audio: ${track.src}`);
        setIsPlaying(false);
        alert(`Could not play ${track.title}. Is the file present?`);
      };

      const startPlayback = () => {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(e => {
          console.error("Playback failed", e);
          setIsPlaying(false);
        });
      };

      if (audio.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
        startPlayback();
      } else {
        audio.addEventListener('canplaythrough', startPlayback, { once: true });
        audio.load();
      }
    } else if (track.type === 'SYNTH') {
      const noiseType = track.src as 'WHITE' | 'PINK' | 'BROWN';
      const result = createNoiseSource(noiseType);
      if (result) {
        synthSourceRef.current = result.source;
        synthGainRef.current = result.gainNode;
        result.source.start();
        setIsPlaying(true);
      }
    }
  }, [currentTrack, isPlaying, stopAll]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAll();
    };
  }, [stopAll]);

  return {
    currentTrack,
    isPlaying,
    playTrack,
    stopAll
  };
};
