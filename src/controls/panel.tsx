import { PanelTitle } from "../components/Panel";
import { RangeInput, ToggleSwitch } from "../components/Inputs";

export const ControlPanel = () => {
    return (
        <div id="controls-panel">
            <PanelTitle title="Controls"/>
            <div className="grid grid-cols-1">
                <RangeInput 
                    id="volume"
                    min={0}
                    max={1}
                    value={1}
                    step={0.1}
                    title="Volume"
                />
                <RangeInput
                    id="panner"
                    min={-1}
                    max={1}
                    value={0}
                    step={1}
                    title="Left & Right"
                />
                <ToggleSwitch
                    id="looping"
                    title="Looping"
                    value={false}
                />
            </div>
        </div>
    );
}