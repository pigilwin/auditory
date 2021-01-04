interface SoundMap {
  [id: string]: Sound;
}

interface Sound {
  name: string;
  toneCode: string | null;
}

const sounds: SoundMap = {
  "note-A-one": {
    name: 'A1',
    toneCode: 'A1'
  },
  "note-A-two": {
    name: 'A2',
    toneCode: 'A2'
  },
  "note-A-three": {
    name: 'A3',
    toneCode: 'A3'
  },
  "note-A-four": { 
    name: "A4", 
    toneCode: 'A4'
  },
  "note-B-one": { 
    name: "B1", 
    toneCode: 'B1'
  },
  "note-B-two": { 
    name: "B2", 
    toneCode: 'B2'
  },
  "note-B-three": { 
    name: "B3", 
    toneCode: 'B3'
  },
  "note-B-four": { 
    name: "B4", 
    toneCode: 'B4'
  },
  "note-C-one": { 
    name: "C1", 
    toneCode: 'C1'
  },
  "note-C-two": { 
    name: "C2", 
    toneCode: 'C2'
  },
  "note-C-three": { 
    name: "C3", 
    toneCode: 'C3'
  },
  "note-C-four": { 
    name: "C4", 
    toneCode: 'C4'
  },
  "note-D-one": { 
    name: "D1", 
    toneCode: 'D1'
  },
  "note-D-two": { 
    name: "D2", 
    toneCode: 'D2'
  },
  "note-D-three": { 
    name: "D3", 
    toneCode: 'D3'
  },
  "note-D-four": { 
    name: "D4", 
    toneCode: 'D4'
  },
  "note-E-one": { 
    name: "E1", 
    toneCode: 'E1'
  },
  "note-E-two": { 
    name: "E2", 
    toneCode: 'E2'
  },
  "note-E-three": { 
    name: "E3", 
    toneCode: 'E3'
  },
  "note-E-four": { 
    name: "E4", 
    toneCode: 'E4'
  },
  "note-F-one": { 
    name: "F1", 
    toneCode: 'F1'
  },
  "note-F-two": { 
    name: "F2", 
    toneCode: 'F2'
  },
  "note-F-three": { 
    name: "F3", 
    toneCode: 'F3'
  },
  "note-F-four": { 
    name: "F4", 
    toneCode: 'F4'
  },
  "note-G-one": { 
    name: "G1", 
    toneCode: 'G1'
  },
  "note-G-two": { 
    name: "G2", 
    toneCode: 'G2'
  },
  "note-G-three": { 
    name: "G3", 
    toneCode: 'G3'
  },
  "note-G-four": { 
    name: "G4", 
    toneCode: 'G4'
  },
  "empty-space": {
    name: 'Empty',
    toneCode: null
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

export const getToneCode = (id: string): string | null => {

  if (sounds[id] === undefined) {
    return null;
  }

  return sounds[id].toneCode;
};