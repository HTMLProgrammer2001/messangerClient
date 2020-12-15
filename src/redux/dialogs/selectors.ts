import {RootState} from '../';


export const selectDialogsState = (state: RootState) => state.dialogs;
export const selectDialogs = (state: RootState) => state.dialogs.dialogs;
export const selectCurrentDialog = (state: RootState) => state.dialogs.current;
