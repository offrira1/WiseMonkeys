// Sound utility for game audio effects using Web Audio API
class SoundManager {
  constructor() {
    this.audioContext = null;
    this.isEnabled = true;
    this.volume = 0.7;
    this.initAudioContext();
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (error) {
      console.log('Web Audio API not supported:', error);
    }
  }

  // Generate a simple beep sound
  generateBeep(frequency, duration, type = 'sine') {
    if (!this.audioContext || !this.isEnabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Generate a more complex sound with multiple frequencies
  generateChord(frequencies, duration) {
    if (!this.audioContext || !this.isEnabled) return;

    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.generateBeep(freq, duration * 0.8, 'sine');
      }, index * 50);
    });
  }

  // Play skip sound (low, short beep)
  playSkip() {
    this.generateBeep(200, 0.2, 'square');
  }

  // Play correct sound (high, pleasant ding)
  playCorrect() {
    this.generateChord([800, 1000, 1200], 0.5);
  }

  // Play time up sound (monkey crying - descending sad sound)
  playTimeUp() {
    // Create a sad, descending sound
    const frequencies = [600, 500, 400, 300, 200];
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.generateBeep(freq, 0.3, 'sawtooth');
      }, index * 200);
    });
  }

  // Play start sound (upward, positive sound)
  playStart() {
    this.generateChord([400, 600, 800], 0.8);
  }

  // Play end sound (final, conclusive sound)
  playEnd() {
    this.generateChord([300, 400, 500, 600], 1.0);
  }

  // Generic play method
  play(soundName) {
    switch (soundName) {
      case 'skip':
        this.playSkip();
        break;
      case 'correct':
        this.playCorrect();
        break;
      case 'timeUp':
        this.playTimeUp();
        break;
      case 'start':
        this.playStart();
        break;
      case 'end':
        this.playEnd();
        break;
      default:
        console.log(`Unknown sound: ${soundName}`);
    }
  }

  setEnabled(enabled) {
    this.isEnabled = enabled;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  isSoundEnabled() {
    return this.isEnabled;
  }

  // Resume audio context if suspended (required for some browsers)
  resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// Create a singleton instance
const soundManager = new SoundManager();

export default soundManager;
