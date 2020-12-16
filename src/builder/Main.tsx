import { useSelector } from "react-redux";
import { tracksSelector, currentTrackIdSelector, currentlySelectedLayerSelector } from "../store/track/trackSlice";
import { welcomeSelector } from "../store/welcome/welcomeSlice";
import { ControlPanel } from "./controls/panel";
import { SoundsPanel } from "./sounds/panel";
import { Welcome } from './Welcome';
import { Begin } from './Begin';
import { Title } from "./Title";
import { LayerContainer } from './layers/container';
import { SavedTrack } from "../store/track/trackTypes";

export const Main = (): JSX.Element => {

    const hasUsedWelcomeMessage = useSelector(welcomeSelector);
    const tracks = useSelector(tracksSelector);
    const currentTrackId = useSelector(currentTrackIdSelector);
    const currentLayerId = useSelector(currentlySelectedLayerSelector);

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

    const track: SavedTrack = tracks[currentTrackId];

    if (track === null) {
        return (<Begin/>);
    }

    return (
        <div id="main-panel" className="container mx-auto flex flex-wrap overflow-hidden">
            <div className="w-full">
                <Title title={"Track Name: " + track.name}/>
            </div>
            <SoundsPanel/>
            <LayerContainer hidden={currentLayerId.length > 0} track={track}/>
            <ControlPanel id={currentTrackId} track={track}/>
        </div>
    );
}