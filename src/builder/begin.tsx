import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Buttons";
import { TextSingleLineInput } from "../components/Inputs";
import { createTrack } from "../store/trackEvent";
import { useValidation } from "../validation/validation";

export const Begin = (): JSX.Element => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [state, setFormState, validate, errors] = useValidation({
        trackName: {
            value: '',
            validator: (value: string): string | null => {
                if (value.length === 0) {
                    return 'A value must be supplied';
                }
                return null;
            }
        }
    });

    const createNewTrackClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (!validate()) {
            event.preventDefault();
            return;
        }
        console.log('called', state);
        //dispatch(createTrack(state.trackName));
    };

    const saveTrackNameHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const {currentTarget} = event;
        const {value} = currentTarget;
        setFormState({
            trackName: value
        });
    };

    const loadExistingTracksClickHandler = (): void => {
        history.push('/tracks');
    };

    return (
        <div className="container mx-auto flex flex-col w-1/2">
            <TextSingleLineInput 
                error={errors.trackName} 
                id="track-name" 
                title="Track Name"
                onKeyUp={saveTrackNameHandler}
            />
            <div className="flex flex-row">
                <div className="w-1/2 text-center">
                    <Button id="create-new-track" title="Create New Track" onClick={createNewTrackClickHandler}/>
                </div>
                <div className="w-1/2 text-center">
                    <Button id="load-tracks" title="Load Existing Tracks" onClick={loadExistingTracksClickHandler}/>
                </div>
            </div>
        </div>
    );
};