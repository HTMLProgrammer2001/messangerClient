import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {toast} from 'react-toastify';

import {RootState} from '../../index';
import groupActionsAPI from '../../../utils/api/groupActionsAPI';


export type IInviteThunk = ThunkAction<Promise<boolean>, RootState, unknown, Action<any>>

const inviteThunk = (dialogID: string, users: string[]): IInviteThunk => async () => {
	try {
		await groupActionsAPI.invite(dialogID, users);

		//show success message
		toast.success('Users invited');
		return true;
	} catch (e) {
		toast.error(e.response?.data.message || e.message);
		return false;
	}
};

export default inviteThunk;
