import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, DeleteButton } from "../../components/Inputs";
import { loadTrack, tracksSelector } from "../../store/track/trackSlice";
import { acceptWelcomeMessage } from "../../store/welcome/welcomeSlice";
import { SavedTrack } from "../../store/track/trackTypes";
import { deleteTrackAsync } from "../../store/track/asyncActions/asyncTrackActions";

export const LoadPanel = (): JSX.Element | null => {

    const tracks = useSelector(tracksSelector);

    const elements: JSX.Element[] = [];
    for (const key in tracks) {
        const track: SavedTrack = tracks[key];
        elements.push(
            <SavedTrackListItem 
                key={track.id} 
                id={track.id} 
                name={track.name} 
                date={track.date}
            />
        );
    }

    if (elements.length === 0) {
        return null;
    }

    return (
        <div className="w-full flex flex-wrap overflow-hidden p-5">
            <h1 className="text-2xl w-full text-center dark:text-white">Load</h1>
            <ul className="justify-center ml-2 w-full">
                {elements}
            </ul>
        </div>
    );
}

interface SavedTrackListItemProps {
    id: string;
    name: string;
    date: string;
}
const SavedTrackListItem = ({id, name, date}: SavedTrackListItemProps): JSX.Element => {

    const dispatch = useDispatch();
    const history = useHistory();

    const clickHandler = () => {
        dispatch(acceptWelcomeMessage(true));
        dispatch(loadTrack(id));
        history.push('/tracks');
    };

    const deleteHandler = () => {
        dispatch(deleteTrackAsync(id));
    };

    return (
        <li className="p-2 w-full shadow-md rounded-md bg-gray-300 dark:bg-gray-500">
            <h4 className="text-center text-2xl dark:text-white">{name}</h4>
            <div className="grid grid-cols-2 p-2 gap-4">
                <Button disabled={false} title="Load Track" onClick={clickHandler}/>
                <DeleteButton disabled={false} title="Delete Track" onClick={deleteHandler}/>
            </div>
        </li>
    );
};