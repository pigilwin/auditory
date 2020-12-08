import { DrumButton } from "../../components/Buttons";
import { Grid } from "../../components/Grid";
import { Panel, PanelTitle } from "../../components/Panel";
import { drums, DrumInterface } from "./drums";

export const DrumPanel = (): JSX.Element => {
    
    const clickHandler = (): void => {

    };

    const buttons: JSX.Element[] = drums.map((drum: DrumInterface) => {
        return (<DrumButton onClick={clickHandler} key={drum.name} id={drum.name} type={drum.type} title={drum.name}/>);
    });

    return (
        <Panel>
            <PanelTitle title="Drums"/>
            <Grid elements={buttons}/>
        </Panel>
    );
}