import { useDispatch, useSelector } from "react-redux";
import { PanelTitle } from "../../components/Panel";
import { currentlyAddingLayerSelector } from "../../store/track/trackSlice";

export const LayerPanel = (): JSX.Element | null => {
    
    const dispatch = useDispatch();
    const currentlyAddingLayer = useSelector(currentlyAddingLayerSelector);

    const closeLayer = (): void => {
        //dispatch();
    }

    if (!currentlyAddingLayer) {
        return null;
    }
    
    return (
        <div className="w-full px-4 overflow-hidden">
            <PanelTitle title="New Layer"/>
        </div>
    );
};