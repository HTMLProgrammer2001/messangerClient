import {takeEvery, put, all, call} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import authAPI from '../../utils/api/authAPI';
import expressErrorsToObject from '../../utils/helpers/expressErrorsToObject';
import {IUser} from '../../interfaces/IUser';
import {meSet} from '../me/actions';
import {appInitializeError, appInitializeSuccess} from './actions';
import {APP_INITIALIZE_START} from './types';


function* appInitialize(){
	try{
		const token = localStorage.getItem('token');

		if(!token)
			return;

		//make api request
		const resp: AxiosResponse<IUser> = yield call(authAPI.getMe, token);
		yield put(meSet(resp.data));
	}
	catch(e){
		//update error
		yield put(appInitializeError());
	}
	finally {
		yield put(appInitializeSuccess());
	}
}

function* watchAppSaga(){
	//watch
	yield all([
		takeEvery(APP_INITIALIZE_START, appInitialize)
	]);
}

export default watchAppSaga;
