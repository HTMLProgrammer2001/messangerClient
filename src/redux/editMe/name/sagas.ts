import {call, put, takeLeading, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {IEditMeResponse} from '../../../interfaces/Responses/IEditMeResponse';
import {editMeNameError, editMeNameStart, editMeNameSuccess} from './slice';
import {meSet} from '../../me/slice';
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
		takeLeading(editMeNameStart.type, editNameSaga)
	]);
}

export default watchNameSaga;
