import { useDispatch, useSelector } from "react-redux";
import { Button, DeleteButton } from "../components/Buttons";
import { currentlySelectedNoteIndexSelector, unselectNote } from "../store/track/trackSlice";
import { deleteNoteAsync } from '../store/track/trackEvent';
import { SavedTrack } from "../store/track/trackTypes";
import { getName } from "./sounds/sounds";

interface ConfigureNotePanelProps {
    track: SavedTrack;
    hidden: boolean;
}

export const ConfigureNotePanel = ({track, hidden}: ConfigureNotePanelProps): JSX.Element => {
    
    const dispatch = useDispatch();
    const note = useSelector(currentlySelectedNoteIndexSelector);

    if (note.layerId.length === 0 || note.index === -1) {
        return (<div/>);
    }

    const sound = getName(track.layers[note.layerId][note.index].id);

    const deleteNoteClickHandler = (): void => {
        dispatch(deleteNoteAsync(note.index, note.layerId, track.id));
    };

    const doneNoteClickHandler = (): void => {
        dispatch(unselectNote());
    };

    const classNames = ['w-1/3','shadow-md','bg-gray-200'];
    
    if (hidden) {
        classNames.push('hidden');
    }
    
    return (
        <div className={classNames.join(' ')}>
            <h1 className="text-center p-2 text-2xl">Note Configuration for {sound}</h1>
            <div className="grid grid-cols-2 gap-4 p-2">
                <DeleteButton disabled={false} title="Delete Note" onClick={deleteNoteClickHandler}/>
                <Button disabled={false} title="Close" onClick={doneNoteClickHandler}/>
            </div>
        </div>
    );
}