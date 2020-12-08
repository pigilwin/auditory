import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '../track/track';
import { CreateTrack } from '../track/events';
import { AppThunk, AppDispatch } from './store';
import { RootState } from './rootReducer';

export interface TrackState {
    tracks: Track[];
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
        createTrack(state, action: PayloadAction<CreateTrack>) {

        }
    }
});

export const reducer = trackSlice.reducer;

export const trackSelector = (state: RootState) => state.trackReducer;

export const createTrack = (): AppThunk => async (dispatch: AppDispatch) => {

};