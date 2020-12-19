import { ToneAudioNode } from "tone";

export interface PossibleSynths {
    [id: string]: ToneAudioNode;
}

export const AMSynth: string = 'AMSynth';
export const DuoSynth: string = 'DuoSynth';
export const FMSynth: string = 'FMSynth';
export const Instrument: string = 'Instrument';
export const MembraneSynth: string = 'MembraneSynth';
export const MetalSynth: string = 'MetalSynth';
export const MonoSynth: string = 'MonoSynth';
export const Monophonic: string = 'Monophonic';
export const NoiseSynth: string = 'NoiseSynth';
export const PluckSynth: string = 'PluckSynth';
export const PolySynth: string = 'PolySynth';
export const Sampler: string = 'Sampler';
export const Synth: string = 'Synth';