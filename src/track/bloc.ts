import { Bloc } from "@felangel/bloc";
import { AbstractTrackState } from "./state";
import { AbstractTrackEvent } from './event';


export class TrackBloc extends Bloc<AbstractTrackEvent, AbstractTrackState> {

    async *mapEventToState(event: AbstractTrackEvent): AsyncIterableIterator<AbstractTrackState> {
        
    }
}