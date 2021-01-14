import { useDispatch, useSelector } from "react-redux";
import { welcomeSelector } from "../store/welcome/welcomeSlice";
import { ControlPanel } from "./controls/panel";
import { SoundsPanel } from "./sounds/panel";
import { LayerPanel } from './layers/panel';
import { TextSingleLineInput } from '../components/Inputs';
import { ConfigureNotePanel } from './components/ConfigureNotePanel';
import { Welcome } from './Welcome';
import { Begin } from './begin/Begin';
import { Title } from "../components/Title";
import { LayerContainer } from './layers/container';
import { SavedTrack } from "../store/track/trackTypes";
import { 
    currentlyAddingLayerSelector, 
    currentlySelectedLayerSelector, 
    currentlySelectedNoteIndexSelector, 
    currentTrackIdSelector, 
    tracksSelector 
} from "../store/track/trackSelectors";
import { updateBPMAsync } from "../store/track/asyncActions/asyncControlActions";

export const Main = (): JSX.Element => {

    const dispatch = useDispatch();
    const hasUsedWelcomeMessage = useSelector(welcomeSelector);
    const tracks = useSelector(tracksSelector);
    const currentTrackId = useSelector(currentTrackIdSelector);
    const currentLayer = useSelector(currentlySelectedLayerSelector);
    const addingNewLayer = useSelector(currentlyAddingLayerSelector);
    const currentlySelectedNote = useSelector(currentlySelectedNoteIndexSelector);

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

    /**
     * If we have selected a note and the layer is found
     */
    if (currentlySelectedNote.index !== -1 && currentlySelectedNote.layerId.length > 0) {
        const sound = track.layers[currentlySelectedNote.layerId].sounds[currentlySelectedNote.index];
        return <ConfigureNotePanel 
            sound={sound} 
            layerId={currentlySelectedNote.layerId}
            index={currentlySelectedNote.index}
            trackId={track.id}
        />;
    };


    const bpmChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { currentTarget } = event;
        const { value } = currentTarget;
        dispatch(updateBPMAsync(Number.parseInt(value), track.id));
    }

    return (
        <div id="main-panel" className="container mx-auto flex flex-wrap overflow-hidden">
            <div className="w-full">
                <Title title={"Track Name: " + track.name}/>
            </div>
            <div className="w-1/2 mx-auto">
                <TextSingleLineInput
                    title="BPM"
                    error=""
                    value={track.control.bpm.toString()}
                    onChange={bpmChange}
                />
            </div>
            <LayerContainer track={track}/>
            <ControlPanel track={track}/>
        </div>
    );
}