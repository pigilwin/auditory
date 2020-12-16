interface SoundMap {
  [id: string]: Sound;
}

interface Sound {
  name: string;
  frequency: number;
}

const sounds: SoundMap = {
  "note-A": { 
    name: "A", 
    frequency: 440.0 
  },
  "note-A#": { 
    name: "A#", 
    frequency: 466.16
  },
  "note-B": { 
    name: "B", 
    frequency: 493.88
  },
  "note-C": { 
    name: "C", 
    frequency: 261.63
  },
  "note-C#": { 
    name: "C#", 
    frequency: 277.18
  },
  "note-D": { 
    name: "D", 
    frequency: 293.66
  },
  "note-D#": { 
    name: "D#", 
    frequency: 311.13
  },
  "note-E": { 
    name: "E", 
    frequency: 329.63 
  },
  "note-F": { 
    name: "F", 
    frequency: 349.23 
  },
  "note-F#": { 
    name: "F#", 
    frequency: 369.99 
  },
  "note-G": { 
    name: "G", 
    frequency: 392.0 
  },
  "note-G#": { 
    name: "G#", 
    frequency: 415.3
  },
  "drum-snare": {
    name: 'Snare',
    frequency: 0
  },
  "drum-kick": {
    name: 'Kick',
    frequency: 0
  }
};

export interface SoundForDisplay {
  [id: string]: string;
}

export const getSoundsForDisplay = (): SoundForDisplay => {
  const soundsForDisplay: SoundForDisplay = {};
  
  for (const key in sounds) {
    soundsForDisplay[key] = sounds[key].name;
  }

  return soundsForDisplay;
};

export const getName = (id: string): string | null => {
  if (sounds[id] === undefined) {
    return null;
  }

  return sounds[id].name;
}

export const getFrequency = (id: string): number | null => {

  if (sounds[id] === undefined) {
    return null;
  }

  return sounds[id].frequency;
};