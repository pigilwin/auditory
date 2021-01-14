import { useDispatch } from "react-redux";
import { RangeInput } from "../../../components/Inputs";
import { updateVolumeAsync } from "../../../store/track/asyncActions/asyncControlActions";

interface VolumeProps {
    trackId: string;
    volume: number;
}
export const Volume = ({trackId, volume}: VolumeProps): JSX.Element => {
    
    const dispatch = useDispatch();

    const volumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(updateVolumeAsync(event.currentTarget.valueAsNumber, trackId));
    };

    
    return (
        <div className="w-full text-center">
            <RangeInput
                min={-10}
                max={0}
                value={volume}
                step={1}
                title="Volume"
                onChange={volumeChange}
                error=""
            />
        </div>
    );
}