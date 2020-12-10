import { Context } from '../Context';
import { SavedTrack } from '../track/track';
import { AppThunk, AppDispatch } from './store';
import { create, deleteTrack, load, updateTrack } from './trackSlice';

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

export const updateTrackAsync = (track: SavedTrack) => async (dispatch: AppDispatch) => {
    await Context.get().database.updateTrack(track);
    dispatch(updateTrack({
        track: track
    }));
};

export const deleteTrackAsync = (id: string) => async (dispatch: AppDispatch) => {
    await Context.get().database.deleteTrack(id);
    dispatch(deleteTrack(id));
};