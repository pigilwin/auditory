import { Dispatch } from "react";
import { getSoundsForDisplay, SoundForDisplay } from "../../audio/sounds";
import { useDispatch, useSelector } from "react-redux";
import { deselectLayer, SelectedLayer, tracksSelector } from "../../store/track/trackSlice";
import { addNoteAsync, editSynthForLayerAsync } from "../../store/track/trackEvent";
import { Audio } from "../../audio/audio";
import { fetchSynthName } from "../../audio/synthGenerator";
import { Accordion, Button } from "../../components/components";
import { SynthSelector } from '../layers/SynthSelector';

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
    
    const synthKey = tracks[trackId].layers[currentSelectedLayer.layerId].synth;
    const buttons = buildSoundButtons(dispatch, trackId, currentSelectedLayer, synthKey);
    const synthName = fetchSynthName(synthKey);
    

    const closeLayer = (): void => {
        dispatch(deselectLayer());
    }

    const onSynthSelectedHandler = (v: string): void => {
        dispatch(editSynthForLayerAsync(v, currentSelectedLayer.layerId, trackId));
    }

    return (
        <div className="w-full px-4 overflow-hidden">
            <h1 className="text-xl p-2">Editing Layer</h1>
            <Accordion title={"This layer is using a " + synthName + ". Click here to edit"}>
                <SynthSelector
                    synthId={synthKey}
                    onSynthSelected={onSynthSelectedHandler}
                />
            </Accordion>
            <Accordion title="Choose sounds too add to the layer then close the panel">
                <div className="grid grid-cols-8 gap-4">
                    {buttons}
                </div>
            </Accordion>
            <div className="w-full text-center mt-2">
                <Button disabled={false} title="Finish editting layer" onClick={closeLayer}/>
            </div>
        </div>
    );
}

const buildSoundButtons = (
    dispatch: Dispatch<any>, 
    trackId: string, 
    currentSelectedLayer: SelectedLayer,
    synth: string
): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const sounds: SoundForDisplay = getSoundsForDisplay();
    
    for (const key in sounds) {
          
        const onClickHandler = async (): Promise<void> => {
            await Audio.playNoteFromSynth(key, synth);
            dispatch(addNoteAsync(key, currentSelectedLayer.layerId, trackId));
        };
        
        elements.push(<Button key={key} title={sounds[key]} disabled={false} onClick={onClickHandler}/>);
    }
    
    return elements;
}