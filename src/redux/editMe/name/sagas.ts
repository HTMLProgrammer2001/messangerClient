import {call, put, takeLeading, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {IEditMeResponse} from '../../../interfaces/Responses/IEditMeResponse';
import {editMeNameError, editMeNameStart, editMeNameSuccess} from './actions';
import {meSet} from '../../me/actions';
import {EDIT_ME_NAME_START} from './types';
import userActionsAPI from '../../../utils/api/userActionsAPI';
import expressErrorsToObject from '../../../utils/helpers/expressErrorsToObject';


function* editNameSaga({payload}: ReturnType<typeof editMeNameStart>){
	try{
		//make api call
		const resp: AxiosResponse<IEditMeResponse> = yield call(userActionsAPI.editMe, payload);

		//change store
		yield put(meSet(resp.data.newUser));
		yield put(editMeNameSuccess());

		//show message
		toast.success('Name was changed');
	}
	catch (e) {
		//set error to store and show message
		yield put(editMeNameError({
			_error: e.response?.data.message || e.message,
			...expressErrorsToObject(e.response?.data.errors)
		}));
	}
}

function* watchNameSaga() {
	yield all([
		takeLeading(EDIT_ME_NAME_START, editNameSaga)
	]);
}

export default watchNameSaga;
