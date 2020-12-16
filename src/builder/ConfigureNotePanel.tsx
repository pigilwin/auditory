import { useSelector } from "react-redux";
import { DeleteButton } from "../components/Buttons";
import { currentlySelectedLayerSelector, currentlySelectedNoteIndexSelector } from "../store/track/trackSlice";
import { SavedTrack } from "../store/track/trackTypes";
import { getName } from "./sounds/sounds";

interface ConfigureNotePanelProps {
    track: SavedTrack;
    hidden: boolean;
}

export const ConfigureNotePanel = ({track, hidden}: ConfigureNotePanelProps): JSX.Element => {
    
    const note = useSelector(currentlySelectedNoteIndexSelector);

    if (note.layerId.length === 0 || note.index === -1) {
        return (<div/>);
    }

    const sound = getName(track.layers[note.layerId][note.index].id);

    const deleteNoteClickHandler = (): void => {

    };

    const classNames = ['w-1/3','shadow-md','bg-gray-200'];
    
    if (hidden) {
        classNames.push('hidden');
    }
    
    return (
        <div className={classNames.join(' ')}>
            <h1 className="text-center p-2 text-2xl">Note Configuration for {sound}</h1>
            <div className="grid grid-cols-1 gap-4">
                <div className="text-center p-2">
                    <DeleteButton disabled={false} title="Delete Note" onClick={deleteNoteClickHandler}/>
                </div>
            </div>
        </div>
    );
}