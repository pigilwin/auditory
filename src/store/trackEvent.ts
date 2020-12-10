import { Context } from '../Context';
import { SavedTrack } from '../track/track';
import { AppThunk, AppDispatch } from './store';
import { createTrack, deleteTrack, loadTracks, updateTrack } from './trackSlice';

export const createTrackAsync = (name: string): AppThunk => async (dispatch: AppDispatch) => {
    const track = await Context.get().database.createTrack(name);
    dispatch(createTrack({
        track: track
    }));
};

export const loadTracksAsync = (): AppThunk => async (dispatch: AppDispatch) => {
    const tracks = await Context.get().database.read();
    dispatch(loadTracks({
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