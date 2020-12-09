import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "../components/Buttons";
import { TextSingleLineInput } from "../components/Inputs";
import { createTrack } from "../store/trackEvent";

export const Begin = (): JSX.Element => {

    const initialState: {
        trackName: string;
        trackNameError: string;
    } = {
        trackName: '',
        trackNameError: ''
    };

    const [formState, setFormState] = useState(initialState);
    const history = useHistory();
    const dispatch = useDispatch();

    const createNewTrackClickHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        if (formState.trackNameError.length > 0) {
            event.preventDefault();
            return;
        }
        dispatch(createTrack(formState.trackName));
    };

    const saveTrackNameHandler = (event: React.KeyboardEvent<HTMLInputElement>): void => {
        const {currentTarget} = event;
        const {value} = currentTarget;
        
        if (value.length === 0) {
            setFormState({
                trackName: '',
                trackNameError: 'A value must be provided'
            });
            return;
        }

        setFormState({
            trackName: value,
            trackNameError: ''
        });
    };

    const loadExistingTracksClickHandler = (): void => {
        history.push('/tracks');
    };

    return (
        <div className="container mx-auto flex flex-col w-1/2">
            <TextSingleLineInput error={formState.trackNameError} id="track-name" title="Track Name" onKeyUp={saveTrackNameHandler}/>
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