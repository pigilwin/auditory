import { SavedTrack, Layer, LayerPart } from "../../track/track";

interface PartContainerInterface {
    track: SavedTrack;
}

export const LayerContainer = ({track}: PartContainerInterface): JSX.Element => {
    
    const layers: JSX.Element[] = [];
    for (const key in track.layers) {
        return (<LayerRow layer={track.layers[key]}/>);
    }

    return (
        <div className="w-full grid grid-cols-1 grid-flow-col">
            {layers}
        </div>
    );
}

interface LayerRowInterface {
    layer: Layer;
}

const LayerRow = ({layer}: LayerRowInterface): JSX.Element => {
    const parts: JSX.Element[] = [];
    for (const key in layer) {
        parts.push(<Part part={layer[key]}/>);
    }

    return (
        <div className="w-full flex flex-row overflow-auto mt-4 p-2">
            {parts}
        </div>
    );
}

interface LayerPartInterface {
    part: LayerPart;
}

const Part = ({part}: LayerPartInterface): JSX.Element => {
    return (
        <div className="mx-2 rounded-lg mb-2 p-10 bg-yellow-300 text-center">
            <p className="font-extrabold text-2xl text-white">{part.note}</p>
        </div>
    );
}