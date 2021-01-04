import { idToSynthMap } from "../../audio/synthGenerator";
import { Button } from '../../components/Buttons';

interface SynthSelectorProps {
    synthId: string;
    onSynthSelected: (value: string) => void;
}

export const SynthSelector = ({synthId, onSynthSelected}: SynthSelectorProps): JSX.Element => {

    const synths: JSX.Element[] = [];

    for (const key in idToSynthMap) {

        const additionalClasses: string[] = [];

        if (key === synthId) {
            additionalClasses.push('border-4', 'border-green-400');
        }

        const onClickHandler = (): void => {
            onSynthSelected(key);
        };

        synths.push(<Button 
            additionalClasses={additionalClasses} 
            disabled={false} 
            key={key} 
            title={idToSynthMap[key].name} 
            onClick={onClickHandler}
            />
        );
    }

    return (
        <div className="grid grid-cols-8 gap-4 p-2">
            {synths}
        </div>
    );
}