import { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "../trackSlice";
import { SelectedNote, TrackState } from "../trackTypes";

export const editNoteForLayerReducer = (state: TrackState, action: PayloadAction<SelectedNote>) => {
    const newState = state;
    newState.current.selectedNote = action.payload;
    return newState;
}

export const unselectNoteReducer = (state: TrackState) => {
    const newState = state;
    newState.current.selectedNote = initialState.current.selectedNote;
    return newState;
}