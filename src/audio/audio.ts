import { start, context, Transport, Part, Pattern, PolySynth, SynthOptions, Synth, Time as TimeUtil } from 'tone';
import { getToneCode } from './sounds';
import { SavedTrack } from '../store/track/trackTypes';
import { fetchSynthObject } from './synthGenerator';
import { Time } from 'tone/build/esm/core/type/Units';
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

            /**
             * If the layer is muted then just move to the next one
             */
            if (layer.muted) {
                continue;
            }

            const notes: SoundsToToneJsConversionLayer[] = [];
            
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
             * Loop over the sounds in the layer
             * attach the sounds with the duration
             * appending the time
             */
            let i: number = 0;

            for (const sound of layer.sounds){

                const toneCode = getToneCode(sound.id);
                
                /**
                 * We have encountered an empty space,
                 * Don't add this to the list however
                 * do increment the timer to simulate a
                 * space
                 */
                if (toneCode !== null) {
                    notes.push({
                        note: toneCode,
                        duration: TimeUtil(sound.duration, 's').toNotation(),
                        velocity: 0.9,
                        time: "0:" + i
                    });
                }

                i += 2;
            }

            if (layer.loop) {
                Audio.addPatternToTransport(synth, notes);
            } else {
                Audio.addPartsToTransport(synth, notes);
            }
        }

        Transport.swing = track.control.panner;

        /**
         * Start the transport, this will have all the parts
         * attatched to be played simultaneously
         */
        Transport.start();
    }

    public static async playNoteFromSynth(key: string, synth: string): Promise<void>
    {
        const toneCode = getToneCode(key);

        /**
         * We have encountered an empty space,
         * moving along as this has no sound
         */
        if (toneCode === null) {
            return;
        }

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
         * Create a new synth for the audio to be bound to
         */
        const synthObject = fetchSynthObject(synth);

        /**
         * Apply the synth to the destination
         * this is the speakers of the device
         */
        synthObject.toDestination();

        /**
         * Play the note
         */
        synthObject.triggerAttackRelease(toneCode, '8n');
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

    private static addPartsToTransport(synth: PolySynth<Synth<SynthOptions>>, notes: SoundsToToneJsConversionLayer[]): void 
    {
        /**
         * Apply the sounds to the part, each part will play
         * simultaneously at the time and duration specified
         */
        const synthPart = new Part<SoundsToToneJsConversionLayer>((time, note: SoundsToToneJsConversionLayer) => {
            synth.triggerAttackRelease(note.note, note.duration, time, note.velocity);
        }, notes);
        /**
         * Start the synth, this will be applied to 
         * the Transport then the sound will start
         * once the Transport has been started
         */
        synthPart.start();
    }

    private static addPatternToTransport(synth: PolySynth<Synth<SynthOptions>>, notes: SoundsToToneJsConversionLayer[]): void
    {
        /**
         * Apply the sounds to the part, each part will play
         * simultaneously at the time and duration specified
         */
        const synthPart = new Pattern<SoundsToToneJsConversionLayer>((time, note: SoundsToToneJsConversionLayer) => {
            synth.triggerAttackRelease(note.note, note.duration, time, note.velocity);
        }, notes);
        /**
         * Start the synth, this will be applied to 
         * the Transport then the sound will start
         * once the Transport has been started
         */
        synthPart.start();
    }
}

interface SoundsToToneJsConversionLayer {
    note: string;
    duration: Time;
    time: string;
    velocity: number;
}