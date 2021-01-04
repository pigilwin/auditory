import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Buttons";
import { TextSingleLineInput } from "../components/Inputs";
import { useValidation } from "../lib/validation";
import { createTrackAsync } from "../store/track/trackEvent";
import { trackNameSelector } from "../store/track/trackSlice";

export const Begin = (): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
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

    const saveTrackNameHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const {currentTarget} = event;
        const {value} = currentTarget;
        setFormState({
            trackName: value
        });
    };

    const loadExistingTracksClickHandler = (): void => {
        history.push('/load');
    };

    return (
        <div className="container mx-auto flex flex-col w-1/2">
            <h1 className="text-2xl text-center">To begin using sounds, either create a new track below or view exisitng tracks.</h1>
            <TextSingleLineInput 
                error={errors.trackName} 
                id="track-name" 
                title="Track Name"
                onKeyUp={saveTrackNameHandler}
            />
            <div className="flex flex-row">
                <div className="w-1/2 text-center">
                    <Button disabled={false} title="Create New Track" onClick={createNewTrackClickHandler}/>
                </div>
                <div className="w-1/2 text-center">
                    <Button disabled={false} title="Load Existing Tracks" onClick={loadExistingTracksClickHandler}/>
                </div>
            </div>
        </div>
    );
};