import {RootState} from '../';


export const selectMeState = (state: RootState) => state.me;
export const selectMe = (state: RootState) => selectMeState(state).user;
