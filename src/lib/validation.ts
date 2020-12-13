import { Dispatch, SetStateAction, useState } from "react"

export const useValidation = (config: FieldValidationConfiguration): [
    InitialState, 
    Dispatch<SetStateAction<InitialState>>,
    validator,
    ErrorState
] => {
    const initialState = createStateFromConfig(config);
    const initialErrorState = createErrorStateFromConfig(config);
    const [state, setFormState] = useState<InitialState>(initialState);
    const [errors, setErrors] = useState<ErrorState>(initialErrorState);
    const validate = (): boolean => {
        let sucessful = true;
        for (const key in state) {
            const validator = config[key].validator;
            const errorMessage = validator(state[key]);
            if (typeof errorMessage === 'string' && errorMessage.length > 0) {
                
                setErrors({
                    [key]: errorMessage
                });
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

const createStateFromConfig = (config: FieldValidationConfiguration): InitialState => {
    const state: InitialState = {};
    for (const key in config) {
        state[key] = config[key].value;
    }
    return state;
};

const createErrorStateFromConfig = (config: FieldValidationConfiguration): ErrorState => {
    const errors: ErrorState = {};
    for (const key in config) {
        errors[key] = '';
    };
    return errors;
};

interface FieldValidationConfiguration {
    [id: string]: ValidationConfiguration;
}

interface ValidationConfiguration {
    value: string;
    validator: (value: string) => string | null; 
}

interface InitialState {
    [id: string]: string;
}

type validator = () => boolean;

interface ErrorState {
    [id: string]: string;
}