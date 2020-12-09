import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { v4 } from 'uuid';
import { SavedTrack, SavedTrackMap } from '../track/track';

export const database = async (): Promise<Database> => {
    const database = await openDB<TrackDatabase>('tracks', 1, {
        upgrade: (db) => {
            db.createObjectStore('tracks');
        }
    });
    return new Database(database);
}

export class Database {
    public constructor(private readonly db: IDBPDatabase<TrackDatabase>) {}

    public async createTrack(name: string): Promise<SavedTrack> {
        const transaction = this.db.transaction('tracks', 'readwrite');
        const store = transaction.objectStore('tracks');
        const track: SavedTrack = {
            id: v4(),
            name: name,
            date: (new Date()).toISOString(),
            parts: [],
            panner: 0,
            volume: 10,
            looping: false
        };
        await store.put(track, track.id);
        await transaction.done;
        
        return track;
    }

    public async read(): Promise<SavedTrackMap> {
        const transaction = this.db.transaction('tracks');
        const store = transaction.objectStore('tracks');
        const tracks: SavedTrack[] = await store.getAll();
        const map: SavedTrackMap = {};
        for (const track of tracks) {
            map[track.id] = track;
        }
        await transaction.done;
        return map;
    }

    public async updateTrack(track: SavedTrack): Promise<void> {
        const transaction = this.db.transaction('tracks', 'readwrite');
        const store = transaction.objectStore('tracks');
        await store.put(track, track.id);
        await transaction.done;
    }
}

interface TrackDatabase extends DBSchema {
    tracks: {
        key: string;
        value: SavedTrack;
    }
}