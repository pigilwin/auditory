import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../trackSlice";
import { TrackState } from "../trackTypes";

export const createLayerReducer = (state: TrackState) => {
    const newState = state;
    newState.current.addingLayer = true;
    return newState;
}

export const closeCreateLayerReducer = (state: TrackState) => {
    const newState = state;
    newState.current.addingLayer = initialState.current.addingLayer;
    return newState;
}

export const selectLayerReducer = (state: TrackState, action: PayloadAction<string>) => {
    const newState = state;
    newState.current.selectedLayer = action.payload;
    return newState;
}

export const deselectLayerReducer = (state: TrackState) => {
    const newState = state;
    newState.current.selectedLayer = initialState.current.selectedLayer;
    return newState;
}