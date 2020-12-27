import {call, put, takeLeading, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {IEditMeResponse} from '../../../interfaces/Responses/IEditMeResponse';
import {editMeNickError, editMeNickStart, editMeNickSuccess} from './slice';
import {meSet} from '../../me/slice';
import {usersAdd} from '../../users';
import userActionsAPI from '../../../utils/api/userActionsAPI';
import expressErrorsToObject from '../../../utils/helpers/expressErrorsToObject';


function* editNickSaga({payload}: ReturnType<typeof editMeNickStart>){
	try{
		//make api call
		const resp: AxiosResponse<IEditMeResponse> = yield call(userActionsAPI.editMe, payload);

		//change store
		yield put(usersAdd(resp.data.newUser));
		yield put(meSet(resp.data.newUser._id));
		yield put(editMeNickSuccess());

		//show message
		toast.success('Nick was changed');
	}
	catch (e) {
		//set error to store and show message
		yield put(editMeNickError({
			_error: e.response?.data.message || e.message,
			...expressErrorsToObject(e.response?.data.errors)
		}));
	}
}

function* watchNickSaga() {
	yield all([
		takeLeading(editMeNickStart.type, editNickSaga)
	]);
}

export default watchNickSaga;
