import { Dispatch, SetStateAction, useState } from "react"

export const useValidation = <T>(config: FieldValidationConfiguration<T>): [
    InitialState<T>, 
    Dispatch<SetStateAction<InitialState<T>>>,
    validator,
    ErrorState
] => {
    const initialState = createStateFromConfig(config);
    const initialErrorState = createErrorStateFromConfig(config);
    const [state, setFormState] = useState<InitialState<T>>(initialState);
    const [errors, setErrors] = useState<ErrorState>(initialErrorState);
    const validate: validator = (): boolean => {
        let sucessful = true;
        for (const key in state) {
            const validator = config[key].validator;
            const errorMessage = validator(state[key]);
            if (typeof errorMessage === 'string' && errorMessage.length > 0) {
                const errorState = {...errors};
                errorState[key] = errorMessage;
                setErrors(errorState);
                sucessful = false;
            }
        }
        return sucessful;
    };

    return [
        state,
        setFormState,
        validate,
        errors
    ];
}

const createStateFromConfig = <T>(config: FieldValidationConfiguration<T>): InitialState<T> => {
    const state: InitialState<T> = {};
    for (const key in config) {
        state[key] = config[key].value;
    }
    return state;
};

const createErrorStateFromConfig = <T>(config: FieldValidationConfiguration<T>): ErrorState => {
    const errors: ErrorState = {};
    for (const key in config) {
        errors[key] = '';
    };
    return errors;
};

interface FieldValidationConfiguration<T> {
    [id: string]: {
        value: T;
        validator: (value: T) => string | null; 
    }
}
interface InitialState<T> {
    [id: string]: T;
}

type validator = () => boolean;

interface ErrorState {
    [id: string]: string;
}