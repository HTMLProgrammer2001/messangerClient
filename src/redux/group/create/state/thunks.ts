import {ThunkAction} from 'redux-thunk';
import {Action} from 'redux';
import {toast} from 'react-toastify';

import {RootState} from '../../../index';
import groupActionsAPI from '../../../../utils/api/groupActionsAPI';


export type IResendThunk = ThunkAction<Promise<boolean>, RootState, unknown, Action<any>>

const createGroupThunk = (participants: string[], name: string): IResendThunk => async () => {
	try {
		await groupActionsAPI.create(participants, name);

		//show success message
		toast.success('Dialog was created');
		return true;
	} catch (e) {
		toast.error(e.response?.data.message || e.message);
		return false;
	}
};

export default createGroupThunk;
