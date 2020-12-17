import {AxiosResponse} from 'axios';
import {call, put, takeEvery, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';

import {IUser} from '../../interfaces/IUser';
import {meReset, meSet} from './actions';
import {ME_START} from './types';
import authAPI from '../../utils/api/authAPI';


function* meSaga(){
	try{
		const token = localStorage.getItem('token');

		if(!token)
			return;

		//make api request
		const resp: AxiosResponse<IUser> = yield call(authAPI.getMe);
		yield put(meSet(resp.data));
	}
	catch(e){
		//update error
		toast.error(e.response?.data.message || e.message);
		yield put(meReset());
	}
}

function* meWatchSaga() {
	yield all([
		takeEvery(ME_START, meSaga)
	]);
}

export default meWatchSaga;
