import {call, put, takeLeading, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {IEditMeResponse} from '../../../interfaces/Responses/IEditMeResponse';
import {editMeNickError, editMeNickStart, editMeNickSuccess} from './actions';
import {meSet} from '../../me/actions';
import {EDIT_ME_NICK_START} from './types';
import userActionsAPI from '../../../utils/api/userActionsAPI';
import expressErrorsToObject from '../../../utils/helpers/expressErrorsToObject';


function* editNickSaga({payload}: ReturnType<typeof editMeNickStart>){
	try{
		//make api call
		const resp: AxiosResponse<IEditMeResponse> = yield call(userActionsAPI.editMe, payload);

		//change store
		yield put(meSet(resp.data.newUser));
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
		takeLeading(EDIT_ME_NICK_START, editNickSaga)
	]);
}

export default watchNickSaga;
