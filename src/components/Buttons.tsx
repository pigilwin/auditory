import { MouseEventHandler } from "react";

interface ButtonConfiguration {
    title: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled: boolean;
}

const defaultClasses: string[] = [
    'p-8',
    'text-indigo-100',
    'transition-colors',
    'duration-150',
    'bg-indigo-700',
    'rounded-lg'
];

export const Button = ({onClick, disabled, title}: ButtonConfiguration): JSX.Element => {
    return (
        <button onClick={onClick} disabled={disabled} className={defaultClasses.join(' ')}>{title}</button>
    );
}

export const DeleteButton = ({onClick, title, disabled}: ButtonConfiguration): JSX.Element => {
    const classes = Array.from(defaultClasses).filter(className => {
        return className !== 'bg-indigo-700';
    });
    classes.push('bg-red-500');
    return (
        <button onClick={onClick} disabled={disabled} className={classes.join(' ')}>{title}</button>
    );
}