export interface SavedTrackMap {
    [id: string]: SavedTrack;
}

export interface SavedTrack {
    id: string;
    name: string;
    date: string;
    layers: LayerMap;
    control: Control;
}

interface Control {
    panner: number;
    volume: number;
}
export interface Layer {
    sounds: LayerPart[];
    synth: string;
}
export interface LayerMap {
    [id: string]: Layer;
}

export interface LayerPart {
    id: string;
}