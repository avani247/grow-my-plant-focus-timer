// Simple synthesizer for app sounds
let audioContext: AudioContext | null = null;

export const getContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  // Browsers require user interaction to resume audio context
  if (audioContext.state === 'suspended') {
    audioContext.resume().catch((e) => console.error("Could not resume audio context", e));
  }
  return audioContext;
};

export const playTick = () => {
  try {
    const ctx = getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // Subtle, mechanical tick (lower pitch than before)
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, ctx.currentTime); // Lower pitch 300Hz
    
    // Very short envelope for a "click" feel
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.error("Audio playback error", e);
  }
};

export const playFocusEnd = () => {
  try {
    const ctx = getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // "Victory" / Level Up Sound - 8-bit Square Wave
    osc.type = 'square';
    
    const now = ctx.currentTime;
    
    // Fast Ascending Arpeggio (C Major: C5 - E5 - G5 - C6)
    osc.frequency.setValueAtTime(523.25, now);       // C5
    osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
    osc.frequency.setValueAtTime(1046.50, now + 0.3);// C6

    // Volume Envelope
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.3);
    gain.gain.linearRampToValueAtTime(0, now + 0.6);

    osc.start(now);
    osc.stop(now + 0.6);
  } catch (e) {
    console.error("Audio playback error", e);
  }
};

export const playBreakEnd = () => {
  try {
    const ctx = getContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    // "Back to Work" / Alert Sound - Sawtooth Wave
    osc.type = 'sawtooth';
    
    const now = ctx.currentTime;
    
    // Double Beep (Low A3)
    // First Beep
    osc.frequency.setValueAtTime(220, now);
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.2);
    
    // Silence/Gap is naturally created by the envelope dropping to 0
    
    // Second Beep
    osc.frequency.setValueAtTime(220, now + 0.3);
    gain.gain.setValueAtTime(0.1, now + 0.3);
    gain.gain.linearRampToValueAtTime(0, now + 0.5);

    osc.start(now);
    osc.stop(now + 0.5);
  } catch (e) {
    console.error("Audio playback error", e);
  }
};