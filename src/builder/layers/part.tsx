import { LayerPart } from "../../track/track";

interface LayerPartInterface {
    part: LayerPart;
}

export const Part = ({part}: LayerPartInterface): JSX.Element => {
    return (
        <div className="mx-2 rounded-lg mb-2 p-10 bg-yellow-300 text-center">
            <p className="font-extrabold text-2xl text-white">{part.note}</p>
        </div>
    );
}