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
    looping: boolean;
}

interface LayerMap {
    [id: string]: Layer;
}

interface Layer {
    [id: string]: LayerPart;
}

interface LayerPart {
    note: string;
    type: number;
}