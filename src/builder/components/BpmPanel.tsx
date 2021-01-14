import { useDispatch } from 'react-redux';
import { TextSingleLineInput, Button } from '../../components/Inputs';
import { useValidation } from '../../lib/validation';
import { updateBPMAsync } from '../../store/track/asyncActions/asyncControlActions';

interface BpmPanelProps {
    bpm: string;
    trackId: string;
}
export const BpmPanel = ({bpm, trackId}: BpmPanelProps): JSX.Element => {
    
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

    const onSaveBpmClickHandler = (): void => {
        if (!validate()) {
            return;
        }
        dispatch(updateBPMAsync(state.bpm, trackId));
    }
    
    return (
        <div className="w-1/2 mx-auto">
            <TextSingleLineInput
                title="BPM"
                error={errors.bpmValue}
                value={state.bpmValue}
                onChange={bpmChange}
            />
            <Button
                title="Save"
                disabled={false}
                onClick={onSaveBpmClickHandler}
            />
        </div>
    );
}