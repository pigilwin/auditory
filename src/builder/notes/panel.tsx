import { useDispatch } from "react-redux";
import { NoteButton } from "../../components/Buttons";
import { Grid } from "../../components/Grid";
import { Panel, PanelTitle } from "../../components/Panel";
import { updateTrackAsync } from "../../store/trackEvent";
import { SavedTrack } from "../../track/track";
import { notes, Note } from "./notes";

interface NotePanelInterface {
    track: SavedTrack;
}

export const NotesPanel = ({track}: NotePanelInterface): JSX.Element => {

    const dispatch = useDispatch();
    
    const buttons: JSX.Element[] = notes.map((note: Note) => {

        const clickHandler = (): void => {
            
        };

        return (<NoteButton key={note.name} onClick={clickHandler} title={note.name} note={note.name} id={note.name}/>);
    });

    return (
        <Panel>
            <PanelTitle title="Notes"/>
            <Grid elements={buttons}/>
        </Panel>
    );
}