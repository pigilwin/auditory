import { LayerPart } from "../../track/track";

interface LayerPartInterface {
    part: LayerPart;
    onLayer: boolean;
}

const defaultClasses: string[] = [
    "mx-2",
    "rounded",
    "mb-2",
    "p-10",
    "text-center"
];

export const Part = ({part, onLayer}: LayerPartInterface): JSX.Element => {

    const classes = Array.from(defaultClasses);

    if (onLayer) {
        classes.push('bg-yellow-300');
    } else {
        classes.push('bg-indigo-700');
    }

    return (
        <div className={classes.join(" ")}>
            <p className="font-extrabold text-2xl text-white">{part.note}</p>
        </div>
    );
}