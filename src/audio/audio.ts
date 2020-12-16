import {start, context } from 'tone';
import { SavedTrack } from '../store/track/trackTypes';
export class Audio {

    public static numberOfChannels(): number {
        return context.destination.channelCount;
    }

    public static numberOfSamples(): number {
        return context.sampleRate;
    }

    public static async playTrack(track: SavedTrack): Promise<void> {
        await start();
    }
}