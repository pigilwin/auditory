import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../trackSlice";
import { SavedTrack, SavedTrackMap, TrackState } from "../trackTypes";

export const loadTracksReducer = (state: TrackState, action: PayloadAction<SavedTrackMap>) => {
    const newState = state;
    newState.tracks = action.payload;
    return newState;
}

export const loadTrackReducer = (state: TrackState, action: PayloadAction<string>): TrackState => {
    const newState = state;
    newState.current.trackId = action.payload;
    return newState;
}

export const createTrackReducer = (state: TrackState, action: PayloadAction<SavedTrack>): TrackState => {
    const newState = state;
    newState.current.trackId = action.payload.id;
    newState.tracks[action.payload.id] = action.payload;
    return newState;
}

export const updateTrackReducer = (state: TrackState, action: PayloadAction<SavedTrack>): TrackState => {
    const newState = state;
    newState.tracks[action.payload.id] = action.payload;
    return newState;
}

export const deleteTrackReducer = (state: TrackState, action: PayloadAction<string>): TrackState => {
    const newState = state;
    delete newState.tracks[action.payload];
    
    /**
     * If the current user deletes the track they are currently 
     * viewing then unassign the track that is being viewed 
     */
    if (action.payload === newState.current.trackId) {
        newState.current.trackId = initialState.current.trackId;
    }

    return newState;
}