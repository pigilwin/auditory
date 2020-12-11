import { SavedTrack } from "../../track/track";

interface PartContainerInterface {
    track: SavedTrack;
}

export const LayerContainer = ({track}: PartContainerInterface): JSX.Element => {
    
    const parts: JSX.Element[] = [];

    return (
        <div className="w-full flex flex-row overflow-auto mt-4 p-2">
            {parts}
        </div>
    );
}

interface PartInterface {
    part: string;
}

const Layer = ({part}: PartInterface): JSX.Element => {
    return (
        <div className="mx-2 rounded-lg mb-2 p-10 bg-yellow-300 text-center">
            <p className="font-extrabold text-2xl text-white">{part}</p>
        </div>
    );
}