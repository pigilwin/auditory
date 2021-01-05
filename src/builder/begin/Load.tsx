import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, DeleteButton } from "../../components/components";
import { deleteTrackAsync } from "../../store/track/trackEvent";
import { loadTrack, tracksSelector } from "../../store/track/trackSlice";
import { acceptWelcomeMessage } from "../../store/welcome/welcomeSlice";
import { SavedTrack } from "../../store/track/trackTypes";

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
        <div className="container w-1/2 flex flex-wrap overflow-hidden">
            <h1 className="text-2xl w-full text-center">Load</h1>
            <ul className="justify-center ml-2">
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
        <li className="p-4 w-full mx-auto flex flex-row shadow-md rounded-md bg-gray-300">
            <div className="w-1/3 p-2 my-auto">
                <h4 className="text-center text-2xl">{name}</h4>
            </div>
            <div className="w-1/3 p-2 text-center">
                <Button disabled={false} title="Load Track" onClick={clickHandler}/>
            </div>
            <div className="w-1/3 p-2 text-center">
                <DeleteButton disabled={false} title="Delete Track" onClick={deleteHandler}/>
            </div>
        </li>
    );
};