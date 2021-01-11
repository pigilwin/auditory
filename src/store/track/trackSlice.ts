import { createSlice } from '@reduxjs/toolkit';
import { RootStateHook } from '../rootReducer';
import { SavedTrack, TrackState } from './trackTypes';
import { loadTracksReducer, loadTrackReducer, createTrackReducer, updateTrackReducer, deleteTrackReducer } from './actions/trackActions'; 
import { clearCurrentTrackReducer, pauseReducer, playReducer } from './actions/controlActions';
import { closeCreateLayerReducer, createLayerReducer, deselectLayerReducer, selectLayerReducer } from './actions/layerActions';
import { editNoteForLayerReducer, unselectNoteReducer } from './actions/noteActions';

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
        editNoteForLayer: editNoteForLayerReducer,
        unselectNote: unselectNoteReducer,
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