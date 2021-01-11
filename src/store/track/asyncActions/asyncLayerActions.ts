import { v4 } from "uuid";
import { deepCopy } from "../../../lib/deepClone";
import { RootStateHook } from "../../rootReducer";
import { AppDispatch, AppThunk } from "../../store";
import { TrackDatabase } from "../trackDatabase";
import { closeCreateLayer, fetchTrack, unselectNote, updateTrack } from "../trackSlice";

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
    dispatch(unselectNote());
    dispatch(updateTrack(track));
}

export const toggleMuteLayerAsync = (
    layerId: string,
    trackId: string,
    muted: boolean
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const track = deepCopy(fetchTrack(getState, trackId));
    track.layers[layerId].muted = muted;
    await TrackDatabase.updateTrack(track);
    dispatch(updateTrack(track));
}