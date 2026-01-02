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

const WHITE_NOISE_AUDIO_URL = new URL('./audio/white-noise.mp3', import.meta.url).href;
const SOFT_BROWN_NOISE_AUDIO_URL = new URL('./audio/soft-brown-noise.mp3', import.meta.url).href;

export const MUSIC_TRACKS: MusicTrack[] = [
  // Category 1: Noise (Synthesized)
  { id: 'white-noise', title: 'White Noise', category: MusicCategory.NOISE, src: WHITE_NOISE_AUDIO_URL, type: 'FILE' },
  { id: 'pink-noise', title: 'Pink Noise', category: MusicCategory.NOISE, src: 'PINK_NOISE', type: 'SYNTH' },
  { id: 'brown-noise', title: 'Brown Noise', category: MusicCategory.NOISE, src: SOFT_BROWN_NOISE_AUDIO_URL, type: 'FILE' },

  // Category 2: Nature (Files - Using CDN for demo purposes)
  { id: 'rain', title: 'Rain', category: MusicCategory.NATURE, src: 'https://cdn.pixabay.com/download/audio/2022/07/04/audio_106f859582.mp3', type: 'FILE' },
  { id: 'wind', title: 'Wind', category: MusicCategory.NATURE, src: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3', type: 'FILE' },
  { id: 'waves', title: 'Waves', category: MusicCategory.NATURE, src: 'https://cdn.pixabay.com/download/audio/2021/08/09/audio_8ed41005eb.mp3', type: 'FILE' },
  { id: 'forest', title: 'Forest', category: MusicCategory.NATURE, src: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_472f7e85c1.mp3', type: 'FILE' },

  // Category 3: Music (Files - Using CDN for demo purposes)
  { id: 'lofi', title: 'Lo-Fi', category: MusicCategory.MUSIC, src: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3', type: 'FILE' },
  { id: 'classical', title: 'Piano', category: MusicCategory.MUSIC, src: 'https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3', type: 'FILE' },
  { id: 'jazz', title: 'Jazz', category: MusicCategory.MUSIC, src: 'https://cdn.pixabay.com/download/audio/2022/01/12/audio_45fdf98d5b.mp3', type: 'FILE' },
];
