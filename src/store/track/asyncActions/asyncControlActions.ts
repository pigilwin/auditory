import { deepCopy } from "../../../lib/deepClone";
import { RootStateHook } from "../../rootReducer";
import { AppDispatch, AppThunk } from "../../store";
import { TrackDatabase } from "../trackDatabase";
import { fetchTrack, updateTrack } from "../trackSlice";

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