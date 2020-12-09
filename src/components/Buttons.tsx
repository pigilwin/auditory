import { MouseEventHandler } from "react";

interface ButtonConfiguration {
    id: string;
    title: string;
    onClick: MouseEventHandler<HTMLButtonElement>
}

interface NoteButtonConfiguration extends ButtonConfiguration {
    note: string;
}

interface DrumButtonConfiguration extends ButtonConfiguration {
    type: string;
}

const defaultClasses: string[] = [
    'p-8',
    'text-indigo-100',
    'transition-colors',
    'duration-150',
    'bg-indigo-700',
    'rounded-lg'
];

export const Button = (attributes: ButtonConfiguration): JSX.Element => {
    return (
        <button id={attributes.id} onClick={attributes.onClick} className={defaultClasses.join(' ')}>{attributes.title}</button>
    );
}

export const NoteButton = (attributes: NoteButtonConfiguration): JSX.Element => {
    return (
        <button data-node={attributes.note} onClick={attributes.onClick} id={attributes.id} className={defaultClasses.join(' ')}>{attributes.title}</button>
    );
}

export const DrumButton = (attributes: DrumButtonConfiguration): JSX.Element => {
    return (
        <button id={attributes.id} onClick={attributes.onClick} className={defaultClasses.join(' ')}>{attributes.title}</button>
    );
}