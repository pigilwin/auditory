import { PanelTitle } from "../../components/Panel";
import { Button } from '../../components/Buttons';
import { getSoundsForDisplay, SoundForDisplay } from "./sounds";
import { useSelector } from "react-redux";
import { currentlySelectedLayerSelector } from "../../store/track/trackSlice";

export const SoundsPanel = (): JSX.Element => {
    
    const buttons = buildSoundButtons();
    const currentlySelectedLayer = useSelector(currentlySelectedLayerSelector);

    const classes: string[] = [
        "w-full",
        "px-4",
        "overflow-hidden"
    ];

    if (currentlySelectedLayer.length === 0) {
        classes.push('hidden');
    }

    return (
        <div className={classes.join(' ')}>
            <PanelTitle title="Sounds"/>
            <div className="grid grid-cols-8 gap-4">
                {buttons}
            </div>
        </div>
    );
}

const buildSoundButtons = (): JSX.Element[] => {
    const elements: JSX.Element[] = [];
    const sounds: SoundForDisplay = getSoundsForDisplay();
    for (const key in sounds) {

        const onClickHandler = (): void => {

        };
        
        elements.push(<Button key={key} title={sounds[key]} disabled={false} onClick={onClickHandler}/>);
    }
    return elements;
}