export interface SavedTrack {
    id: string;
    name: string;
    date: string;
    parts: string[]
    panner: number;
    volume: number;
    looping: boolean;
}