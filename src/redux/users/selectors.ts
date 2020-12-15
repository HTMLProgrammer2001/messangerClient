import {RootState} from '../index';


export const selectUsersState = (state: RootState) => state.users;
export const selectUsers = (state: RootState) => state.users.users;
