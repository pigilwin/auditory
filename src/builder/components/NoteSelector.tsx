import { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { getSoundsForDisplay, SoundForDisplay } from "../../audio/sounds";
import { Audio } from "../../audio/audio";
import { Button } from "../../components/Inputs";
import { SelectedLayer } from "../../store/track/trackTypes";
import { addNoteAsync } from "../../store/track/asyncActions/asyncNoteActions";

interface NoteSelectorProps {
    trackId: string;
    layerId: string;
    synthKey: string;
}
export const NoteSelector = ({trackId, layerId, synthKey}: NoteSelectorProps): JSX.Element => {
    
    const dispatch = useDispatch();
    const buttons = buildSoundButtons(dispatch, trackId, layerId, synthKey);

    return (
        <div className="grid grid-cols-8 gap-4">
            {buttons}
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
            dispatch(addNoteAsync(key, currentSelectedLayer, trackId, 1));
        };
        
        elements.push(<Button key={key} title={sounds[key]} disabled={false} onClick={onClickHandler}/>);
    }
    
    return elements;
}