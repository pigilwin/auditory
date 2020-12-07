import { createStore } from '@reduxjs/toolkit';
import { Track } from "../track/track";

const tracks = (state: Track[], action: StoreAction) => {

};

export const store = createStore(tracks, []);

export interface StoreAction {
    type: string;
}