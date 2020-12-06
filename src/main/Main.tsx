import { ControlPanel } from "../controls/panel"
import { DrumPanel } from "../drums/panel"
import { NotesPanel } from "../notes/panel"

export const Main = (): JSX.Element => {
    return (
        <div id="main-panel" className="container mx-auto flex flex-wrap overflow-hidden">
            <NotesPanel/>
            <DrumPanel/>
            <ControlPanel/>
        </div>
    );
}