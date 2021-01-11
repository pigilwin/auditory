import { useSelector } from "react-redux";
import { welcomeSelector } from "../store/welcome/welcomeSlice";
import { ControlPanel } from "./controls/panel";
import { SoundsPanel } from "./sounds/panel";
import { LayerPanel } from './layers/panel';
import { Welcome } from './Welcome';
import { Begin } from './begin/Begin';
import { Title } from "../components/Title";
import { ConfigureNotePanel } from './components/ConfigureNotePanel';
import { LayerContainer } from './layers/container';
import { SavedTrack } from "../store/track/trackTypes";
import { currentlyAddingLayerSelector, currentlySelectedLayerSelector, currentlySelectedNoteIndexSelector, currentTrackIdSelector, tracksSelector } from "../store/track/trackSelectors";

export const Main = (): JSX.Element => {

    const hasUsedWelcomeMessage = useSelector(welcomeSelector);
    const tracks = useSelector(tracksSelector);
    const currentTrackId = useSelector(currentTrackIdSelector);
    const currentLayer = useSelector(currentlySelectedLayerSelector);
    const currentNote = useSelector(currentlySelectedNoteIndexSelector);
    const addingNewLayer = useSelector(currentlyAddingLayerSelector);

    /**
     * If the user has never accessed the system, 
     * show them the welcome message
     */
    if (!hasUsedWelcomeMessage){
        return (<Welcome/>);
    }

    /**
     * If the current track id is zero then now track is selected
     * Show the create new / load existing track buttons
     */
    if (currentTrackId.length === 0) {
        return (<Begin/>);
    }

    /**
     * Look up the saved track and hold the value
     */
    const track: SavedTrack = tracks[currentTrackId];

    /**
     * If the track has somehow failed to been found,
     * lets show the begin page so the application
     * does not error
     */
    if (track === null) {
        return (<Begin/>);
    }

    /**
     * If the currently selected layer id is found then we are configuring that layer
     */
    if (currentLayer.length > 0) {
        return <SoundsPanel track={track} currentSelectedLayer={currentLayer}/>
    }

    /**
     * If we adding a new layer, show the new screen
     */
    if (addingNewLayer) {
        return <LayerPanel trackId={track.id}/>;
    }
    

    return (
        <div id="main-panel" className="container mx-auto flex flex-wrap overflow-hidden">
            <div className="w-full dark:text-white">
                <Title title={"Track Name: " + track.name}/>
            </div>
            <LayerContainer track={track}/>
            <ConfigureNotePanel hidden={currentNote.index === -1 || currentNote.layerId.length === 0} track={track}/>
            <ControlPanel track={track}/>
        </div>
    );
}