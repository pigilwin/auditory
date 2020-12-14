import { Panel, PanelTitle } from "../../components/Panel";
import { RangeInput, ToggleSwitch } from "../../components/Inputs";
import { Button } from "../../components/Buttons";
import { SavedTrack } from "../../store/track/trackTypes";
import { useDispatch, useSelector } from "react-redux";
import { updateVolumeAsync, updatePannerAsync, updateLoopingAsync, addLayerAsync } from "../../store/track/trackEvent";
import { isPlayingSelector } from "../../store/track/trackSlice";
import { Context } from "../../lib/Context";

interface ControlPanelState {
    track: SavedTrack;
    id: string;
}

export const ControlPanel = ({track}: ControlPanelState): JSX.Element => {

    const dispatch = useDispatch();
    const isPlaying = useSelector(isPlayingSelector);

    const volumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updateVolumeAsync(event.currentTarget.valueAsNumber, track.id));
    };

    const panner = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updatePannerAsync(event.currentTarget.valueAsNumber, track.id));
    };

    const looping = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updateLoopingAsync(event.currentTarget.checked, track.id));
    };

    const addLayer = (): void => {
        dispatch(addLayerAsync(track.id));
    };

    const startTrack = async (): Promise<void> => {
        await Context.get().audio.play();
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
            <div className="grid grid-cols-3">
                <div className="p-2 text-center">
                    <Button disabled={isPlaying} title="Start" onClick={startTrack}/>
                </div>
                <div className="p-2 text-center">
                    <Button disabled={false} title="Add Layer" onClick={addLayer}/>
                </div>
                <div className="p-2 text-center">
                    <Button disabled={!isPlaying} title="Stop" onClick={stopTrack}/>
                </div>
            </div>
        </Panel>
    );
}