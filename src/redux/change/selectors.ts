import {RootState} from '../';


export const selectChangeVerifing = (state: RootState) => state.change.verifing;
export const selectChangeErrors = (state: RootState) => state.change.errors;
export const selectChangeLoading = (state: RootState) => state.change.isLoading;

export const selectChangeState = (state: RootState) => state.change;
