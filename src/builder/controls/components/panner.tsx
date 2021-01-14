import { useDispatch } from "react-redux";
import { RangeInput } from "../../../components/Inputs";
import { updatePannerAsync } from "../../../store/track/asyncActions/asyncControlActions";

interface PannerProps {
    trackId: string;
    panner: number;
}
export const Panner = ({trackId, panner}: PannerProps): JSX.Element => {
    
    const dispatch = useDispatch();
    const pannerHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updatePannerAsync(event.currentTarget.valueAsNumber, trackId));
    };
    
    return (
        <div className="w-full justify-center inline-block text-center">
            <RangeInput
                min={-1}
                max={1}
                value={panner}
                step={1}
                title="Left & Right"
                onChange={pannerHandler}
                error=""
            />
        </div>
    );
}