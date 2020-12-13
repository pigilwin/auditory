import { Context } from '../Context';
import { SavedTrack } from '../track/track';
import { RootStateHook } from './rootReducer';
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

export const updateVolumeAsync = (volume: number, trackId: string): AppThunk => async (dispatch: AppDispatch, getState: RootStateHook) => {
    const track = fetchTrack(getState, trackId);
    const control = Object.assign({}, track.control);
    control.volume = volume;
    track.control = control;
    await Context.get().database.updateTrack(track);
    dispatch(updateTrack({
        track: track
    }));
};

export const updatePannerAsync = (panner: number, trackId: string): AppThunk => async (dispatch: AppDispatch, getState: RootStateHook) => {
    const track = fetchTrack(getState, trackId);
    const control = Object.assign({}, track.control);
    control.panner = panner;
    track.control = control;
    await Context.get().database.updateTrack(track);
    dispatch(updateTrack({
        track: track
    }));
};

export const updateLoopingAsync = (looping: boolean, trackId: string): AppThunk => async (dispatch: AppDispatch, getState: RootStateHook) => {
    const track = fetchTrack(getState, trackId);
    const control = Object.assign({}, track.control);
    control.looping = looping;
    track.control = control;
    await Context.get().database.updateTrack(track);
    dispatch(updateTrack({
        track: track
    }));
};

export const deleteTrackAsync = (id: string): AppThunk => async (dispatch: AppDispatch) => {
    await Context.get().database.deleteTrack(id);
    dispatch(deleteTrack(id));
};


export const addSoundAsync = (soundId: string, layerId: string, trackId: string): AppThunk => async (dispatch: AppDispatch, getState: RootStateHook) => {
    const track = fetchTrack(getState, trackId);
    const layers = Object.assign({}, track.layers);
    const layer = Object.assign({}, layers[layerId]);
    layer.push({
        id: soundId
    });
    layers[layerId] = layer;
    track.layers = layers;
    await Context.get().database.updateTrack(track);
    dispatch(updateTrack({
        track: track
    }));
};


const fetchTrack = (getStateHook: RootStateHook, trackId: string): SavedTrack => {
    const currentTracks = getStateHook().trackReducer.tracks;
    return Object.assign({}, currentTracks[trackId]);
}