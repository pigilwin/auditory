import { Droppable } from 'react-beautiful-dnd';
import { Grid } from "../../components/Grid";
import { Panel, PanelTitle } from "../../components/Panel";
import { LayerPart, SavedTrack, NOTE_TYPE } from "../../track/track";
import { notes, Note } from "./notes";
import { Part } from './../layers/part';

interface NotePanelInterface {
    track: SavedTrack;
}

export const NotesPanel = ({track}: NotePanelInterface): JSX.Element => {
    
    const buttons: JSX.Element[] = notes.map((note: Note, index: number) => {

        const part: LayerPart = {
            note: note.name,
            type: NOTE_TYPE.DRUM
        };
        return (<Part onLayer={false} key={note.name} part={part} index={index}/>);
    });

    return (
        <Panel>
            <PanelTitle title="Notes"/>
            <Droppable isDropDisabled={true} droppableId="drum-droppable">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                        <Grid elements={buttons}/>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Panel>
    );
}