import { useDispatch } from "react-redux";
import { Audio } from "../audio/audio";
import { Button } from "../components/Buttons";
import { Context } from "../lib/Context";
import { acceptWelcomeMessage } from "../store/welcomeSlice";

export const Welcome = (): JSX.Element => {

    const audio: Audio = Context.get().audio;
    const numberOfChannels: number = audio.numberOfChannels;
    const dispatch = useDispatch();

    const letsBeginClickHandler = (): void => {
        dispatch(acceptWelcomeMessage(true));
    };

    return (
        <div id="welcome-panel" className="flex h-screen">
            <div className="m-auto">
                <h1 className="text-7xl text-center p-2">Welcome to Sounds</h1>
                <h2 className="text-2xl text-center p-2">This application will allow you to create and store tracks</h2> 
                <h2 className="text-2xl text-center p-2">Your device has {numberOfChannels} channels available</h2>
                <div className="text-center">
                    <Button onClick={letsBeginClickHandler} title="Lets Begin"/>
                </div>
            </div>
        </div>
    );
};