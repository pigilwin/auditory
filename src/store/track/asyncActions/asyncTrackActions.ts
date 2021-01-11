import { AppDispatch, AppThunk } from "../../store";
import { TrackDatabase } from "../trackDatabase";
import { createTrack, deleteTrack, loadTracks } from "../trackSlice";

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

export const deleteTrackAsync = (
    id: string
): AppThunk => async (
    dispatch: AppDispatch
) => {
    await TrackDatabase.deleteTrack(id);
    dispatch(deleteTrack(id));
};