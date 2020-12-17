interface SoundMap {
  [id: string]: Sound;
}

interface Sound {
  name: string;
  toneCode: string;
}

const sounds: SoundMap = {
  "note-A": { 
    name: "A", 
    toneCode: 'A'
  },
  "note-A#": { 
    name: "A#",
    toneCode: 'A#'
  },
  "note-B": { 
    name: "B", 
    toneCode: 'B'
  },
  "note-C": { 
    name: "C", 
    toneCode: 'C'
  },
  "note-C#": { 
    name: "C#", 
    toneCode: "C#"
  },
  "note-D": { 
    name: "D", 
    toneCode: "D"
  },
  "note-D#": { 
    name: "D#", 
    toneCode: "D#"
  },
  "note-E": { 
    name: "E", 
    toneCode: 'E'
  },
  "note-F": { 
    name: "F", 
    toneCode: 'F'
  },
  "note-F#": { 
    name: "F#", 
    toneCode: 'F#'
  },
  "note-G": { 
    name: "G", 
    toneCode: 'G' 
  },
  "note-G#": { 
    name: "G#", 
    toneCode: 'G#'
  },
  "drum-snare": {
    name: 'Snare',
    toneCode: ''
  },
  "drum-kick": {
    name: 'Kick',
    toneCode: ''
  },
  "empty-space": {
    name: 'Empty',
    toneCode: ''
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

export const getToneCode = (id: string): string => {

  if (sounds[id] === undefined) {
    return '';
  }

  return sounds[id].toneCode;
};