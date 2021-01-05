import { MouseEventHandler } from "react";

interface ButtonConfiguration {
    title: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled: boolean;
    additionalClasses?: string[];
}

const defaultClasses: string[] = [
    'p-4',
    'transition-colors',
    'duration-150',
    'rounded-lg',
    'disabled:opacity-50',
    'border-2'
];

export const Button = ({onClick, disabled, title, additionalClasses}: ButtonConfiguration): JSX.Element => {
    const classes = Array.from(defaultClasses);
    classes.push('border-indigo-700');
    classes.push('hover:bg-indigo-700');

    if (additionalClasses !== undefined) {
        for(const className of additionalClasses){
            classes.push(className);
        }
    }

    return (
        <button onClick={onClick} disabled={disabled} className={classes.join(' ')}>{title}</button>
    );
}

export const DeleteButton = ({onClick, title, disabled}: ButtonConfiguration): JSX.Element => {
    const classes = Array.from(defaultClasses);
    classes.push('border-red-500');
    classes.push('hover:bg-red-500');
    return (
        <button onClick={onClick} disabled={disabled} className={classes.join(' ')}>{title}</button>
    );
}