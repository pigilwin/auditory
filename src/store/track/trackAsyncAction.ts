import { v4 } from 'uuid';
import { deepCopy } from '../../lib/deepClone';
import { SavedTrack } from './trackTypes';
import { RootStateHook } from '../rootReducer';
import { AppThunk, AppDispatch } from '../store';
import {
    unselectNote, 
    updateTrack,
    closeCreateLayer
} from './trackSlice';
import { TrackDatabase } from './trackDatabase';

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
        loop: loop,
        muted: false
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