import { Panel, PanelTitle } from "../../components/Panel";
import { RangeInput, ToggleSwitch } from "../../components/Inputs";

export const ControlPanel = () => {

    const volumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
    };

    const panner = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
    };

    const looping = () => {

    };

    return (
        <Panel>
            <PanelTitle title="Controls"/>
            <div className="grid grid-cols-1">
                <RangeInput 
                    id="volume"
                    min={0}
                    max={1}
                    value={1}
                    step={0.1}
                    title="Volume"
                    onChange={volumeChange}
                />
                <RangeInput
                    id="panner"
                    min={-1}
                    max={1}
                    value={0}
                    step={1}
                    title="Left & Right"
                    onChange={panner}
                />
                <ToggleSwitch
                    id="looping"
                    title="Looping"
                    value={false}
                    onChange={looping}
                />
            </div>
        </Panel>
    );
}