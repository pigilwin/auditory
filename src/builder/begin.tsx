import { Button } from "../components/Buttons"
import { TextSingleLineInput } from "../components/Inputs";
import { PanelTitle } from "../components/Panel"

export const Begin = (): JSX.Element => {

    const createNewTrackClickHandler = (): void => {

    };

    const loadExistingTracksClickHandler = (): void => {

    };

    const saveTrackNameHandler = (): void => {

    };

    return (
        <div className="container mx-auto flex flex-wrap overflow-hidden">
            <div className="w-1/2 flex flex-col">
                <div className="w-full p-5">
                    <PanelTitle title="Create New"/>
                </div>
                <div className="w-full p-5">
                    <TextSingleLineInput id="track-name" title="Track Name" onKeyUp={saveTrackNameHandler}/>
                </div>
                <div className="w-full text-center p-5">
                    <Button id="create-new-track" title="Create New Track" onClick={createNewTrackClickHandler}/>
                </div>
            </div>
            <div className="w-1/2 flex flex-col">
                <div className="w-full p-5">
                    <PanelTitle title="Load Existing"/>
                </div>
                <div className="w-full text-center">
                    <Button id="load-tracks" title="Load Tracks" onClick={loadExistingTracksClickHandler}/>
                </div>
            </div>
        </div>
    );
};