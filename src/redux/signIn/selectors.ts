import {RootState} from '../';


export const selectSignInVerifing = (state: RootState) => state.signIn.verifing;
export const selectSignInState = (state: RootState) => state.signIn;
