import {start, context, Synth, Transport, PolySynth, Part } from 'tone';
import { getToneCode } from '../builder/sounds/sounds';
import { Layer, SavedTrack } from '../store/track/trackTypes';
export class Audio {

    public static numberOfChannels(): number {
        return context.destination.channelCount;
    }

    public static numberOfSamples(): number {
        return context.sampleRate;
    }

    public static async playTrack(track: SavedTrack): Promise<void> {
        await start();

        new PolySynth(Synth, {
            oscillator : {
                count: 6,
                spread: 80,
                type : "fatsawtooth"
            }
        }).toDestination();

        for (const layerId in track.layers) {

            const sounds = Audio.convertSoundsToPart(track.layers[layerId]);
            const synth = new PolySynth(Synth, {
                oscillator : {
                      type : "sawtooth"
                  }
            }).toDestination();

            new Part((time: number, note: PartableSound) => {
                synth.triggerAttackRelease(note.note, note.duration, time);
            }, sounds).start(0);
        }

        Transport.start();
    }

    public static isPlaying(): boolean {
        return Transport.state === 'started';
    }

    public static stop(): void
    {
        Transport.stop();
    }

    private static convertSoundsToPart(sounds: Layer): PartableSound[] {
        const partableSounds: PartableSound[] = [];
        for (const sound in sounds) {
            partableSounds.push({
                note: getToneCode(sound),
                duration: '2n'
            });
        }
        return partableSounds;
    }
}

interface PartableSound {
    note: string;
    duration: string;
}