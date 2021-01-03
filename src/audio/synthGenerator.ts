import { 
    AMSynth, 
    DuoSynth,
    FMSynth,
    MembraneSynth,
    MetalSynth,
    MonoSynth,
    NoiseSynth,
    PluckSynth,
    PolySynth,
    Synth
} from "tone";

export const idToSynthMap: Synths = {
    'AMSynth': {
        name: 'AM',
        synth: AMSynth
    },
    'DuoSynth': {
        name: 'Duo',
        synth: DuoSynth,   
    },
    'FMSynth': {
        name: 'FM',
        synth: FMSynth
    },
    'MembraneSynth': {
        name: 'Membrane',
        synth: MembraneSynth
    },
    'MetalSynth': {
        name: 'Metal',
        synth: MetalSynth
    },
    'MonoSynth': {
        name: 'Mono',
        synth: MonoSynth,
    },
    'NoiseSynth': {
        name: 'Noise',
        synth: NoiseSynth,
    },
    'PluckSynth': {
        name: 'Pluck',
        synth: PluckSynth
    },
    'Synth': {
        name: 'Synth',
        synth: Synth
    }
};

export const fetchSynthObject = (id: string): PolySynth  => {
    
    if (idToSynthMap[id] === undefined) {
        throw new Error('id ' + id + ' is not a valid synth');
    }
    return new PolySynth(idToSynthMap[id].synth);
}

export const fetchSynthName = (id: string): string  => {
    
    if (idToSynthMap[id] === undefined) {
        throw new Error('id ' + id + ' is not a valid synth');
    }
    return idToSynthMap[id].name;
}

/**
 * Not a massive issue using any here, 
 * if tone exports VoiceConstructor at 
 * some point then we will use it
 */
interface Synths {
    [id: string]: {
        name: string;
        synth: any;
    }
}