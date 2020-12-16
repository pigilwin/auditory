import { Grid } from "../../components/Grid";
import { Panel, PanelTitle } from "../../components/Panel";
import { Button } from '../../components/Buttons';
import { getSoundsForDisplay, SoundForDisplay } from "./sounds";

export const SoundsPanel = (): JSX.Element => {
    
    const buttons = buildSoundButtons();

    return (
        <Panel>
            <PanelTitle title="Sounds"/>
            <Grid elements={buttons}/>
        </Panel>
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