import {AxiosResponse} from 'axios';
import {call, put, takeEvery, all} from 'redux-saga/effects';

import {IUser} from '../../interfaces/IUser';
import {meSet, meReset, meStart} from './slice';
import userActionsAPI from '../../utils/api/userActionsAPI';
import {usersAdd} from '../users';


function* meSaga(){
	try{
		const token = localStorage.getItem('token');

		if(!token){
			yield put(meReset());
			return;
		}

		//make api request
		const resp: AxiosResponse<IUser> = yield call(userActionsAPI.getMe);

		//change store
		yield put(meSet(resp.data._id));
		yield put(usersAdd(resp.data));

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
		takeEvery(meStart.type, meSaga)
	]);
}

export default meWatchSaga;
