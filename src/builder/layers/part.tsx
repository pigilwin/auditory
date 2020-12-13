import { Draggable } from "react-beautiful-dnd";

interface LayerPartInterface {
    onLayer: boolean;
    index: number;
    id: string;
    sound: string;
}

const defaultClasses: string[] = [
    "rounded",
    "mb-2",
    "p-2",
    "text-center"
];

export const Part = ({id, sound, onLayer, index}: LayerPartInterface): JSX.Element => {

    const classes = Array.from(defaultClasses);

    if (onLayer) {
        classes.push('bg-yellow-300');
    } else {
        classes.push('bg-indigo-700');
    }

    return (
        <Draggable index={index} key={id} draggableId={id}>
            {(provided, snapshot) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <div className={classes.join(" ")}>
                    <p className="font-extrabold text-2xl text-white">{sound}</p>
                </div>
            </div>
        )}
        </Draggable>
    );
}