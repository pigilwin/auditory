export class Audio {

    public constructor(private readonly context: AudioContext){}

    public get numberOfChannels(): number {
        return this.context.destination.channelCount;
    }

    public get numberOfSamples(): number {
        return this.context.sampleRate;
    }
}