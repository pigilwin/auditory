import { combineReducers } from '@reduxjs/toolkit';

import {reducer as trackReducer} from './track/trackSlice';
import {reducer as welcomeReducer} from './welcomeSlice';

export const rootReducer = combineReducers({
    trackReducer,
    welcomeReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;