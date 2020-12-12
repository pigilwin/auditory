import { Droppable } from "react-beautiful-dnd";
import { Grid } from "../../components/Grid";
import { Panel, PanelTitle } from "../../components/Panel";
import { LayerPart, SavedTrack, NOTE_TYPE } from "../../track/track";
import { Part } from "../layers/part";
import { drums, DrumInterface } from "./drums";

interface DrumPanelInterface {
    track: SavedTrack;
}


export const DrumPanel = ({track}: DrumPanelInterface): JSX.Element => {

    const buttons: JSX.Element[] = drums.map((drum: DrumInterface, index: number) => {
        const part: LayerPart = {
            note: drum.name,
            type: NOTE_TYPE.DRUM
        };
        return (<Part onLayer={false} key={drum.name} part={part} index={index}/>);
    });

    return (
        <Panel>
            <PanelTitle title="Drums"/>
            <Droppable droppableId="drum-droppable">
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}>
                        <Grid elements={buttons}/>
                    </div>
                )}
            </Droppable>
        </Panel>
    );
}