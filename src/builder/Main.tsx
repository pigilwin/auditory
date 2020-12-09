import { useSelector } from "react-redux";
import { trackSelector } from "../store/trackSlice";
import { welcomeSelector } from "../store/welcomeSlice";
import { ControlPanel } from "./controls/panel";
import { DrumPanel } from "./drums/panel";
import { NotesPanel } from "./notes/panel";
import { Welcome } from './Welcome';
import { Begin } from './Begin';
import { Title } from "./Title";

export const Main = (): JSX.Element => {

    const hasUsedWelcomeMessage = useSelector(welcomeSelector);
    const track = useSelector(trackSelector);

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
    if (track.currentTrackId.length === 0) {
        return (<Begin/>);
    }

    return (
        <div id="main-panel" className="container mx-auto flex flex-wrap overflow-hidden">
            <Title title="Title goes here"/>
            <NotesPanel/>
            <DrumPanel/>
            <ControlPanel/>
        </div>
    );
}