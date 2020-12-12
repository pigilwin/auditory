import { Droppable } from 'react-beautiful-dnd';
import { Grid } from "../../components/Grid";
import { Panel, PanelTitle } from "../../components/Panel";
import { LayerPart } from "../../track/track";
import { getSoundsForDisplay } from "./sounds";
import { Part } from '../layers/part';

export const SoundsPanel = (): JSX.Element => {
    
    const buttons = buildSoundButtons();

    return (
        <Panel>
            <PanelTitle title="Sounds"/>
            <Droppable isDropDisabled={true} droppableId="sounds-droppable">
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

const buildSoundButtons = (): JSX.Element[] => {
    return getSoundsForDisplay().map((name: string, index: number) => {
        const part: LayerPart = {
            note: name
        };
        return (<Part onLayer={false} key={name} part={part} index={index}/>);
    });
}