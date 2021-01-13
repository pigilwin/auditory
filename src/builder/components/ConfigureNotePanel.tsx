import { useDispatch } from "react-redux";
import { Button, DeleteButton, NumberSingleLineInput } from "../../components/Inputs";
import { Sound } from "../../store/track/trackTypes";
import { getName } from "../../audio/sounds";
import { deleteNoteAsync, updateNoteAsync } from "../../store/track/asyncActions/asyncNoteActions";
import { useValidation } from "../../lib/validation";

interface ConfigureNotePanelProps {
    sound: Sound;
    layerId: string;
    index: number;
    trackId: string;
}

export const ConfigureNotePanel = ({sound, layerId, index, trackId}: ConfigureNotePanelProps): JSX.Element => {
    
    const soundName = getName(sound.id);
    const dispatch = useDispatch();
    const [state, setFormState, validate, errors] = useValidation<string>({
        duration: {
            value: sound.duration.toString(),
            validator: (v: string) => {
                if (v.length === 0) {
                    return 'No Value Found';
                }
                return null;
            }
        }
    });

    const onDurationChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { currentTarget } = e;
        const { value } = currentTarget;
        const values = Object.assign({}, state);
        values.duration = value;
        setFormState(values);
    }

    const deleteNoteClickHandler = (): void => {
        dispatch(deleteNoteAsync(index, layerId, trackId));
    };

    const doneNoteClickHandler = (): void => {
        if (!validate()) {
            return;
        }
        dispatch(updateNoteAsync(index, layerId, trackId, Number.parseInt(state.duration)));
    };

    return (
        <div className="min-h-screen">
            <div className="w-1/2 shadow-md rounded-md mx-auto">
                <h1 className="text-center p-2 text-2xl dark:text-white">Note Configuration for {soundName}</h1>
                <div className="w-full p-2">
                    <NumberSingleLineInput
                        title="Duration (in seconds)"
                        value={state.duration}
                        error={errors.duration}
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