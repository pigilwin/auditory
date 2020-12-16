import { useDispatch } from "react-redux";
import { Button, DeleteButton } from "../../components/Buttons";
import { addLayerAsync, deleteLayerAsync, selectLayerAsync } from "../../store/track/trackEvent";
import { SavedTrack, Layer } from "../../store/track/trackTypes";
import { getSoundsForDisplay, SoundForDisplay } from "../sounds/sounds";
import { LayerPartComponent } from './part';

interface PartContainerInterface {
    track: SavedTrack;
}

export const LayerContainer = ({track}: PartContainerInterface): JSX.Element => {
    
    const dispatch = useDispatch();

    const layers: JSX.Element[] = [];
    for (const key in track.layers) {
        layers.push(<LayerRow key={key} currentLayerCount={Object.keys(track.layers).length} trackId={track.id} layerId={key} layer={track.layers[key]}/>);
    }

    const addLayer = (): void => {
        dispatch(addLayerAsync(track.id));
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1">
                {layers}
            </div>
            <div className="text-center">
                <Button title="Add Layer" onClick={addLayer} disabled={false}/>
            </div>
        </div>
    );
}

interface LayerRowInterface {
    layer: Layer;
    layerId: string;
    trackId: string;
    currentLayerCount: number;
}

const LayerRow = ({layer, layerId, trackId, currentLayerCount}: LayerRowInterface): JSX.Element => {
    
    const dispatch = useDispatch();
    const sounds: SoundForDisplay = getSoundsForDisplay();
    const parts: JSX.Element[] = [];

    const selectLayer = (): void => {
        dispatch(selectLayerAsync(layerId));
    };

    const deleteLayer = (): void => {
        dispatch(deleteLayerAsync(layerId, trackId));
    };

    for (const key in layer) {
        const part = layer[key];
        parts.push(<LayerPartComponent key={key} sound={sounds[part.id]}/>);
    }

    /**
     * Always assign the layer to the delete button
     */
    let deleteButton = <DeleteButton disabled={false} title="Delete" onClick={deleteLayer}/>;

    if (currentLayerCount === 1) {
        deleteButton = <div></div>;
    }

    return (
        <div className="w-full flex flex-row mt-5">
            <div className="w-2/12 text-center">
                <Button disabled={false} title="Select" onClick={selectLayer}/>
            </div>
            <div className="w-8/12 flex flex-row">
                {parts}
            </div>
            <div className="w-2/12 text-center">
                {deleteButton}
            </div>
        </div>
    );
}