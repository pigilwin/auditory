import { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { idToSynthMap } from "../../audio/synthGenerator";
import { Button } from "../../components/Buttons";
import { PanelTitle } from "../../components/Panel";
import { addLayerAsync } from "../../store/track/trackEvent";
import { closeCreateLayer, currentlyAddingLayerSelector } from "../../store/track/trackSlice";

interface LayerPanelProps {
    trackId: string;
}
export const LayerPanel = ({trackId}: LayerPanelProps): JSX.Element | null => {
    
    const dispatch = useDispatch();
    const currentlyAddingLayer = useSelector(currentlyAddingLayerSelector);

    const closeLayer = (): void => {
        dispatch(closeCreateLayer());
    }

    if (!currentlyAddingLayer) {
        return null;
    }

    const synths = buildSynths(dispatch, trackId);
    
    return (
        <div className="w-full px-4 overflow-hidden">
            <PanelTitle title="New Layer"/>
            <p className="text-center">Choose a synth too create a new layer</p>
            <div className="grid grid-cols-8 gap-4">
                {synths}
            </div>
            <div className="w-full text-center mt-2">
                <Button disabled={false} title="Close new Layer" onClick={closeLayer}/>
            </div>
        </div>
    );
};

const buildSynths = (dispatch: Dispatch<any>, trackId: string): JSX.Element[] => {
    const buttons: JSX.Element[] = [];

    for (const key in idToSynthMap) {

        const onClickHandler = (): void => {
            dispatch(addLayerAsync(trackId, key));
        };

        buttons.push(<Button disabled={false} key={key} title={idToSynthMap[key].name} onClick={onClickHandler}/>);
    }
    return buttons;
};