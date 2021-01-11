import { DeleteButton, Button } from '../../components/Inputs';
import { getSoundsForDisplay, SoundForDisplay } from "../../audio/sounds";
import { NotePart } from './part';
import { deleteLayerAsync } from "../../store/track/trackEvent";
import { Layer } from "../../store/track/trackTypes";
import { useDispatch } from "react-redux";
import { selectLayer } from '../../store/track/trackSlice';

interface LayerRowInterface {
    layer: Layer;
    layerId: string;
    trackId: string;
    currentLayerCount: number;
}

export const LayerRow = ({layer, layerId, trackId, currentLayerCount}: LayerRowInterface): JSX.Element => {
    
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
    for (const key in layer.sounds) {
        const part = layer.sounds[key];
        parts.push(<NotePart layer={layerId} index={i} key={key} sound={sounds[part.id]}/>);
        i++;
    }

    /**
     * If no parts have been found then show the error message related to layers
     */
    if (parts.length === 0) {
        parts.push(<h1 className="text-2xl p-3" key="a">Please select the layer and add some notes</h1>);
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
            <div className="w-1/12 text-center">
                <Button disabled={false} title="Edit" onClick={selectLayerHandler}/>
            </div>
            <div className="w-10/12 flex flex-row rounded-md shadow-md bg-gray-300 p-1 overflow-x-auto">
                {parts}
            </div>
            <div className="w-1/12 text-center">
                {deleteButton}
            </div>
        </div>
    );
}