import { PanelTitle } from "../../components/Panel";
import { Button } from '../../components/Buttons';
import { getSoundsForDisplay, SoundForDisplay } from "./sounds";
import { useDispatch, useSelector } from "react-redux";
import { currentlySelectedLayerSelector, currentTrackIdSelector, deselectLayer } from "../../store/track/trackSlice";
import { addSoundAsync } from "../../store/track/trackEvent";
import { Dispatch } from "react";

export const SoundsPanel = (): JSX.Element => {

    const dispatch = useDispatch();
    const trackId = useSelector(currentTrackIdSelector);
    const currentSelectedLayerId = useSelector(currentlySelectedLayerSelector);
    const buttons = buildSoundButtons(dispatch, trackId, currentSelectedLayerId);
    

    const closeLayer = (): void => {
        dispatch(deselectLayer());
    }

    const classes: string[] = [
        "w-full",
        "px-4",
        "overflow-hidden"
    ];

    if (currentSelectedLayerId.length === 0) {
        classes.push('hidden');
    }

    return (
        <div className={classes.join(' ')}>
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

const buildSoundButtons = (dispatch: Dispatch<any>, trackId: string, currentSelectedLayerId: string): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const sounds: SoundForDisplay = getSoundsForDisplay();
    
    for (const key in sounds) {

        const onClickHandler = async (): Promise<void> => {
            dispatch(addSoundAsync({
                trackId: trackId,
                layerId: currentSelectedLayerId,
                soundId: key
            }));
        };
        
        elements.push(<Button key={key} title={sounds[key]} disabled={false} onClick={onClickHandler}/>);
    }
    
    return elements;
}