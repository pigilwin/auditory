import { Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { Button, DeleteButton } from "../../components/Buttons";
import { addLayerAsync, deleteLayerAsync } from "../../store/trackEvent";
import { SavedTrack, Layer } from "../../track/track";
import { getSoundsForDisplay, SoundForDisplay } from "../sounds/sounds";
import { LayerPartComponent } from './part';

interface PartContainerInterface {
    track: SavedTrack;
}

export const LayerContainer = ({track}: PartContainerInterface): JSX.Element => {
    
    const layers: JSX.Element[] = [];
    let index = 0;
    for (const key in track.layers) {
        layers.push(<LayerRow key={key} trackId={track.id} layerId={key} index={index} layer={track.layers[key]}/>);
        index++;
    }

    return (
        <div className="w-full grid grid-cols-1">
            {layers}
        </div>
    );
}

interface LayerRowInterface {
    layer: Layer;
    layerId: string;
    index: number;
    trackId: string;
}

const LayerRow = ({layer, layerId, trackId, index}: LayerRowInterface): JSX.Element => {
    
    const dispatch = useDispatch();
    const sounds: SoundForDisplay = getSoundsForDisplay();

    const parts: JSX.Element[] = [];
    let partIndex: number = 0;
    for (const key in layer) {
        const part = layer[key];
        parts.push(<LayerPartComponent key={key} id={key} sound={sounds[part.id]} index={partIndex}/>);
        partIndex++;
    }

    const addLayer = (): void => {
        dispatch(addLayerAsync(trackId));
    };

    const deleteLayer = (): void => {
        dispatch(deleteLayerAsync(layerId, trackId));
    };

    let button = <DeleteButton title="Delete" onClick={deleteLayer}/>;
    if (index === 0) {
        button = <Button title="Add" onClick={addLayer}/>;
    }

    return (
        <div className="w-full flex flex-row mt-5">
            <div className="w-2/12 text-center">
                {button}
            </div>
            <div className="w-10/12">
                <Droppable droppableId={layerId}>
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="border-2 h-full flex flex-row overflow-auto">
                            {provided.placeholder}
                            {parts}
                        </div>
                    )}
                </Droppable>
            </div>
        </div>
    );
}