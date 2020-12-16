import {takeEvery, put, all, call, takeLeading} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';

import {ILoginResponse} from '../../interfaces/Responses/ILoginResponse';
import {LOGIN_VERIFY, LOGIN_CODE_VERIFY, LOGIN_RESEND} from './types';
import {logInCodeVerify, loginError, loginResend, logInSuccess, logInVerify} from './actions';
import authAPI from '../../utils/api/authAPI';
import expressErrorsToObject from '../../utils/helpers/expressErrorsToObject';
import {meSet} from '../me/actions';
import {toast} from 'react-toastify';


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

function* loginResendSaga({payload}: ReturnType<typeof loginResend>){
	try{
		//make API call
		yield call(authAPI.resendLogin, payload);
		toast.success('New code was sent on your phone');
	}
	catch (e) {
		console.log(e);
		toast.error('Something went wrong. Try again.');
	}
}

function* watchLogInSaga(){
	//watch 
	yield all([
		takeEvery(LOGIN_VERIFY, logIn),
		takeEvery(LOGIN_CODE_VERIFY, logInCode),
		takeLeading(LOGIN_RESEND, loginResendSaga)
	]);
}

export default watchLogInSaga;
