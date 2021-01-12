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
interface Sound {
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
}

export type Current = TrackState['current'];
export type SelectedNote = Current['selectedNote'];
export type SelectedLayer = Current['selectedLayer'];