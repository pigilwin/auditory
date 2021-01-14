import { useDispatch, useSelector } from "react-redux";
import { TextSingleLineInput, Button } from "../../components/Inputs";
import { useValidation } from "../../lib/validation";
import { createTrackAsync } from "../../store/track/asyncActions/asyncTrackActions";
import { trackNameSelector } from "../../store/track/trackSelectors";

export const CreateNew = (): JSX.Element => {
    const dispatch = useDispatch();
    const trackNames = useSelector(trackNameSelector);
    const [state, setFormState, validate, errors] = useValidation({
        trackName: {
            value: '',
            validator: (value: string): string | null => {
                if (value.length === 0) {
                    return 'A value must be supplied';
                }

                if (trackNames.includes(value)) {
                    return 'This track name already exists';
                }

                return null;
            }
        }
    });

    const createNewTrackClickHandler = (): void => {
        if (!validate()){
            return;
        }
        dispatch(createTrackAsync(state.trackName));
    };

    const saveTrackNameHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {currentTarget} = event;
        const {value} = currentTarget;
        setFormState({
            trackName: value
        });
    };
    
    
    return (
        <div className="container p-5">
            <h1 className="text-2xl w-full text-center">Create New</h1>
            <TextSingleLineInput 
                value={state.trackName}
                error={errors.trackName}
                title="Track Name"
                onChange={saveTrackNameHandler}
            />
            <Button
                disabled={false} 
                title="Create New Track" 
                onClick={createNewTrackClickHandler}
            />
        </div>
    );
}