import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { SavedTrack } from '../store/track/trackTypes';

export const openDatabase = async (): Promise<IDBPDatabase<TrackDatabase>> => {
    return await openDB<TrackDatabase>('tracks', 1, {
        upgrade: (db) => {
            db.createObjectStore('tracks');
        }
    }); 
}

interface TrackDatabase extends DBSchema {
    tracks: {
        key: string;
        value: SavedTrack;
    }
}