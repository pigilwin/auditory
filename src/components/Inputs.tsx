import {BasicTextErrorMessage} from './ErrorMessages';

interface InputInterface {
    id: string;
    title: string;
    error: string;
}

interface RangeInputInterface extends InputInterface {
    min: number;
    max: number;
    step: number;
    value: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface ToggleSwitchInterface extends InputInterface {
    value: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

interface TextSingleLineInputInterface extends InputInterface {
    onKeyUp: React.KeyboardEventHandler<HTMLInputElement>;
}

export const RangeInput = (range: RangeInputInterface): JSX.Element => {
    return (
        <div className="range-slider p-4 flex flex-col">
            <label className="text-xl mb-2" htmlFor={range.id}>{range.title}</label>
            <input onChange={range.onChange} type="range" className="cursor-pointer" id={range.id} min={range.min} max={range.max} value={range.value} step={range.step}/>
        </div>
    );
}

export const ToggleSwitch = (toggle: ToggleSwitchInterface): JSX.Element => {
    return (
        <div className="toggle-switch p-4 flex flex-col">
            <label htmlFor={toggle.id} className="flex items-center cursor-pointer">
                <div className="relative">
                    <input onChange={toggle.onChange} id={toggle.id} checked={toggle.value} type="checkbox" className="hidden" />
                    <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">{toggle.title}</div>
            </label>
        </div>
    );
}

export const TextSingleLineInput = (single: TextSingleLineInputInterface): JSX.Element => {
    return (
        <div className="flex flex-col mb-4">
            <label className="mb-2 uppercase font-bold text-lg text-grey-darkest">{single.title}</label>
            <input onKeyUp={single.onKeyUp} className="border py-2 px-3 text-grey-darkest" type="text" id={single.id}></input>
            <BasicTextErrorMessage message={single.error}/>
        </div>
    );
}