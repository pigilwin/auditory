import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

const initialState: boolean = false;

const welcomeSlice = createSlice({
    name: 'welcome',
    initialState,
    reducers: {
        acceptWelcomeMessage(state, action: PayloadAction<boolean>) {
            return action.payload;
        }
    }
});

export const reducer = welcomeSlice.reducer;
export const {acceptWelcomeMessage} = welcomeSlice.actions;
export const welcomeSelector = (state: RootState) => state.welcomeReducer;