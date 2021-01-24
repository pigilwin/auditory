export interface SavedTrackMap {
    [id: string]: SavedTrack;
}

export interface SavedTrack {
    id: string;
    name: string;
    date: string;
    layers: LayerMap;
    control: {
        panner: number;
        volume: number;
        bpm: string;
    }
}
interface LayerMap {
    [id: string]: Layer;
}
export interface Layer {
    sounds: Sound[];
    synth: string;
    loop: boolean;
    muted: boolean;
}
export interface Sound {
    id: string;
    duration: number;

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
    edittingSettings: boolean;
}

export type Current = TrackState['current'];
export type SelectedNote = Current['selectedNote'];
export type SelectedLayer = Current['selectedLayer'];