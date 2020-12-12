import { Draggable } from "react-beautiful-dnd";
import { LayerPart } from "../../track/track";

interface LayerPartInterface {
    part: LayerPart;
    onLayer: boolean;
    index: number;
}

const defaultClasses: string[] = [
    "mx-2",
    "rounded",
    "mb-2",
    "p-6",
    "text-center"
];

export const Part = ({part, onLayer, index}: LayerPartInterface): JSX.Element => {

    const classes = Array.from(defaultClasses);

    if (onLayer) {
        classes.push('bg-yellow-300');
    } else {
        classes.push('bg-indigo-700');
    }

    return (
        <Draggable index={index} key={part.note} draggableId={part.note}>
            {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <div className={classes.join(" ")}>
                    <p className="font-extrabold text-2xl text-white">{part.note}</p>
                </div>
            </div>
        )}
        </Draggable>
    );
}