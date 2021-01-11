import { useDispatch, useSelector } from "react-redux";
import { deselectLayer, tracksSelector } from "../../store/track/trackSlice";
import { editSynthForLayerAsync } from "../../store/track/trackEvent";
import { fetchSynthName } from "../../audio/synthGenerator";
import { Button } from "../../components/Inputs";
import { Accordion } from "../../components/Accordion";
import { SynthSelector } from '../layers/SynthSelector';
import { SelectedLayer } from "../../store/track/trackTypes";
import { NoteSelector } from "./NoteSelector";

interface SoundsPanelProps {
    hidden: boolean;
    currentSelectedLayer: SelectedLayer;
    trackId: string;
}

export const SoundsPanel = ({hidden, currentSelectedLayer, trackId}: SoundsPanelProps): JSX.Element | null => {

    const dispatch = useDispatch();
    const tracks = useSelector(tracksSelector);

    if (hidden) {
        return null;
    }
    
    const synthKey = tracks[trackId].layers[currentSelectedLayer].synth;
    const synthName = fetchSynthName(synthKey);
    

    const closeLayer = (): void => {
        dispatch(deselectLayer());
    }

    const onSynthSelectedHandler = (v: string): void => {
        dispatch(editSynthForLayerAsync(v, currentSelectedLayer, trackId));
    }

    return (
        <div className="w-full px-4 overflow-hidden min-h-screen">
            <h1 className="text-xl p-2">Editing Layer</h1>
            <Accordion title={"This layer is using a " + synthName + ". Click here to edit"}>
                <SynthSelector
                    synthId={synthKey}
                    onSynthSelected={onSynthSelectedHandler}
                />
            </Accordion>
            <Accordion title="Choose sounds too add to the layer then close the panel">
                <NoteSelector
                    trackId={trackId}
                    layerId={currentSelectedLayer}
                    synthKey={synthKey}
                />
            </Accordion>
            <div className="w-full text-center mt-2">
                <Button disabled={false} title="Finish editting layer" onClick={closeLayer}/>
            </div>
        </div>
    );
}