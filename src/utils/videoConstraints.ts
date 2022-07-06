export const videoConstraints = {
  video: {
    cursor: "always",
    width: { ideal: 1920 },
    height: { ideal: 1080 },
    aspectRatio: 1.777777778,
    frameRate: 30,
  },
  audio: {
    sampleSize: 16,
    channelCount: 2,
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: 44100,
  },
};