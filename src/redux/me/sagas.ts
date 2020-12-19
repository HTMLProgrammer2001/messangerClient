import {AxiosResponse} from 'axios';
import {call, put, takeEvery, all} from 'redux-saga/effects';

import {IUser} from '../../interfaces/IUser';
import {meReset, meSet} from './actions';
import {ME_START} from './types';
import userActionsAPI from '../../utils/api/userActionsAPI';
import DB from '../../utils/helpers/DB';


function* meSaga(){
	try{
		const token = localStorage.getItem('token');

		if(!token)
			return;

		//make api request
		const resp: AxiosResponse<IUser> = yield call(userActionsAPI.getMe);
		yield put(meSet(resp.data));

		//set options to DB
		//yield call(DB.setData, 'settings', resp.data.opts);
	}
	catch(e){
		//update error
		yield put(meReset());
	}
}

function* meWatchSaga() {
	yield all([
		takeEvery(ME_START, meSaga)
	]);
}

export default meWatchSaga;
