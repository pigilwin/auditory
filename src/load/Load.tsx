import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Title, Button, DeleteButton } from "../components/components";
import { deleteTrackAsync } from "../store/track/trackEvent";
import { loadTrack, tracksSelector } from "../store/track/trackSlice";
import { acceptWelcomeMessage } from "../store/welcome/welcomeSlice";
import { SavedTrack } from "../store/track/trackTypes";

export const LoadPanel = (): JSX.Element => {

    const dispatch = useDispatch();
    const history = useHistory();
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
        const clickHandler = () => {
            dispatch(acceptWelcomeMessage(true));
            history.push('/');
        };

        elements.push(<h1 className="text-2xl text-center">Saved tracks will appear here when they are created. You have no tracks saved currently.</h1>);
        elements.push(<div className="text-center"><Button title="Create New Track" onClick={clickHandler} disabled={false}/></div>);
    }

    return (
        <div className="container mx-auto flex flex-wrap overflow-hidden">
            <div className="text-center w-full">
                <Title title="Load Tracks"/>
            </div>
            <ul className="w-1/2 mx-auto justify-center">
                {elements}
            </ul>
        </div>
    );
}

interface SavedTrackListItemInterface {
    id: string;
    name: string;
    date: string;
}
const SavedTrackListItem = (value: SavedTrackListItemInterface): JSX.Element => {

    const dispatch = useDispatch();
    const history = useHistory();

    const clickHandler = () => {
        dispatch(acceptWelcomeMessage(true));
        dispatch(loadTrack(value.id));
        history.push('/tracks');
    };

    const deleteHandler = () => {
        dispatch(deleteTrackAsync(value.id));
    };

    return (
        <li className="p-4 w-full mx-auto flex flex-row shadow-md rounded-md bg-gray-300">
            <div className="w-1/3 my-auto">
                <h4 className="text-center text-2xl">{value.name}</h4>
            </div>
            <div className="w-1/3 text-center">
                <Button disabled={false} title="Load Track" onClick={clickHandler}/>
            </div>
            <div className="w-1/3 text-center">
                <DeleteButton disabled={false} title="Delete Track" onClick={deleteHandler}/>
            </div>
        </li>
    );
};