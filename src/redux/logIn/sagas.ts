import {takeEvery, put, all, call} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {ILoginResponse} from '../../interfaces/Responses/ILoginResponse';
import {LOGIN_VERIFY, LOGIN_CODE_VERIFY} from './types';
import {logInCodeVerify, loginError, logInSuccess, logInVerify} from './actions';
import authAPI from '../../utils/api/authAPI';
import expressErrorsToObject from '../../utils/helpers/expressErrorsToObject';
import {meSet} from '../me/actions';


function* logIn({payload}: ReturnType<typeof logInVerify>){
	try{
		//make api request
		yield call(authAPI.logIn, payload);
		yield put(logInSuccess());
	}
	catch(e){
		//update error
		yield put(loginError({
			_error: e.response?.data.message || e.message,
			...expressErrorsToObject(e.response?.data.errors)
		}));
	}
}

function* logInCode({payload}: ReturnType<typeof logInCodeVerify>){
	try{
		//make api request
		const resp: AxiosResponse<ILoginResponse> = yield call(authAPI.confirmLogin, payload);

		//set data in store
		yield put(meSet(resp.data.user));
		localStorage.setItem('token', resp.data.token);
	}
	catch(e){
		//update error
		yield put(loginError({
			_error: e.response?.data.message || e.message,
			...expressErrorsToObject(e.response?.data.errors)
		}))
	}
}

function* watchLogInSaga(){
	//watch 
	yield all([
		takeEvery(LOGIN_VERIFY, logIn),
		takeEvery(LOGIN_CODE_VERIFY, logInCode)
	]);
}

export default watchLogInSaga;
