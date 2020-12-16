import { useDispatch } from "react-redux";
import { Button, DeleteButton } from "../../components/Buttons";
import { addLayerAsync, deleteLayerAsync } from "../../store/track/trackEvent";
import { selectLayer } from "../../store/track/trackSlice";
import { SavedTrack, Layer } from "../../store/track/trackTypes";
import { getSoundsForDisplay, SoundForDisplay } from "../sounds/sounds";
import { LayerPartComponent } from './part';

interface PartContainerInterface {
    track: SavedTrack;
    hidden: boolean;

}

export const LayerContainer = ({track, hidden}: PartContainerInterface): JSX.Element => {
    
    const dispatch = useDispatch();

    const layers: JSX.Element[] = [];
    for (const key in track.layers) {
        layers.push(<LayerRow key={key} currentLayerCount={Object.keys(track.layers).length} trackId={track.id} layerId={key} layer={track.layers[key]}/>);
    }

    const addLayer = (): void => {
        dispatch(addLayerAsync(track.id));
    }

    const classes: string[] = ['w-full'];
    if (hidden) {
        classes.push('hidden');
    }

    return (
        <div className={classes.join(' ')}>
            <div className="grid grid-cols-1">
                {layers}
            </div>
            <div className="text-center mt-2">
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

    const selectLayerHandler = (): void => {
        dispatch(selectLayer(layerId));
    };

    const deleteLayer = (): void => {
        dispatch(deleteLayerAsync(layerId, trackId));
    };

    let i: number = 0;
    for (const key in layer) {
        const part = layer[key];
        parts.push(<LayerPartComponent layer={layerId} index={i} key={key} sound={sounds[part.id]}/>);
        i++;
    }

    if (parts.length === 0) {
        parts.push(<h1 className="text-2xl">Please select the layer and add some notes</h1>);
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
                <Button disabled={false} title="Select" onClick={selectLayerHandler}/>
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