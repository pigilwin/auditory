import { Context } from '../Context';
import { AppThunk, AppDispatch } from './store';
import { create } from './trackSlice';

export const createTrack = (name: string): AppThunk => async (dispatch: AppDispatch) => {
    const track = await Context.get().database.createTrack(name);
    dispatch(create({
        track: track
    }));
};