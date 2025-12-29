import { getContext } from './sound';

// Creates a buffer filled with noise
const createNoiseBuffer = (ctx: AudioContext, type: 'WHITE' | 'PINK' | 'BROWN'): AudioBuffer => {
  const bufferSize = 2 * ctx.sampleRate; // 2 seconds buffer
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);

  if (type === 'WHITE') {
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
  } else if (type === 'PINK') {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11; // (roughly) compensate for gain
      b6 = white * 0.115926;
    }
  } else if (type === 'BROWN') {
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // (roughly) compensate for gain
    }
  }

  return buffer;
};

// Returns a source node that plays the noise in a loop
export const createNoiseSource = (type: 'WHITE' | 'PINK' | 'BROWN') => {
  const ctx = getContext();
  if (!ctx) return null;

  const buffer = createNoiseBuffer(ctx, type);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  
  // Create a gain node for volume control (Noise can be loud)
  const gainNode = ctx.createGain();
  // Set default volume slightly lower for comfort
  gainNode.gain.value = 0.3; 

  source.connect(gainNode);
  gainNode.connect(ctx.destination);

  return { source, gainNode, ctx };
};