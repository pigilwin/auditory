import { start, context, Synth, Transport, Part, Panner } from 'tone';
import { getToneCode } from '../builder/sounds/sounds';
import { SavedTrack } from '../store/track/trackTypes';
export class Audio {

    public static numberOfChannels(): number {
        return context.destination.channelCount;
    }

    public static numberOfSamples(): number {
        return context.sampleRate;
    }

    public static async playTrack(track: SavedTrack): Promise<void> {
                
        if (Audio.isPlaying()) {
            return;
        }
        
        await start();

        for (const layerId in track.layers) {
            const notes: PartableSound[] = [];

            const synth = new Synth().toDestination();
            synth.volume.value = track.control.volume;

            const panner = new Panner({
                pan: track.control.panner
            });

            synth.connect(panner);
            
            let i: number = 0;
            for (const sound of track.layers[layerId]){
                notes.push({
                    note: getToneCode(sound.id),
                    duration: '8n',
                    velocity: 0.9,
                    time: "0:" + i
                });
                i++;
            }

            const synthPart = new Part<PartableSound>((time, note: PartableSound) => {
                synth.triggerAttackRelease(note.note, note.duration, time);
            }, notes);
            
            synthPart.start();
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
}

interface PartableSound {
    note: string;
    duration: string;
    time: string;
    velocity: number;
}