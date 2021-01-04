import { v4 } from 'uuid';
import { Context } from '../../lib/Context';
import { deepCopy } from '../../lib/deepClone';
import { SavedTrack } from './trackTypes';
import { RootStateHook } from '../rootReducer';
import { AppThunk, AppDispatch } from '../store';
import { 
    createTrack, 
    deleteTrack, 
    loadTracks, 
    unselectNote, 
    updateTrack,
    closeCreateLayer
} from './trackSlice';

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
    const track = deepCopy(fetchTrack(getState, trackId));
    track.control.volume = volume;
    await Context.get().database.updateTrack(track);
    dispatch(updateTrack({
        track: track
    }));
};

export const updatePannerAsync = (panner: number, trackId: string): AppThunk => async (dispatch: AppDispatch, getState: RootStateHook) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    track.control.panner = panner;
    await Context.get().database.updateTrack(track);
    dispatch(updateTrack({
        track: track
    }));
};

export const deleteTrackAsync = (id: string): AppThunk => async (dispatch: AppDispatch) => {
    await Context.get().database.deleteTrack(id);
    dispatch(deleteTrack(id));
};


export const addLayerAsync = (trackId: string, synth: string, loop: boolean): AppThunk => async (dispatch: AppDispatch, getState: RootStateHook) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    track.layers[v4()] = {
        sounds: [],
        synth: synth,
        loop: loop
    };
    await Context.get().database.updateTrack(track);
    dispatch(closeCreateLayer());
    dispatch(updateTrack({
        track: track
    }));
};

export const deleteLayerAsync = (layerId: string, trackId: string): AppThunk => async (dispatch: AppDispatch, getState: RootStateHook) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    delete track.layers[layerId];
    await Context.get().database.updateTrack(track);
    dispatch(updateTrack({
        track: track
    }));
};

export const addSoundAsync = (soundId: string, layerId: string, trackId: string): AppThunk => async (dispatch: AppDispatch, getState: RootStateHook) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    track.layers[layerId].sounds.push({
        id: soundId
    });
    await Context.get().database.updateTrack(track);
    dispatch(updateTrack({
        track: track
    }));
};

export const deleteNoteAsync = (index: number, layerId: string, trackId: string): AppThunk => async (dispatch: AppDispatch, getState: RootStateHook) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    track.layers[layerId].sounds.splice(index, 1);
    await Context.get().database.updateTrack(track);
    dispatch(unselectNote());
    dispatch(updateTrack({
        track: track
    }));
};


const fetchTrack = (getStateHook: RootStateHook, trackId: string): SavedTrack => {
    const currentTracks = getStateHook().trackReducer.tracks;
    return Object.assign({}, currentTracks[trackId]);
}