import { deepCopy } from "../../../lib/deepClone";
import { RootStateHook } from "../../rootReducer";
import { AppDispatch, AppThunk } from "../../store";
import { TrackDatabase } from "../trackDatabase";
import { fetchTrack, updateTrack } from "../trackSlice";
import { Control, WithTrackId } from "../trackTypes";

export const updateSettingsAsync = (
    payload: WithTrackId<Control>
): AppThunk => async (
    dispatch: AppDispatch,
    getState: RootStateHook
) => {
    const track = deepCopy(fetchTrack(getState, payload.trackId));
    track.control = payload.data;
    await TrackDatabase.updateTrack(track);
    dispatch(updateTrack(track));
}