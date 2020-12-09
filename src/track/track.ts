export interface SavedTrack {
    id: string;
    name: string;
    date: string;
    parts: string[]
    panner: number;
    volume: number;
    looping: boolean;
}

export const fetchTrackFromState = (tracks: SavedTrack[], id: string): SavedTrack | null => {
    const value: SavedTrack | undefined = tracks.find(track => track.id === id);
    if (value === undefined) {
        return null;
    }
    return value;
};