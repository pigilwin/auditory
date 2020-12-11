import { useDispatch } from "react-redux";
import { DrumButton } from "../../components/Buttons";
import { Grid } from "../../components/Grid";
import { Panel, PanelTitle } from "../../components/Panel";
import { updateTrackAsync } from "../../store/trackEvent";
import { SavedTrack } from "../../track/track";
import { drums, DrumInterface } from "./drums";

interface DrumPanelInterface {
    track: SavedTrack;
}


export const DrumPanel = ({track}: DrumPanelInterface): JSX.Element => {

    const dispatch = useDispatch();

    const buttons: JSX.Element[] = drums.map((drum: DrumInterface) => {

        const clickHandler = (): void => {
            
        };

        return (<DrumButton onClick={clickHandler} key={drum.name} id={drum.name} type={drum.type} title={drum.name}/>);
    });

    return (
        <Panel>
            <PanelTitle title="Drums"/>
            <Grid elements={buttons}/>
        </Panel>
    );
}