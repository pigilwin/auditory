import { Panel, PanelTitle } from "../../components/Panel";
import { RangeInput, ToggleSwitch } from "../../components/Inputs";
import { Button } from "../../components/Buttons";
import { SavedTrack } from "../../track/track";
import { updateControl } from "../../store/trackSlice";
import { useDispatch } from "react-redux";

interface ControlPanelState {
    track: SavedTrack;
    id: string;
}

export const ControlPanel = (panelState: ControlPanelState): JSX.Element => {

    const dispatch = useDispatch();

    const volumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updateControl({
            looping: panelState.track.looping,
            panner: panelState.track.panner,
            volume: event.currentTarget.valueAsNumber,
            id: panelState.id
        }));
    };

    const panner = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updateControl({
            looping: panelState.track.looping,
            volume: panelState.track.volume,
            panner: event.currentTarget.valueAsNumber,
            id: panelState.id
        }));
    };

    const looping = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updateControl({
            looping: event.currentTarget.checked,
            volume: panelState.track.volume,
            panner: panelState.track.panner,
            id: panelState.id
        }));
    };

    const startTrack = (): void => {

    };

    const stopTrack = (): void => {

    };

    return (
        <Panel>
            <PanelTitle title="Controls"/>
            <div className="grid grid-cols-1">
                <RangeInput 
                    id="volume"
                    min={0}
                    max={10}
                    value={panelState.track.volume}
                    step={1}
                    title="Volume"
                    onChange={volumeChange}
                    error=""
                />
                <RangeInput
                    id="panner"
                    min={-1}
                    max={1}
                    value={panelState.track.panner}
                    step={1}
                    title="Left & Right"
                    onChange={panner}
                    error=""
                />
                <ToggleSwitch
                    id="looping"
                    title="Looping"
                    value={panelState.track.looping}
                    onChange={looping}
                    error=""
                />
            </div>
            <div className="grid grid-cols-2">
                <div className="p-2">
                    <Button id="start" title="Start" onClick={startTrack}/>
                </div>
                <div className="p-2">
                    <Button id="stop" title="Stop" onClick={stopTrack}/>
                </div>
            </div>
        </Panel>
    );
}