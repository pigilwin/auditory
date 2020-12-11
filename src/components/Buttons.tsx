import { MouseEventHandler } from "react";

interface ButtonConfiguration {
    id: string;
    title: string;
    onClick: MouseEventHandler<HTMLButtonElement>
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

export const DeleteButton = (attributes: ButtonConfiguration): JSX.Element => {
    const classes = Array.from(defaultClasses).filter(className => {
        return className !== 'bg-indigo-700';
    });
    classes.push('bg-red-500');
    return (
        <button id={attributes.id} onClick={attributes.onClick} className={classes.join(' ')}>{attributes.title}</button>
    );
}