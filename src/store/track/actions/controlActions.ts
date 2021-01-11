import { TrackState } from "../trackTypes";

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