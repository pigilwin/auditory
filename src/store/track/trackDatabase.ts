import { v4 } from 'uuid';
import { openDatabase } from '../../lib/database';
import { SavedTrack, SavedTrackMap } from './trackTypes';

export class TrackDatabase {
   
    public static async createTrack(name: string): Promise<SavedTrack> {
        const database = await openDatabase();
        const transaction = database.transaction('tracks', 'readwrite');
        const store = transaction.objectStore('tracks');
        const track: SavedTrack = {
            id: v4(),
            name: name,
            date: (new Date()).toISOString(),
            layers: {},
            control: {
                panner: 0,
                volume: 10
            }
        };
        await store.put(track, track.id);
        await transaction.done;

        return track;
    }

    public static async read(): Promise<SavedTrackMap> {
        const database = await openDatabase();
        const transaction = database.transaction('tracks');
        const store = transaction.objectStore('tracks');
        const tracks: SavedTrack[] = await store.getAll();
        const map: SavedTrackMap = {};
        for (const track of tracks) {
            map[track.id] = track;
        }
        await transaction.done;
        return map;
    }

    public static async updateTrack(track: SavedTrack): Promise<void> {
        const database = await openDatabase();
        const transaction = database.transaction('tracks', 'readwrite');
        const store = transaction.objectStore('tracks');
        await store.put(track, track.id);
        await transaction.done;
    }

    public static async deleteTrack(id: string): Promise<void> {
        const database = await openDatabase();
        const transaction = database.transaction('tracks', 'readwrite');
        const store = transaction.objectStore('tracks');
        store.delete(id);
        await transaction.done;
    }
}