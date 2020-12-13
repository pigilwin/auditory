import { useDispatch, useSelector } from "react-redux";
import { trackSelector } from "../store/track/trackSlice";
import { welcomeSelector } from "../store/welcome/welcomeSlice";
import { ControlPanel } from "./controls/panel";
import { SoundsPanel } from "./sounds/panel";
import { Welcome } from './Welcome';
import { Begin } from './Begin';
import { Title } from "./Title";
import { LayerContainer } from './layers/container';
import { SavedTrack } from "../store/track/trackTypes";
import { DragDropContext, DropResult, ResponderProvided } from "react-beautiful-dnd";
import { addSoundAsync, moveSoundToLayerAsync, moveSoundWithinLayerAsync } from "../store/track/trackEvent";
import { idResolver } from "../lib/id";

export const Main = (): JSX.Element => {

    const dispatch = useDispatch();
    const hasUsedWelcomeMessage = useSelector(welcomeSelector);
    const trackState = useSelector(trackSelector);

    /**
     * If the user has never accessed the system, 
     * show them the welcome message
     */
    if (!hasUsedWelcomeMessage){
        return (<Welcome/>);
    }

    /**
     * If the current track id is zero then now track is selected
     * Show the create new / load existing track buttons
     */
    if (trackState.currentTrackId.length === 0) {
        return (<Begin/>);
    }

    const track: SavedTrack = trackState.tracks[trackState.currentTrackId];

    if (track === null) {
        return (<Begin/>);
    }

    const handleDragDrop = (result: DropResult, provided: ResponderProvided) => {
        
        const trackId: string = track.id;
        const {destination, draggableId: soundId, source} = result;
    
        /**
         * If the destination is null then the sound was not dropped
         * on a layer so we will just return and move on
         */
        if (destination === undefined || destination === null) {
            return;
        }

        const {droppableId: layerId, index: locationInLayer} = destination;
        const {index: previousLocationInLayer} = source;
        const [resolvedLayerId, resolvedSoundId] = idResolver(soundId);

        /**
         * If the index within the sound id is null
         * then its a new sound being added
         */
        if (resolvedSoundId === undefined) {
            dispatch(addSoundAsync({
                soundId,
                layerId,
                trackId
            }));
            return;
        }

        if (layerId === resolvedLayerId) {
            dispatch(moveSoundWithinLayerAsync({
                trackId: trackId,
                layerId: layerId,
                previousIndex: previousLocationInLayer,
                index: locationInLayer,
                soundId: resolvedSoundId
            }));
            return;
        }

        dispatch(moveSoundToLayerAsync({
            trackId: trackId,
            layerId: layerId,
            previousLayerId: resolvedLayerId,
            soundId: resolvedSoundId,
            index: previousLocationInLayer
        }));
    };

    return (
        <DragDropContext onDragEnd={handleDragDrop}>
            <div id="main-panel" className="container mx-auto flex flex-wrap overflow-hidden">
                <div className="w-full">
                    <Title title={"Track Name: " + track.name}/>
                </div>
                <SoundsPanel/>
                <ControlPanel id={trackState.currentTrackId} track={track}/>
                <LayerContainer track={track}/>
            </div>
        </DragDropContext>
    );
}