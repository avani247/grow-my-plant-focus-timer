import { TimerMode, MusicCategory, MusicTrack, TimerSettings } from './types';

// Default Durations in seconds
export const DEFAULT_SETTINGS: TimerSettings = {
  [TimerMode.FOCUS]: 25 * 60,
  [TimerMode.SHORT_BREAK]: 5 * 60,
  [TimerMode.LONG_BREAK]: 15 * 60,
  enableTickSound: true,
  enableSessionEndSound: true,
};

export const TOTAL_SESSIONS_BEFORE_LONG_BREAK = 4;

const audioUrl = (filename: string) => new URL(`./audio/${filename}`, import.meta.url).href;

export const MUSIC_TRACKS: MusicTrack[] = [
  // Category 1: Noise (Synthesized)
  { id: 'white-noise', title: 'White Noise', category: MusicCategory.NOISE, src: audioUrl('white-noise-trimmer.mp3'), type: 'FILE' },
  { id: 'pink-noise', title: 'Pink Noise', category: MusicCategory.NOISE, src: audioUrl('low-pink-noise-434732.mp3'), type: 'FILE' },
  { id: 'brown-noise', title: 'Brown Noise', category: MusicCategory.NOISE, src: audioUrl('soft-brown-noise.mp3'), type: 'FILE' },

  // Category 2: Nature (Files - Using CDN for demo purposes)
  { id: 'rain', title: 'Rain', category: MusicCategory.NATURE, src: audioUrl('gentle-rain-01-437305.mp3'), type: 'FILE' },
  { id: 'wind', title: 'Wind', category: MusicCategory.NATURE, src: audioUrl('wind-18030.mp3'), type: 'FILE' },
  { id: 'waves', title: 'Waves', category: MusicCategory.NATURE, src: audioUrl('sounds-of-waves-313367.mp3'), type: 'FILE' },
  { id: 'forest', title: 'Forest', category: MusicCategory.NATURE, src: audioUrl('forest-sounds-259933.mp3'), type: 'FILE' },

  // Category 3: Music (Files - Using CDN for demo purposes)
  { id: 'lofi', title: 'Lo-Fi', category: MusicCategory.MUSIC, src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3', type: 'FILE' },
  { id: 'classical', title: 'Piano', category: MusicCategory.MUSIC, src: audioUrl('soft-piano-inspiration-399920.mp3'), type: 'FILE' },
  { id: 'jazz', title: 'Jazz', category: MusicCategory.MUSIC, src: 'https://cdn.pixabay.com/download/audio/2022/01/12/audio_45fdf98d5b.mp3', type: 'FILE' },
];
