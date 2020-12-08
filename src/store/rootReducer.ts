import { combineReducers } from '@reduxjs/toolkit';

import {reducer} from './trackSlice';

export const rootReducer = combineReducers({
    reducer
});
export type RootState = ReturnType<typeof rootReducer>;