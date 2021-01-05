import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedTrack, SavedTrackMap, SelectedLayer, SelectedNote, TrackState } from './trackTypes';
import { RootState } from '../rootReducer';

const initialState: TrackState =  {
    tracks: {},
    current: {
        trackId: '',
        selectedLayer: '',
        selectedNote: {
            index: 0,
            layerId: ''
        },
        addingLayer: false
    }
};

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        loadTracks(state, action: PayloadAction<SavedTrackMap>) {
            const newState = state;
            newState.tracks = action.payload;
            return newState;
        },
        loadTrack(state, action: PayloadAction<string>) {
            const newState = state;
            newState.current.trackId = action.payload;
            return newState;
        },
        createTrack(state, action: PayloadAction<SavedTrack>) {
            const newState = state;
            newState.current.trackId = action.payload.id;
            newState.tracks[action.payload.id] = action.payload;
            return newState;
        },
        updateTrack(state, action: PayloadAction<SavedTrack>) {
            const newState = state;
            newState.tracks[action.payload.id] = action.payload;
            return newState;
        },
        deleteTrack(state, action: PayloadAction<string>) {
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
        },
        createLayer(state) {
            const newState = state;
            newState.current.addingLayer = true;
            return newState;
        },
        closeCreateLayer(state) {
            const newState = state;
            newState.current.addingLayer = initialState.current.addingLayer;
            return newState;
        },
        selectLayer(state, action: PayloadAction<string>) {
            const newState = state;
            newState.current.selectedLayer = action.payload;
            return newState;
        },
        deselectLayer(state) {
            const newState = state;
            newState.current.selectedLayer = initialState.current.selectedLayer;
            return newState;
        },
        editNoteForLayer(state, action: PayloadAction<SelectedNote>) {
            const newState = state;
            newState.current.selectedNote = action.payload;
            return newState;
        },
        unselectNote(state) {
            const newState = state;
            newState.current.selectedNote = initialState.current.selectedNote;
            return newState;
        },
        clearCurrentTrack(state) {
            const newState = state;
            newState.current = initialState.current;
            return newState;
        }
    }
});

export const reducer = trackSlice.reducer;
export const { 
    createTrack, 
    loadTrack, 
    loadTracks, 
    updateTrack, 
    deleteTrack,
    createLayer,
    closeCreateLayer, 
    selectLayer, 
    deselectLayer, 
    editNoteForLayer,
    unselectNote,
    clearCurrentTrack
} = trackSlice.actions;

export const currentlySelectedNoteIndexSelector = (state: RootState): SelectedNote => state.trackReducer.current.selectedNote;
export const currentlySelectedLayerSelector = (state: RootState): SelectedLayer => state.trackReducer.current.selectedLayer;
export const currentlyAddingLayerSelector = (state: RootState): boolean => state.trackReducer.current.addingLayer;
export const currentTrackIdSelector = (state: RootState): string => state.trackReducer.current.trackId;
export const tracksSelector = (state: RootState): SavedTrackMap => state.trackReducer.tracks;
export const trackNameSelector = (state: RootState): string[] =>  {
    const names: string[] = [];
    for (const key in state.trackReducer.tracks) {
        names.push(state.trackReducer.tracks[key].name);
    }
    return names;
}