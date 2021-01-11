import { v4 } from 'uuid';
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
import { TrackDatabase } from './trackDatabase';

export const createTrackAsync = (
    name: string
): AppThunk => async (
    dispatch: AppDispatch
) => {
    const track = await TrackDatabase.createTrack(name);
    dispatch(createTrack(track));
};

export const loadTracksAsync = (): AppThunk => async (
    dispatch: AppDispatch
) => {
    const tracks = await TrackDatabase.read();
    dispatch(loadTracks(tracks));
};

export const updateVolumeAsync = (
    volume: number, 
    trackId: string
): AppThunk => async (
    dispatch: AppDispatch, 
    getState: RootStateHook
) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    track.control.volume = volume;
    await TrackDatabase.updateTrack(track);
    dispatch(updateTrack(track));
};

export const updatePannerAsync = (
    panner: number, 
    trackId: string
): AppThunk => async (
    dispatch: AppDispatch, 
    getState: RootStateHook
) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    track.control.panner = panner;
    await TrackDatabase.updateTrack(track);
    dispatch(updateTrack(track));
};

export const deleteTrackAsync = (
    id: string
): AppThunk => async (
    dispatch: AppDispatch
) => {
    await TrackDatabase.deleteTrack(id);
    dispatch(deleteTrack(id));
};


export const addLayerAsync = (
    trackId: string, 
    synth: string, 
    loop: boolean
): AppThunk => async (
    dispatch: AppDispatch, 
    getState: RootStateHook
) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    track.layers[v4()] = {
        sounds: [],
        synth: synth,
        loop: loop
    };
    await TrackDatabase.updateTrack(track);
    dispatch(closeCreateLayer());
    dispatch(updateTrack(track));
};

export const editSynthForLayerAsync = (
    synthId: string, 
    layerId: string, 
    trackId: string
): AppThunk => async (dispatch: AppDispatch, getState: RootStateHook) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    track.layers[layerId].synth = synthId;
    await TrackDatabase.updateTrack(track);
    dispatch(updateTrack(track));
}

export const deleteLayerAsync = (
    layerId: string, 
    trackId: string
): AppThunk => async (
    dispatch: AppDispatch, 
    getState: RootStateHook
) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    delete track.layers[layerId];
    await TrackDatabase.updateTrack(track);
    dispatch(updateTrack(track));
};

export const addNoteAsync = (
    soundId: string, 
    layerId: string, 
    trackId: string
): AppThunk => async (
    dispatch: AppDispatch, 
    getState: RootStateHook
) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    track.layers[layerId].sounds.push({
        id: soundId
    });
    await TrackDatabase.updateTrack(track);
    dispatch(updateTrack(track));
};

export const deleteNoteAsync = (
    index: number, 
    layerId: string, 
    trackId: string
): AppThunk => async (
    dispatch: AppDispatch, 
    getState: RootStateHook
) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    track.layers[layerId].sounds.splice(index, 1);
    await TrackDatabase.updateTrack(track);
    dispatch(unselectNote());
    dispatch(updateTrack(track));
};


const fetchTrack = (getStateHook: RootStateHook, trackId: string): SavedTrack => {
    const currentTracks = getStateHook().trackReducer.tracks;
    return Object.assign({}, currentTracks[trackId]);
}