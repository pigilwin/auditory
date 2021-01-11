import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { SavedTrack } from '../store/track/trackTypes';
import { Configuration } from './configuration';

export const openDatabase = async (): Promise<IDBPDatabase<TrackDatabase>> => {
    return await openDB<TrackDatabase>('sounds', 1, {
        upgrade: (db) => {
            db.createObjectStore('tracks');
            db.createObjectStore('configuration');
        }
    });
}

interface TrackDatabase extends DBSchema {
    tracks: {
        key: string;
        value: SavedTrack;
    },
    configuration: {
        key: string;
        value: Configuration;
    }
}