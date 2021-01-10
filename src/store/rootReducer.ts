import { combineReducers } from '@reduxjs/toolkit';

import { reducer as trackReducer } from './track/trackSlice';
import { reducer as welcomeReducer } from './welcome/welcomeSlice';
import { reducer as themeReducer } from './theme/themeSlice';

export const rootReducer = combineReducers({
    trackReducer,
    welcomeReducer,
    themeReducer
});
export type RootState = ReturnType<typeof rootReducer>;
export type RootStateHook = () => RootState;