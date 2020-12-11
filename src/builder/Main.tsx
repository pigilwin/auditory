import { useSelector } from "react-redux";
import { trackSelector } from "../store/trackSlice";
import { welcomeSelector } from "../store/welcomeSlice";
import { ControlPanel } from "./controls/panel";
import { DrumPanel } from "./drums/panel";
import { NotesPanel } from "./notes/panel";
import { Welcome } from './Welcome';
import { Begin } from './Begin';
import { Title } from "./Title";
import { LayerContainer } from './layers/container';
import { SavedTrack } from "../track/track";

export const Main = (): JSX.Element => {

    const hasUsedWelcomeMessage = useSelector(welcomeSelector);
    const trackState = useSelector(trackSelector);

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
    if (trackState.currentTrackId.length === 0) {
        return (<Begin/>);
    }

    const track: SavedTrack = trackState.tracks[trackState.currentTrackId];

    if (track === null) {
        return (<Begin/>);
    }

    return (
        <div id="main-panel" className="container mx-auto flex flex-wrap overflow-hidden">
            <div className="w-full">
                <Title title={track.name}/>
            </div>
            <NotesPanel track={track}/>
            <DrumPanel track={track}/>
            <ControlPanel id={trackState.currentTrackId} track={track}/>
            <LayerContainer track={track}/>
        </div>
    );
}