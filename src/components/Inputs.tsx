interface InputInterface {
    id: string;
    title: string;
}

interface RangeInputInterface extends InputInterface {
    min: number;
    max: number;
    step: number;
    value: number;
}

interface ToggleSwitchInterface extends InputInterface {
    value: boolean;
}

export const RangeInput = (range: RangeInputInterface) => {
    return (
        <div className="range-slider p-4 flex flex-col">
            <label className="text-xl mb-2" htmlFor={range.id}>${range.title}</label>
            <input type="range" className="cursor-pointer" id={range.id} min={range.min} max={range.max} value={range.value} step={range.step}/>
        </div>
    );
}

export function ToggleSwitch(toggle: ToggleSwitchInterface) {
    return (
        <div className="toggle-switch p-4 flex flex-col">
            <label htmlFor={toggle.id} className="flex items-center cursor-pointer">
                <div className="relative">
                    <input id={toggle.id} checked={toggle.value} type="checkbox" className="hidden" />
                    <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                    <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">{toggle.title}</div>
            </label>
        </div>
    );
}