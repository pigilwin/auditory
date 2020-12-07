import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { SavedTrack, Track } from '../track/track';

export const database =  async (): Promise<Database> => {
    const database = await openDB<TrackDatabase>('tracks');
    return new Database(database);
}

class Database {
    public constructor(private readonly db: IDBPDatabase<TrackDatabase>) {}

    public read(): Array<Track> {
        return [];
    }
}

interface TrackDatabase extends DBSchema {
    tracks: {
        key: string;
        value: SavedTrack;
    }
}