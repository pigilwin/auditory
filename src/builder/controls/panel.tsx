import { RangeInput, ToggleSwitch } from "../../components/Inputs";
import { SavedTrack } from "../../store/track/trackTypes";
import { useDispatch } from "react-redux";
import { updateVolumeAsync, updatePannerAsync, updateLoopingAsync } from "../../store/track/trackEvent";
import { Audio } from "../../audio/audio";
import { Play, Stop } from "../../components/icon";

interface ControlPanelProps {
    track: SavedTrack;
}

export const ControlPanel = ({track}: ControlPanelProps): JSX.Element => {

    const dispatch = useDispatch();

    const volumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updateVolumeAsync(event.currentTarget.valueAsNumber, track.id));
    };

    const panner = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updatePannerAsync(event.currentTarget.valueAsNumber, track.id));
    };

    const looping = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updateLoopingAsync(event.currentTarget.checked, track.id));
    };

    const startTrack = async (): Promise<void> => {
        await Audio.playTrack(track);
    };

    const stopTrack = (): void => {
        Audio.stop();
    };

    return (
        <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow">
            <div id="tabs" className="flex justify-between">
                <div className="w-full text-center">
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
                </div>
                <div className="w-full justify-center inline-block text-center cursor-pointer pt-2 pb-1">
                    <button onClick={startTrack}>
                        <Play/>
                        <span className="tab tab-kategori block text-xs">Play</span>
                    </button>
                </div>
                <div className="w-full justify-center inline-block text-center pt-2 pb-1">
                    <ToggleSwitch
                        id="looping"
                        title="Looping"
                        value={track.control.looping}
                        onChange={looping}
                        error=""
                    />
                </div>
                <div className="w-full justify-center inline-block text-center cursor-pointer pt-2 pb-1">
                    <button onClick={stopTrack}>
                        <Stop/>
                        <span className="tab tab-whishlist block text-xs">Stop</span>
                    </button>
                </div>
                <div className="w-full justify-center inline-block text-center">
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
                </div>
            </div>
	    </section>
    );
}