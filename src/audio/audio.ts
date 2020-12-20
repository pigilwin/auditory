import { start, context, Transport, Part, Panner } from 'tone';
import { getToneCode } from './sounds';
import { SavedTrack } from '../store/track/trackTypes';
import { fetchSynthObject } from './synthGenerator';
export class Audio {

    public static numberOfChannels(): number {
        return context.destination.channelCount;
    }

    public static numberOfSamples(): number {
        return context.sampleRate;
    }

    public static async playTrack(track: SavedTrack): Promise<void> {
        /**
         * If the audio is already playing
         * then stop it and cancel the process
         */
        if (Audio.isPlaying()) {
            return;
        }
        
        /**
         * Start the audio context
         */
        await start();

        /**
         * Loop through each layer within the track
         */
        for (const layerId in track.layers) {

            const layer = track.layers[layerId];

            const notes: PartableSound[] = [];
            
            /**
             * Create a new synth for the audio to be bound to
             */
            const synth = fetchSynthObject(layer.synth);

            /**
             * Apply the synth to the destination
             * this is the speakers of the device
             */
            synth.toDestination();

            /**
             * Bind the volume to the synth
             */
            synth.volume.value = track.control.volume;

            /**
             * Apply the panner to the synth
             */
            const panner = new Panner({
                pan: track.control.panner
            });
            synth.connect(panner);
            

            /**
             * Loop over the sounds in the layer
             * attach the sounds with the duration
             * appending the time
             */
            let i: number = 0;

            for (const sound of layer.sounds){
                notes.push({
                    note: getToneCode(sound.id),
                    duration: '8n',
                    velocity: 0.9,
                    time: "0:" + i
                });
                i++;
            }

            /**
             * Apply the sounds to the part, each part will play
             * simultaneously at the time and duration specified
             */
            const synthPart = new Part<PartableSound>((time, note: PartableSound) => {
                synth.triggerAttackRelease(note.note, note.duration, time);
            }, notes);
            
            /**
             * Start the synth, this will be applied to 
             * the Transport then the sound will start
             * once the Transport has been started
             */
            synthPart.start();
        }

        /**
         * Start the transport, this will have all the parts
         * attatched to be played simultaneously
         */
        Transport.start();
    }

    public static isPlaying(): boolean {
        return Transport.state === 'started';
    }

    public static stop(): void
    {
        Transport.stop();
        Transport.position = 0;
        Transport.cancel();
    }
}

interface PartableSound {
    note: string;
    duration: string;
    time: string;
    velocity: number;
}