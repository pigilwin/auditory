export const idSeperator: string = '---';

export const buildPartId = (layerId: string, soundId: string): string => {
    const parts: string[] = [
        layerId,
        soundId
    ];
    return parts.join(idSeperator);
};

export const idResolver = (id: string): [string, string] => {
    const parts: string[] = id.split(idSeperator);

    return [
        parts[0],
        parts[1]
    ];
};