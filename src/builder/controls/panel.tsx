import { useDispatch, useSelector } from "react-redux";
import { Play, Stop } from "../../components/Icon";
import { SavedTrack } from "../../store/track/trackTypes";
import { Audio } from "../../audio/audio";
import { configureSettings, pause, play } from "../../store/track/trackSlice";
import { currentlyPlayingSelector } from "../../store/track/trackSelectors";

interface ControlPanelProps {
    track: SavedTrack;
}

export const ControlPanel = ({track}: ControlPanelProps): JSX.Element => {

    const dispatch = useDispatch();

    const startTrack = async (): Promise<void> => {
        dispatch(play());
        await Audio.playTrack(track);
    }

    const configureSettingsClickHandler = (): void => {
        dispatch(configureSettings());
    }

    const stopTrack = (): void => {
        dispatch(pause());
        Audio.stop();
    }

    const isTrackRunning = useSelector(currentlyPlayingSelector);

    return (
        <section className="block fixed inset-x-0 bottom-0 z-10 shadow">
            <div className="flex justify-between">
                <div className="w-full flex justify-center cursor-pointer pt-2 pb-1">
                    <button className="disabled:opacity-25" disabled={isTrackRunning} onClick={startTrack}>
                        <Play/>
                        <span className="tab tab-kategori block text-xs">Play</span>
                    </button>
                </div>
                <div className="w-full flex justify-center cursor-pointer pt-2 pb-1">
                    <button className="disabled:opacity-25" disabled={isTrackRunning} onClick={configureSettingsClickHandler}>
                        <span className="tab tab-whishlist block text-sm">Settings</span>
                    </button>
                </div>
                <div className="w-full flex justify-center cursor-pointer pt-2 pb-1">
                    <button className="disabled:opacity-25" disabled={!isTrackRunning} onClick={stopTrack}>
                        <Stop/>
                        <span className="tab tab-whishlist block text-xs">Stop</span>
                    </button>
                </div>
            </div>
	    </section>
    );
}