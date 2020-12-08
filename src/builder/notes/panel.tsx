import { NoteButton } from "../../components/Buttons";
import { Grid } from "../../components/Grid";
import { Panel, PanelTitle } from "../../components/Panel";
import { notes, Note } from "./notes";

export const NotesPanel = (): JSX.Element => {

    const clickHandler = (): void => {

    };
    
    const buttons: JSX.Element[] = notes.map((note: Note) => {
        return (<NoteButton key={note.name} onClick={clickHandler} title={note.name} note={note.name} id={note.name}/>);
    });

    return (
        <Panel>
            <PanelTitle title="Notes"/>
            <Grid elements={buttons}/>
        </Panel>
    );
}