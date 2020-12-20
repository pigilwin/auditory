import { PanelTitle } from "../../components/Panel";
import { Button } from '../../components/Buttons';
import { getSoundsForDisplay, SoundForDisplay } from "../../audio/sounds";
import { useDispatch } from "react-redux";
import { deselectLayer, SelectedLayer } from "../../store/track/trackSlice";
import { addSoundAsync } from "../../store/track/trackEvent";
import { Dispatch } from "react";

interface SoundsPanelProps {
    hidden: boolean;
    currentSelectedLayer: SelectedLayer;
    trackId: string;
}

export const SoundsPanel = ({hidden, currentSelectedLayer, trackId}: SoundsPanelProps): JSX.Element | null => {

    const dispatch = useDispatch();
    const buttons = buildSoundButtons(dispatch, trackId, currentSelectedLayer);
    

    const closeLayer = (): void => {
        dispatch(deselectLayer());
    }

    if (hidden) {
        return null;
    }

    return (
        <div className="w-full px-4 overflow-hidden">
            <PanelTitle title="Sounds"/>
            <p className="text-center">Choose sounds too add to the layer the close the panel</p>
            <div className="grid grid-cols-8 gap-4">
                {buttons}
            </div>
            <div className="w-full text-center mt-2">
                <Button disabled={false} title="Close Sounds" onClick={closeLayer}/>
            </div>
        </div>
    );
}

const buildSoundButtons = (dispatch: Dispatch<any>, trackId: string, currentSelectedLayer: SelectedLayer): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const sounds: SoundForDisplay = getSoundsForDisplay();
    
    for (const key in sounds) {

        if (!currentSelectedLayer.usedNotes.includes(key)){
            
            const onClickHandler = async (): Promise<void> => {
                dispatch(addSoundAsync(key, currentSelectedLayer.layerId, trackId));
            };
            
            elements.push(<Button key={key} title={sounds[key]} disabled={false} onClick={onClickHandler}/>);
        }
    }
    
    return elements;
}