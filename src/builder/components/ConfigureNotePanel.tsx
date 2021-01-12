import { useDispatch, useSelector } from "react-redux";
import { Button, DeleteButton } from "../../components/Inputs";
import { unselectNote } from "../../store/track/trackSlice";
import { SavedTrack } from "../../store/track/trackTypes";
import { getName } from "../../audio/sounds";
import { deleteNoteAsync } from "../../store/track/asyncActions/asyncNoteActions";
import { currentlySelectedNoteIndexSelector } from "../../store/track/trackSelectors";

interface ConfigureNotePanelProps {
    track: SavedTrack;
}

export const ConfigureNotePanel = ({track}: ConfigureNotePanelProps): JSX.Element | null => {
    
    const dispatch = useDispatch();
    const note = useSelector(currentlySelectedNoteIndexSelector);

    if (note.layerId.length === 0 || note.index === -1) {
        return null;
    }

    const sound = track.layers[note.layerId].sounds[note.index];

    const soundName = getName(sound.id);

    const deleteNoteClickHandler = (): void => {
        dispatch(deleteNoteAsync(note.index, note.layerId, track.id));
    };

    const doneNoteClickHandler = (): void => {
        dispatch(unselectNote());
    };

    return (
        <div className="w-1/2 shadow-md rounded-md bg-gray-200 dark:bg-gray-600 mx-auto m-4">
            <h1 className="text-center p-2 text-2xl dark:text-white">Note Configuration for {soundName}</h1>
            <div className="w-full">

            </div>
            <div className="grid grid-cols-2 gap-4 p-2">
                <DeleteButton disabled={false} title="Delete Note" onClick={deleteNoteClickHandler}/>
                <Button disabled={false} title="Close" onClick={doneNoteClickHandler}/>
            </div>
        </div>
    );
}