import {RootState} from '../';


//get verifing state
export const selectSignInVerifing = (state: RootState) => state.signIn.verifing;
