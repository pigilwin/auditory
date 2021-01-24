import { RootState } from "../rootReducer";
import { SavedTrackMap, SelectedLayer, SelectedNote } from "./trackTypes";

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
export const currentlyEdittingSettingsSelector = (state: RootState): boolean => state.trackReducer.edittingSettings;