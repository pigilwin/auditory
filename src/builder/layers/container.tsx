import { Droppable } from "react-beautiful-dnd";
import { Button } from "../../components/Buttons";
import { SavedTrack, Layer } from "../../track/track";
import { Part } from './part';

interface PartContainerInterface {
    track: SavedTrack;
}

export const LayerContainer = ({track}: PartContainerInterface): JSX.Element => {
    
    const layers: JSX.Element[] = [];
    let index = 0;
    for (const key in track.layers) {
        return (<LayerRow id={key} index={index} layer={track.layers[key]}/>);
        index++;
    }

    return (
        <div className="w-full grid grid-cols-1 grid-flow-col">
            {layers}
        </div>
    );
}

interface LayerRowInterface {
    layer: Layer;
    id: string;
    index: number;
}

const LayerRow = ({layer, id, index}: LayerRowInterface): JSX.Element => {
    const parts: JSX.Element[] = [];
    let partIndex: number = 0;
    for (const key in layer) {
        parts.push(<Part onLayer={true} part={layer[key]} index={partIndex}/>);
        partIndex++;
    }

    const addLayer = () => {

    };

    return (
        <div className="w-full flex flex-row overflow-auto mt-4 py-10 px-2">
            <div className="w-1/6">
                <Button title="Add" onClick={addLayer}/>
            </div>
            <div className="border-2 border-red-500 w-5/6">
                <Droppable droppableId={id}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
}