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
    Sampler,
    Synth
} from "tone";
import { Instrument } from "tone/build/esm/instrument/Instrument";

const idToSynthMap: Synths = {
    'AMSynth': {
        name: 'AM',
        synth: new AMSynth()
    },
    'DuoSynth': {
        name: 'Duo',
        synth: new DuoSynth(),   
    },
    'FMSynth': {
        name: 'FM',
        synth: new FMSynth()
    },
    'MembraneSynth': {
        name: 'Membrane',
        synth: new MembraneSynth()
    },
    'MetalSynth': {
        name: 'Metal',
        synth: new MetalSynth()
    },
    'MonoSynth': {
        name: 'Mono',
        synth: new MonoSynth()
    },
    'NoiseSynth': {
        name: 'Noise',
        synth: new NoiseSynth(),
    },
    'PluckSynth': {
        name: 'Pluck',
        synth: new PluckSynth()
    },
    'PolySynth': {
        name: 'Poly',
        synth: new PolySynth()
    },
    'Sampler': {
        name: 'Sampler',
        synth: new Sampler(),
    },
    'Synth': {
        name: 'Synth',
        synth: new Synth()
    }
};

type AnyInstrument = Instrument<any>;

export const fetchSynthObject = (id: string): AnyInstrument  => {
    
    if (idToSynthMap[id] === undefined) {
        throw new Error('id ' + id + ' is not a valid synth');
    }
    return idToSynthMap[id].synth;
}

export const fetchSynthName = (id: string): string  => {
    
    if (idToSynthMap[id] === undefined) {
        throw new Error('id ' + id + ' is not a valid synth');
    }
    return idToSynthMap[id].name;
}

interface Synths {
    [id: string]: {
        name: string;
        synth: AnyInstrument;
    }
}