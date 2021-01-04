import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { idToSynthMap } from "../../audio/synthGenerator";
import { Button } from "../../components/Buttons";
import { ToggleSwitch } from "../../components/Inputs";
import { addLayerAsync } from "../../store/track/trackEvent";
import { closeCreateLayer, currentlyAddingLayerSelector } from "../../store/track/trackSlice";

interface LayerPanelProps {
    trackId: string;
}
export const LayerPanel = ({trackId}: LayerPanelProps): JSX.Element | null => {
    
    const dispatch = useDispatch();
    const currentlyAddingLayer = useSelector(currentlyAddingLayerSelector);

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

    if (!currentlyAddingLayer) {
        return null;
    }

    const synths = buildSynths(synthId, setSynthId);
    
    return (
        <div className="w-full px-4 overflow-hidden">
            <h1 className="text-xl p-2">New Layer</h1>
            <p className="p-2">Choose a synth too create a new layer</p>
            <div className="grid grid-cols-8 gap-4 p-2">
                {synths}
            </div>
            <div className="w-full text-center">
                <ToggleSwitch
                    title="Loop?"
                    value={looping}
                    id="loop-layer"
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

const buildSynths = (synthId: string, setSynthId: Dispatch<SetStateAction<string>>): JSX.Element[] => {
    const buttons: JSX.Element[] = [];

    for (const key in idToSynthMap) {

        const additionalClasses: string[] = [];

        if (key === synthId) {
            additionalClasses.push('border-4', 'border-green-400');
        }

        const onClickHandler = (): void => {
            setSynthId(key);
        };

        buttons.push(<Button additionalClasses={additionalClasses} disabled={false} key={key} title={idToSynthMap[key].name} onClick={onClickHandler}/>);
    }
    return buttons;
};