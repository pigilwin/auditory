import { Draggable } from "react-beautiful-dnd";

interface ChooseableSoundPartInterface {
    index: number;
    id: string;
    sound: string;
}

export const ChooseableSoundPart = ({id, sound, index}: ChooseableSoundPartInterface): JSX.Element => {

    const classes: string[] = [
        "rounded",
        "mb-2",
        "p-2",
        "text-center",
        "bg-indigo-700"
    ];

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

interface LayerPartComponentInterface {
    id: string;
    sound: string;
    index: number;
}

export const LayerPartComponent = ({id, sound, index}: LayerPartComponentInterface): JSX.Element => {
    const classes: string[] = [
        "rounded",
        "mb-2",
        "p-2",
        "text-center",
        "bg-yellow-400"
    ];

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