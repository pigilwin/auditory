import { PanelTitle } from "../../components/Panel";
import { Button } from '../../components/Buttons';
import { getSoundsForDisplay, SoundForDisplay } from "../../audio/sounds";
import { useDispatch, useSelector } from "react-redux";
import { deselectLayer, SelectedLayer, tracksSelector } from "../../store/track/trackSlice";
import { addSoundAsync } from "../../store/track/trackEvent";
import { Dispatch } from "react";
import { Audio } from "../../audio/audio";
import { fetchSynthName } from "../../audio/synthGenerator";

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

    return (
        <div className="w-full px-4 overflow-hidden">
            <PanelTitle title="Sounds"/>
            <p className="text-center">This layer is using the synth - {synthName}</p>
            <p className="text-center">Choose sounds too add to the layer then close the panel</p>
            <div className="grid grid-cols-8 gap-4">
                {buttons}
            </div>
            <div className="w-full text-center mt-2">
                <Button disabled={false} title="Close Sounds" onClick={closeLayer}/>
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
            dispatch(addSoundAsync(key, currentSelectedLayer.layerId, trackId));
        };
        
        elements.push(<Button key={key} title={sounds[key]} disabled={false} onClick={onClickHandler}/>);
    }
    
    return elements;
}