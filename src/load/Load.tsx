import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Title } from "../builder/Title"
import { Button } from "../components/Buttons";
import { loadTrack, trackSelector } from "../store/trackSlice";
import { acceptWelcomeMessage } from "../store/welcomeSlice";
import { SavedTrack } from "../track/track";

export const LoadPanel = (): JSX.Element => {

    const trackState = useSelector(trackSelector);
    const elements: JSX.Element[] = [];
    for (const key in trackState.tracks) {
        const track: SavedTrack = trackState.tracks[key];
        elements.push(
            <SavedTrackListItem 
                key={track.id} 
                id={track.id} 
                name={track.name} 
                date={track.date}
            />
        );
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

    return (
        <li className="p-4 w-full mx-auto flex flex-row shadow-md rounded-md bg-gray-300">
            <div className="w-1/2 my-auto">
                <h4 className="text-center text-2xl">{value.name}</h4>
            </div>
            <div className="w-1/2 text-center">
                <Button id={value.id} title="Load Track" onClick={clickHandler}/>
            </div>
        </li>
    );
};