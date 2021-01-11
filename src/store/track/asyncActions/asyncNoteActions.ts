import { deepCopy } from "../../../lib/deepClone";
import { RootStateHook } from "../../rootReducer";
import { AppDispatch, AppThunk } from "../../store";
import { TrackDatabase } from "../trackDatabase";
import { fetchTrack, unselectNote, updateTrack } from "../trackSlice";

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