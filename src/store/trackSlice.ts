import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track, CreateTrack } from '../track/track';
import { AppThunk, AppDispatch } from './store';

const initialState: Track[] = [];

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        createTrack(state, action: PayloadAction<CreateTrack>) {

        }
    }
});

export const reducer = trackSlice.reducer;

export const createTrack = (): AppThunk => async (dispatch: AppDispatch) => {

};