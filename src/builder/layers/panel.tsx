import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, ToggleSwitch} from "../../components/Inputs";
import { addLayerAsync } from "../../store/track/trackEvent";
import { closeCreateLayer } from "../../store/track/trackSlice";
import { SynthSelector } from "../components/SynthSelector";

interface LayerPanelProps {
    trackId: string;
}
export const LayerPanel = ({trackId}: LayerPanelProps): JSX.Element => {
    
    const dispatch = useDispatch();
    const [synthId, setSynthId] = useState('');
    const [looping, setLooping] = useState(false);

    const createLayerHandler = (): void => {
        if (synthId.length === 0) {
            return;
        }
        dispatch(addLayerAsync(trackId, synthId, looping));
    }

    const closeLayer = (): void => {
        dispatch(closeCreateLayer());
    }

    const onLoopChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {currentTarget} = e;
        const {checked} = currentTarget;
        setLooping(checked);
    }

    const onSynthSelectedHandler = (synthId: string): void => {
        setSynthId(synthId);
    }
    
    return (
        <div className="w-full px-4 overflow-hidden min-h-screen">
            <h1 className="text-xl p-2 dark:text-white">New Layer</h1>
            <p className="p-2 dark:text-white">Choose a synth too create a new layer</p>
            <SynthSelector
                synthId={synthId}
                onSynthSelected={onSynthSelectedHandler}
            />
            <div className="w-full text-center">
                <ToggleSwitch
                    title="Loop?"
                    value={looping}
                    onChange={onLoopChangeHandler}
                    error=""
                />
            </div>
            <div className="w-full flex flex-row">
                <div className="w-1/2 text-center mt-2">
                    <Button disabled={false} title="Add new Layer" onClick={createLayerHandler}/>
                </div>
                <div className="w-1/2 text-center mt-2">
                    <Button disabled={false} title="Close new Layer" onClick={closeLayer}/>
                </div>
            </div>
        </div>
    );
};