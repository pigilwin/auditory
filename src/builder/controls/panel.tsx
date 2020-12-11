import { Panel, PanelTitle } from "../../components/Panel";
import { RangeInput, ToggleSwitch } from "../../components/Inputs";
import { Button } from "../../components/Buttons";
import { SavedTrack } from "../../track/track";
import { useDispatch } from "react-redux";
import { updateTrackAsync } from "../../store/trackEvent";

interface ControlPanelState {
    track: SavedTrack;
    id: string;
}

export const ControlPanel = ({track}: ControlPanelState): JSX.Element => {

    const dispatch = useDispatch();

    const volumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newTrack = Object.assign({}, track);
        const control = Object.assign({}, track.control);
        control.volume = event.currentTarget.valueAsNumber;
        newTrack.control = control;
        dispatch(updateTrackAsync(newTrack));
    };

    const panner = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newTrack = Object.assign({}, track);
        const control = Object.assign({}, track.control);
        control.panner = event.currentTarget.valueAsNumber;
        newTrack.control = control;
        dispatch(updateTrackAsync(newTrack));
    };

    const looping = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const newTrack = Object.assign({}, track);
        const control = Object.assign({}, track.control);
        control.looping = event.currentTarget.checked;
        newTrack.control = control;
        dispatch(updateTrackAsync(newTrack));
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
                    value={track.control.volume}
                    step={1}
                    title="Volume"
                    onChange={volumeChange}
                    error=""
                />
                <RangeInput
                    id="panner"
                    min={-1}
                    max={1}
                    value={track.control.panner}
                    step={1}
                    title="Left & Right"
                    onChange={panner}
                    error=""
                />
                <ToggleSwitch
                    id="looping"
                    title="Looping"
                    value={track.control.looping}
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