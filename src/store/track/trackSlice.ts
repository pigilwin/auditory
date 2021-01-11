import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, RootStateHook } from '../rootReducer';
import { SavedTrack, SavedTrackMap, SelectedLayer, SelectedNote, TrackState } from './trackTypes';
import { loadTracksReducer, loadTrackReducer, createTrackReducer, updateTrackReducer, deleteTrackReducer } from './actions/trackActions'; 
import { clearCurrentTrackReducer, pauseReducer, playReducer } from './actions/controlActions';
import { closeCreateLayerReducer, createLayerReducer, deselectLayerReducer, selectLayerReducer } from './actions/layerActions';

export const initialState: TrackState =  {
    tracks: {},
    current: {
        trackId: '',
        selectedLayer: '',
        selectedNote: {
            index: 0,
            layerId: ''
        },
        addingLayer: false
    },
    isPlaying: false
};

const trackSlice = createSlice({
    name: 'track',
    initialState,
    reducers: {
        loadTracks: loadTracksReducer,
        loadTrack: loadTrackReducer,
        createTrack: createTrackReducer,
        updateTrack: updateTrackReducer,
        deleteTrack: deleteTrackReducer,
        createLayer: createLayerReducer,
        closeCreateLayer: closeCreateLayerReducer,
        selectLayer: selectLayerReducer,
        deselectLayer: deselectLayerReducer,
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
        clearCurrentTrack: clearCurrentTrackReducer,
        play: playReducer,
        pause: pauseReducer,
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
    clearCurrentTrack,
    play,
    pause
} = trackSlice.actions;

export const fetchTrack = (getStateHook: RootStateHook, trackId: string): SavedTrack => {
    const currentTracks = getStateHook().trackReducer.tracks;
    return Object.assign({}, currentTracks[trackId]);
}

export const currentlyPlayingSelector = (state: RootState): boolean => state.trackReducer.isPlaying;
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