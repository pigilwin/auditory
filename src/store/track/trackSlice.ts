import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedTrack, SavedTrackMap } from './trackTypes';
import { RootState } from '../rootReducer';

export interface SelectedNote {
    index: number;
    layerId: string;
}
export interface TrackState {
    tracks: SavedTrackMap;
    currentTrackId: string;
    currentlySelectedLayer: string;
    currentlySelectedNote: SelectedNote;
    playing: boolean;
}

const initialState: TrackState =  {
    tracks: {},
    currentTrackId: '',
    playing: false,
    currentlySelectedLayer: '',
    currentlySelectedNote: {
        index: 0,
        layerId: ''
    }
};

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        loadTracks(state, action: PayloadAction<LoadTracks>) {
            const newState = state;
            newState.tracks = action.payload.tracks;
            return newState;
        },
        loadTrack(state, action: PayloadAction<string>) {
            const newState = state;
            newState.currentTrackId = action.payload;
            return newState;
        },
        createTrack(state, action: PayloadAction<CreateTrack>) {
            const newState = state;
            newState.currentTrackId = action.payload.track.id;
            newState.tracks[action.payload.track.id] = action.payload.track;
            return newState;
        },
        updateTrack(state, action: PayloadAction<UpdateTrack>) {
            const newState = state;
            newState.tracks[action.payload.track.id] = action.payload.track;
            return newState;
        },
        deleteTrack(state, action: PayloadAction<string>) {
            const newState = state;
            delete newState.tracks[action.payload];
            
            /**
             * If the current user deletes the track they are currently 
             * viewing then unassign the track that is being viewed 
             */
            if (action.payload === newState.currentTrackId) {
                newState.currentTrackId = initialState.currentTrackId;
            }

            return newState;
        },
        selectLayer(state, action: PayloadAction<string>) {
            const newState = state;
            state.currentlySelectedLayer = action.payload;
            return newState;
        },
        deselectLayer(state) {
            const newState = state;
            state.currentlySelectedLayer = initialState.currentlySelectedLayer;
            return newState;
        },
        editNoteForLayer(state, action: PayloadAction<SelectedNote>) {
            const newState = state;
            newState.currentlySelectedNote = action.payload;
            return newState;
        },
        unselectNote(state) {
            const newState = state;
            newState.currentlySelectedNote = initialState.currentlySelectedNote;
            return newState;
        }
    }
});

interface CreateTrack {
    track: SavedTrack;
}

interface LoadTracks {
    tracks: SavedTrackMap;
}

interface UpdateTrack {
    track: SavedTrack;
}

export const reducer = trackSlice.reducer;
export const { 
    createTrack, 
    loadTrack, 
    loadTracks, 
    updateTrack, 
    deleteTrack, 
    selectLayer, 
    deselectLayer, 
    editNoteForLayer,
    unselectNote
} = trackSlice.actions;

export const currentlySelectedNoteIndexSelector = (state: RootState): SelectedNote => state.trackReducer.currentlySelectedNote;
export const currentlySelectedLayerSelector = (state: RootState): string => state.trackReducer.currentlySelectedLayer;
export const isPlayingSelector = (state: RootState): boolean => state.trackReducer.playing;
export const currentTrackIdSelector = (state: RootState): string => state.trackReducer.currentTrackId;
export const tracksSelector = (state: RootState): SavedTrackMap => state.trackReducer.tracks;
export const trackNameSelector = (state: RootState): string[] =>  {
    const names: string[] = [];
    Object.keys(state.trackReducer.tracks).forEach(key => {
        names.push(state.trackReducer.tracks[key].name);
    });
    return names;
}