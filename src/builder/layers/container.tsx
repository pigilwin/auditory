import { Droppable } from "react-beautiful-dnd";
import { Button } from "../../components/Buttons";
import { SavedTrack, Layer } from "../../track/track";
import { getSoundsForDisplay, SoundForDisplay } from "../sounds/sounds";
import { Part } from './part';

interface PartContainerInterface {
    track: SavedTrack;
}

export const LayerContainer = ({track}: PartContainerInterface): JSX.Element => {
    
    const layers: JSX.Element[] = [];
    let index = 0;
    for (const key in track.layers) {
        layers.push(<LayerRow key={key} layerId={key} index={index} layer={track.layers[key]}/>);
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
    layerId: string;
    index: number;
}

const LayerRow = ({layer, layerId}: LayerRowInterface): JSX.Element => {

    const sounds: SoundForDisplay = getSoundsForDisplay();

    const parts: JSX.Element[] = [];
    let partIndex: number = 0;
    for (const key in layer) {
        const part = layer[key];
        parts.push(
            <div className="w-1/2">
                <Part key={key} onLayer={true} id={key} sound={sounds[part.id]} index={partIndex}/>
            </div>
        );
        partIndex++;
    }

    const addLayer = () => {

    };

    return (
        <div className="w-full flex flex-row overflow-auto mt-5">
            <div className="w-2/12 text-center">
                <Button title="Add" onClick={addLayer}/>
            </div>
            <div className="w-10/12">
                <Droppable droppableId={layerId}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="border-2 h-full">
                            {provided.placeholder}
                            {parts}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
}