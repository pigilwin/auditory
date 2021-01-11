import { RangeInput } from "../../components/Inputs";
import { Play, Stop } from "../../components/Icon";
import { SavedTrack } from "../../store/track/trackTypes";
import { useDispatch, useSelector } from "react-redux";
import { updateVolumeAsync, updatePannerAsync } from "../../store/track/trackAsyncAction";
import { Audio } from "../../audio/audio";
import { currentlyPlayingSelector, pause, play } from "../../store/track/trackSlice";

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

    const startTrack = async (): Promise<void> => {
        dispatch(play());
        await Audio.playTrack(track);
    };

    const stopTrack = (): void => {
        dispatch(pause());
        Audio.stop();
    };

    const isTrackRunning = useSelector(currentlyPlayingSelector);
    console.log(isTrackRunning);

    return (
        <section id="bottom-navigation" className="block fixed inset-x-0 bottom-0 z-10 shadow">
            <div id="tabs" className="flex justify-between">
                <div className="w-full text-center">
                    <RangeInput
                        min={-10}
                        max={0}
                        value={track.control.volume}
                        step={1}
                        title="Volume"
                        onChange={volumeChange}
                        error=""
                    />
                </div>
                <div className="w-full justify-center inline-block text-center cursor-pointer pt-2 pb-1">
                    <button className="disabled:opacity-25" disabled={isTrackRunning} onClick={startTrack}>
                        <Play/>
                        <span className="tab tab-kategori block text-xs dark:text-white">Play</span>
                    </button>
                </div>
                <div className="w-full justify-center inline-block text-center cursor-pointer pt-2 pb-1">
                    <button className="disabled:opacity-25" disabled={!isTrackRunning} onClick={stopTrack}>
                        <Stop/>
                        <span className="tab tab-whishlist block text-xs dark:text-white">Stop</span>
                    </button>
                </div>
                <div className="w-full justify-center inline-block text-center">
                    <RangeInput
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