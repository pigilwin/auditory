import { DrumButton } from "../components/Buttons";
import { Grid } from "../components/Grid";
import { Panel, PanelTitle } from "../components/Panel";
import { drums, DrumInterface } from "./drums";

export const DrumPanel = (): JSX.Element => {
    
    const buttons: JSX.Element[] = drums.map((drum: DrumInterface) => {
        return (<DrumButton id={drum.name} type={drum.type} title={drum.name}/>);
    });

    return (
        <Panel>
            <PanelTitle title="Drums"/>
            <Grid elements={buttons}/>
        </Panel>
    );
}