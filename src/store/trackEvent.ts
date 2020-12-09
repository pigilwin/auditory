import { Context } from '../Context';
import { AppThunk, AppDispatch } from './store';
import { create, load } from './trackSlice';

export const createTrack = (name: string): AppThunk => async (dispatch: AppDispatch) => {
    const track = await Context.get().database.createTrack(name);
    dispatch(create({
        track: track
    }));
};

export const loadTracks = (): AppThunk => async (dispatch: AppDispatch) => {
    const tracks = await Context.get().database.read();
    dispatch(load({
        tracks: tracks
    }));
};