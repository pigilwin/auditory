import { Button } from "../components/Buttons";
import { TextSingleLineInput } from "../components/Inputs";

export const Begin = (): JSX.Element => {

    const createNewTrackClickHandler = (): void => {

    };

    const loadExistingTracksClickHandler = (): void => {

    };

    const saveTrackNameHandler = (): void => {

    };

    return (
        <div className="container mx-auto flex flex-col w-1/2">
            <TextSingleLineInput id="track-name" title="Track Name" onKeyUp={saveTrackNameHandler}/>
            <div className="flex flex-row">
                <div className="w-1/2 text-center">
                    <Button id="create-new-track" title="Create New Track" onClick={createNewTrackClickHandler}/>
                </div>
                <div className="w-1/2 text-center">
                    <Button id="load-tracks" title="Or load existing tracks" onClick={loadExistingTracksClickHandler}/>
                </div>
            </div>
        </div>
    );
};