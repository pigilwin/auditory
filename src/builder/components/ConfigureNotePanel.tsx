import { useDispatch } from "react-redux";
import { Button, DeleteButton, NumberSingleLineInput } from "../../components/Inputs";
import { Sound } from "../../store/track/trackTypes";
import { getName } from "../../audio/sounds";
import { deleteNoteAsync, updateNoteAsync } from "../../store/track/asyncActions/asyncNoteActions";
import { useState } from "react";

interface ConfigureNotePanelProps {
    sound: Sound;
    layerId: string;
    index: number;
    trackId: string;
}

export const ConfigureNotePanel = ({sound, layerId, index, trackId}: ConfigureNotePanelProps): JSX.Element => {
    
    const dispatch = useDispatch();
    const [duration, setDuration] = useState(sound.duration);
    const soundName = getName(sound.id);

    const onDurationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { currentTarget } = e;
        const { value } = currentTarget;
        const float = Number.parseFloat(value);
        setDuration(float);
    }

    const deleteNoteClickHandler = (): void => {
        dispatch(deleteNoteAsync(index, layerId, trackId));
    };

    const doneNoteClickHandler = (): void => {
        dispatch(updateNoteAsync(index, layerId, trackId, duration));
    };

    return (
        <div className="min-h-screen">
            <div className="w-1/2 shadow-md rounded-md mx-auto">
                <h1 className="text-center p-2 text-2xl dark:text-white">Note Configuration for {soundName}</h1>
                <div className="w-full p-2">
                    <NumberSingleLineInput
                        title="Duration (in seconds)"
                        value={duration}
                        error=""
                        onChange={onDurationChange}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4 p-2">
                    <DeleteButton disabled={false} title="Delete Note" onClick={deleteNoteClickHandler}/>
                    <Button disabled={false} title="Close" onClick={doneNoteClickHandler}/>
                </div>
            </div>
        </div>
    );
}