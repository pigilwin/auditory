import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedTrack, SavedTrackMap } from '../track/track';
import { RootState } from './rootReducer';

export interface TrackState {
    tracks: SavedTrackMap;
    currentTrackId: string;
}

const initialState: TrackState =  {
    tracks: {},
    currentTrackId: ''
};

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        load(state, action: PayloadAction<LoadTracks>) {
            const newState = state;
            newState.tracks = action.payload.tracks;
            return newState;
        },
        loadTrack(state, action: PayloadAction<string>) {
            const newState = state;
            newState.currentTrackId = action.payload;
            return newState;
        },
        create(state, action: PayloadAction<CreateTrack>) {
            const newState = state;
            newState.currentTrackId = action.payload.track.id;
            newState.tracks[action.payload.track.id] = action.payload.track;
            return newState;
        },
        updateControl(state, action: PayloadAction<UpdateControl>) {
            const newState = state;
            const id: string = action.payload.id;
            const track: SavedTrack = newState.tracks[id];
            track.looping = action.payload.looping;
            track.volume = action.payload.volume;
            track.panner = action.payload.panner;
            newState.tracks[id] = track;
            return newState;
        }
    }
});

interface CreateTrack {
    track: SavedTrack;
}

interface LoadTracks {
    tracks: SavedTrackMap;
}

interface UpdateControl {
    looping: boolean,
    panner: number,
    volume: number,
    id: string
}

export const reducer = trackSlice.reducer;
export const { create, load, loadTrack, updateControl} = trackSlice.actions;
export const trackSelector = (state: RootState) => state.trackReducer;