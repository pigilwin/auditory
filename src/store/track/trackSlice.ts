import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SavedTrack, SavedTrackMap } from './trackTypes';
import { RootState } from '../rootReducer';

export interface TrackState {
    tracks: SavedTrackMap;
    currentTrackId: string;
    playing: boolean;
}

const initialState: TrackState =  {
    tracks: {},
    currentTrackId: '',
    playing: false
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
                newState.currentTrackId = '';
            }

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
export const { createTrack, loadTrack, loadTracks, updateTrack, deleteTrack} = trackSlice.actions;

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