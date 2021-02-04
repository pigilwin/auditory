import { initialState } from "../trackSlice";
import { TrackState } from "../trackTypes";

export const clearCurrentTrackReducer = (state: TrackState) => {
    const newState = state;
    newState.current = initialState.current;
    return newState;
}

export const playReducer = (state: TrackState) => {
    const newState = state;
    newState.isPlaying = true;
    return newState;
}

export const pauseReducer = (state: TrackState) => {
    const newState = state;
    newState.isPlaying = false;
    return newState;
}

export const configureSettingsReducer = (state: TrackState) => {
    const newState = state;
    newState.edittingSettings = true;
    return newState;
}

export const finishedConfiguringSettingsReducer = (state: TrackState) => {
    const newState = state;
    newState.edittingSettings = false;
    return newState;
}