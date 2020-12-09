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

export const reducer = trackSlice.reducer;
export const { create } = trackSlice.actions;
export const trackSelector = (state: RootState) => state.trackReducer;