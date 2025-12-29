export enum TimerMode {
  FOCUS = 'FOCUS',
  SHORT_BREAK = 'SHORT_BREAK',
  LONG_BREAK = 'LONG_BREAK',
}

export enum AppView {
  TIMER = 'TIMER',
  MUSIC = 'MUSIC',
  SETTINGS = 'SETTINGS',
}

export interface TimerState {
  timeLeft: number;
  isActive: boolean;
  mode: TimerMode;
  sessionCount: number; // 1 to 4
}

export interface TimerSettings {
  [TimerMode.FOCUS]: number;
  [TimerMode.SHORT_BREAK]: number;
  [TimerMode.LONG_BREAK]: number;
  enableTickSound: boolean;
  enableSessionEndSound: boolean;
}

export enum MusicCategory {
  NOISE = 'NOISE',
  NATURE = 'NATURE',
  MUSIC = 'MUSIC',
}

export interface MusicTrack {
  id: string;
  title: string;
  category: MusicCategory;
  src: string; 
  type: 'SYNTH' | 'FILE';
}
