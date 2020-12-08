import { Context } from "../Context";

export const Welcome = (): JSX.Element => {

    const audio: AudioContext = Context.get().audio;

    const numberOfSounds: number = audio.destination.channelCount;
    const numberOfChannels: number = audio.destination.channelCount;

    return (
        <div id="welcome-panel" className="flex h-screen">
            <div className="m-auto">
                <h1 className="text-7xl text-center p-2">Welcome to Sounds</h1>
                <h2 className="text-2xl text-center p-2">This application will allow you to create and store tracks</h2>
                <h2 className="text-2xl text-center p-2">Your device supports up to {numberOfSounds} sounds a second</h2> 
                <h2 className="text-2xl text-center p-2">Your device has {numberOfChannels} channels available</h2> 
            </div>
        </div>
    );
};