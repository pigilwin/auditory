import { useDispatch } from 'react-redux';
import { Button, TextSingleLineInput } from '../../components/Inputs';
import { useValidation } from '../../lib/validation';
import { updateBPMAsync } from '../../store/track/asyncActions/asyncControlActions';

interface BpmProps {
    bpm: string;
    trackId: string;
}
export const Bpm = ({bpm, trackId}: BpmProps): JSX.Element => {
    
    const dispatch = useDispatch();
    const [state, setState, validate, errors] = useValidation({
        bpmValue: {
            value: bpm,
            validator: (value: string) => {
                const valueAsNumber = Number.parseInt(value);
                if (Number.isNaN(valueAsNumber)) {
                    return 'The number must be a value';
                }
                return null;
            }
        }
    });

    const bpmChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { currentTarget } = event;
        const { value } = currentTarget;
        setState({
            bpmValue: value
        });
    }

    const onClickHandler = (): void => {
        if (!validate()) {
            return;
        }
        dispatch(updateBPMAsync(state.bpmValue, trackId));
    }
    
    return (
        <div className="w-full grid grid-cols-2 gap-2">
            <TextSingleLineInput
                title="BPM"
                error={errors.bpmValue}
                value={state.bpmValue}
                onChange={bpmChange}
            />
            <Button
                title="Save"
                onClick={onClickHandler}
                disabled={false}
            />
        </div>
    );
}