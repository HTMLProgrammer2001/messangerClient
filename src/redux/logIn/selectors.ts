import {RootState} from '../';


export const selectLogInVerifing = (state: RootState) => state.logIn.verifing;
export const selectLogInErrors = (state: RootState) => state.logIn.errors;
export const selectLogInLoading = (state: RootState) => state.logIn.isLoading;

export const selectLogInState = (state: RootState) => state.logIn;
