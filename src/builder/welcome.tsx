import { Audio } from "../audio/audio";
import { Button } from "../components/Buttons";
import { Context } from "../Context";

export const Welcome = (): JSX.Element => {

    const audio: Audio = Context.get().audio;
    const numberOfChannels: number = audio.numberOfChannels;

    const yesClickHandler = (): void => {

    };

    const noClickHandler = (): void => {

    };

    return (
        <div id="welcome-panel" className="flex h-screen">
            <div className="m-auto">
                <h1 className="text-7xl text-center p-2">Welcome to Sounds</h1>
                <h2 className="text-2xl text-center p-2">This application will allow you to create and store tracks</h2> 
                <h2 className="text-2xl text-center p-2">Your device has {numberOfChannels} channels available</h2>
                <h2 className="text-2xl text-center p-2">We have detected that this is your first time using this application?</h2>
                <div className="flex">
                    <div className="w-1/2 text-center">
                        <Button onClick={yesClickHandler} title="Yes that is correct" id="yes"/>
                    </div>
                    <div className="w-1/2 text-center">
                        <Button onClick={noClickHandler} title="No that is wrong" id="no"/>
                    </div>
                </div>
            </div>
        </div>
    );
};