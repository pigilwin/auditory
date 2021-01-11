import { useDispatch } from "react-redux";
import { editNoteForLayer } from '../../store/track/trackSlice';

interface LayerPartComponentProps {
    sound: string;
    index: number;
    layer: string;
}

export const NotePart = ({sound, index, layer}: LayerPartComponentProps): JSX.Element => {
    const dispatch = useDispatch();
    const classes: string[] = [
        "rounded",
        "p-2",
        "mx-1",
        "text-center",
        "bg-yellow-400",
        "cursor-pointer"
    ];

    const showConfigurationPanel = (): void => {
        dispatch(editNoteForLayer({
            index: index,
            layerId: layer
        }));
    };

    return (
        <div onClick={showConfigurationPanel} className={classes.join(" ")}>
            <p className="font-extrabold p-2 text-2xl text-white">{sound}</p>
        </div>
    );
}