// Simple synthesizer for app sounds
let audioContext: AudioContext | null = null;
let hasUnlocked = false;

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

export const unlockAudioContext = () => {
  const ctx = getContext();
  if (!ctx || hasUnlocked) return;

  try {
    const buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
    source.stop(0);
    hasUnlocked = true;
  } catch (e) {
    console.error("Audio unlock error", e);
  }
};

export const playTick = () => {
  try {
    const ctx = getContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.02), ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1800, now);
    bandpass.Q.setValueAtTime(1, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.08, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

    const clickOsc = ctx.createOscillator();
    clickOsc.type = 'sine';
    clickOsc.frequency.setValueAtTime(220, now);

    const clickGain = ctx.createGain();
    clickGain.gain.setValueAtTime(0.05, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    noise.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);

    noise.start(now);
    noise.stop(now + 0.02);
    clickOsc.start(now);
    clickOsc.stop(now + 0.03);
  } catch (e) {
    console.error("Audio playback error", e);
  }
};

export const playFocusEnd = () => {
  try {
    const ctx = getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 1.2;

    const carrierA = ctx.createOscillator();
    const carrierB = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    carrierA.type = 'square';
    carrierB.type = 'square';
    carrierA.frequency.setValueAtTime(880, now);
    carrierB.frequency.setValueAtTime(960, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(0.7, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(6, now);
    lfoGain.gain.setValueAtTime(0.12, now);

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    carrierA.connect(filter);
    carrierB.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    carrierA.start(now);
    carrierB.start(now);
    lfo.start(now);
    carrierA.stop(now + duration);
    carrierB.stop(now + duration);
    lfo.stop(now + duration);
  } catch (e) {
    console.error("Audio playback error", e);
  }
};

export const playBreakEnd = () => {
  try {
    const ctx = getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 1.2;

    const carrierA = ctx.createOscillator();
    const carrierB = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    carrierA.type = 'square';
    carrierB.type = 'square';
    carrierA.frequency.setValueAtTime(880, now);
    carrierB.frequency.setValueAtTime(960, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.Q.setValueAtTime(0.7, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.14, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(6, now);
    lfoGain.gain.setValueAtTime(0.12, now);

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);

    carrierA.connect(filter);
    carrierB.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    carrierA.start(now);
    carrierB.start(now);
    lfo.start(now);
    carrierA.stop(now + duration);
    carrierB.stop(now + duration);
    lfo.stop(now + duration);
  } catch (e) {
    console.error("Audio playback error", e);
  }
};
