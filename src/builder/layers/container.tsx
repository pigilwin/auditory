import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../components/Inputs";
import { createLayer } from "../../store/track/trackSlice";
import { SavedTrack } from "../../store/track/trackTypes";
import { LayerRow } from "./row";
import { ConfigureNotePanel } from '../components/ConfigureNotePanel';
import { currentlySelectedNoteIndexSelector } from "../../store/track/trackSelectors";

interface PartContainerProps {
    track: SavedTrack;
}

export const LayerContainer = ({track}: PartContainerProps): JSX.Element => {
    
    const dispatch = useDispatch();
    const currentlySelectedNote = useSelector(currentlySelectedNoteIndexSelector);

    const layers: JSX.Element[] = [];
    for (const key in track.layers) {
        layers.push(<LayerRow key={key} currentLayerCount={Object.keys(track.layers).length} trackId={track.id} layerId={key} layer={track.layers[key]}/>);
    }

    let configure: JSX.Element | null = null;
    if (currentlySelectedNote.index !== -1 && currentlySelectedNote.layerId.length > 0) {
        const sound = track.layers[currentlySelectedNote.layerId].sounds[currentlySelectedNote.index];
        configure = <ConfigureNotePanel 
            sound={sound} 
            layerId={currentlySelectedNote.layerId}
            index={currentlySelectedNote.index}
            trackId={track.id}
        />;
    }

    const openAddNewLayerPanel = (): void => {
        dispatch(createLayer());
    };

    return (
        <div className="w-full min-h-screen">
            <div className="grid grid-cols-1">
                {layers}
            </div>
            {configure}
            <div className="text-center mt-2">
                <Button title="Add Layer" onClick={openAddNewLayerPanel} disabled={false}/>
            </div>
        </div>
    );
}