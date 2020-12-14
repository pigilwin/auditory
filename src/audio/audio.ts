export class Audio {

    private readonly numberOfChannelsInUse: number = 1;
    private readonly timeInSeconds: number = 1;

    private readonly audioBuffer: Float32Array;

    public constructor(private readonly context: AudioContext){
        this.audioBuffer = this.createAudioBuffer();
    }

    public async play(): Promise<void> {
        await this.context.resume();
    }

    public get numberOfChannels(): number {
        return this.context.destination.channelCount;
    }

    public get numberOfSamples(): number {
        return this.context.sampleRate;
    }

    private createAudioBuffer(): Float32Array {
        const whiteNoiseBuffer = this.context.createBuffer(
            this.numberOfChannelsInUse,
            this.numberOfSamples * this.timeInSeconds,
            this.numberOfSamples
        );
        const channelData = whiteNoiseBuffer.getChannelData(0);
        for (let i = 0; i < channelData.length; i++) {
            channelData[i] = Math.random() * 2 - 1;
        }
        return channelData;
    }
}