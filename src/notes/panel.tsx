import { NoteButton } from "../components/Buttons";
import { Grid } from "../components/Grid";
import { PanelTitle } from "../components/Panel";
import { notes, Note } from "./notes";

export const NotesPanel = (): JSX.Element => {
    
    const buttons: JSX.Element[] = notes.map((note: Note) => {
        return (<NoteButton title={note.name} note={note.name} id={note.name}/>);
    });

    return (
        <div id="notes-panel">
            <PanelTitle title="Notes"/>
            <Grid elements={buttons}/>
        </div>
    );
}