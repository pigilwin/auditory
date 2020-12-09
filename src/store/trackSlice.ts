import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedTrack } from '../track/track';
import { RootState } from './rootReducer';

export interface TrackState {
    tracks: SavedTrack[];
    currentTrackId: string;
}

const initialState: TrackState =  {
    tracks: [],
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
            newState.tracks.push(action.payload.track);
            return newState;
        }
    }
});

interface CreateTrack {
    track: SavedTrack;
}

interface LoadTracks {
    tracks: SavedTrack[];
}

export const reducer = trackSlice.reducer;
export const { create, load, loadTrack} = trackSlice.actions;
export const trackSelector = (state: RootState) => state.trackReducer;