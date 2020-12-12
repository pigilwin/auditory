interface Note {
    name: string,
    frequency: number
}

interface DrumInterface {
  name: string;
}

const notes: Note[] = [
  { name: "A", frequency: 440.0 },
  { name: "A#", frequency: 466.16 },
  { name: "B", frequency: 493.88 },
  { name: "C", frequency: 261.63 },
  { name: "C#", frequency: 277.18 },
  { name: "D", frequency: 293.66 },
  { name: "D#", frequency: 311.13 },
  { name: "E", frequency: 329.63 },
  { name: "F", frequency: 349.23 },
  { name: "F#", frequency: 369.99 },
  { name: "G", frequency: 392.0 },
  { name: "G#", frequency: 415.3 }
];

const drums: DrumInterface[] = [
  {name: 'Snare'},
  {name: 'Kick'}
];

export const getSoundsForDisplay = (): string[] => {
  const sounds: string[] = [];
  
  for (const note of notes) {
    sounds.push(note.name);
  }

  for (const drum of drums) {
    sounds.push(drum.name);
  }

  return sounds;
};