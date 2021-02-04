import { useDispatch } from 'react-redux';
import { Title } from '../../components/Title';
import { Button, TextSingleLineInput, RangeInput } from '../../components/Inputs';
import { useValidation } from '../../lib/validation';
import { SavedTrack } from '../../store/track/trackTypes';
import { finishedConfiguringSettings } from '../../store/track/trackSlice';
import { updateSettingsAsync } from '../../store/track/asyncActions/asyncControlActions';

interface SettingsProps {
    trackId: string;
    track: SavedTrack;
}
export const Settings = ({track, trackId}: SettingsProps): JSX.Element => {
    
    const dispatch = useDispatch();
    const [state, setState, validate, errors] = useValidation({
        bpmValue: {
            value: track.control.bpm,
            validator: (value: string) => {
                const valueAsNumber = Number.parseInt(value);
                if (Number.isNaN(valueAsNumber)) {
                    return 'The number must be a value';
                }
                return null;
            }
        },
        volume: {
            value: track.control.volume.toString(),
            validator: (value: string) => {
                return null;
            }
        },
        panner: {
            value: track.control.panner.toString(),
            validator: (value: string) => {
                return null;
            }
        }
    });

    const bpmChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { currentTarget } = event;
        const { value } = currentTarget;

        const newState = {...state};
        newState.bpmValue = value;

        setState(newState);
    }

    const volumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { currentTarget } = event;
        const { value } = currentTarget;

        const newState = {...state};
        newState.volume = value;

        setState(newState);
    };

    const pannerHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { currentTarget } = event;
        const { value } = currentTarget;

        const newState = {...state};
        newState.panner = value;

        setState(newState);
    };
    
    const onSaveClickHandler = (): void => {
        if (!validate()) {
            return;
        }
        dispatch(updateSettingsAsync({
            trackId: trackId,
            data: {
                bpm: state.bpmValue,
                panner: Number.parseInt(state.panner),
                volume: Number.parseInt(state.volume)
            }
        }));
        dispatch(finishedConfiguringSettings());
    }

    const goBackHandler = (): void => {
        dispatch(finishedConfiguringSettings());
    }
    
    
    return (
        <div className="mx-auto overflow-hidden min-h-screen">
            <div className="text-center w-full">
                <Title title="Settings"/>
            </div>
            <div className="grid grid-cols-1 gap-2 p-5 w-1/2 mx-auto">
                <TextSingleLineInput
                    title="BPM"
                    error={errors.bpmValue}
                    value={state.bpmValue}
                    onChange={bpmChange}
                />
                <div className="w-full justify-center inline-block text-center">
                    <RangeInput
                        min={-1}
                        max={1}
                        value={Number.parseInt(state.panner)}
                        step={1}
                        title="Left & Right"
                        onChange={pannerHandler}
                        error=""
                    />
                </div>
                <div className="w-full text-center">
                    <RangeInput
                        min={-10}
                        max={0}
                        value={Number.parseInt(state.volume)}
                        step={1}
                        title="Volume"
                        onChange={volumeChange}
                        error=""
                    />
                </div>
                <Button
                    title="Save"
                    onClick={onSaveClickHandler}
                    disabled={false}
                />
                <Button
                    title="Go Back"
                    disabled={false}
                    onClick={goBackHandler}
                />
            </div>
        </div>
    );
}