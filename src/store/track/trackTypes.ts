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
    loop: boolean;
}
export interface LayerMap {
    [id: string]: Layer;
}

export interface LayerPart {
    id: string;
}

export interface TrackState {
    tracks: SavedTrackMap;
    current: {
        trackId: string;
        selectedLayer: string;
        selectedNote: {
            index: number;
            layerId: string;
        },
        addingLayer: boolean;
    }
    isPlaying: boolean;
}

export type Current = TrackState['current'];
export type SelectedNote = Current['selectedNote'];
export type SelectedLayer = Current['selectedLayer'];