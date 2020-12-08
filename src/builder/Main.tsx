import { useSelector } from "react-redux";
import { welcomeSelector } from "../store/welcomeSlice";
import { ControlPanel } from "./controls/panel";
import { DrumPanel } from "./drums/panel";
import { NotesPanel } from "./notes/panel";
import { Welcome } from './welcome';

export const Main = (): JSX.Element => {

    const hasUsedWelcomeMessage = useSelector(welcomeSelector);

    if (hasUsedWelcomeMessage){

        return (
            <div id="main-panel" className="container mx-auto flex flex-wrap overflow-hidden">
                <NotesPanel/>
                <DrumPanel/>
                <ControlPanel/>
            </div>
        );
    }

    return (<Welcome/>);
}