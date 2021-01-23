import {takeEvery, put, all, call, takeLeading} from 'redux-saga/effects';
import {AxiosResponse} from 'axios';
import {toast} from 'react-toastify';

import {ILoginResponse} from '../../interfaces/Responses/ILoginResponse';
import {logInCodeVerify, logInError, logInResend, logInSuccess, logInVerify} from './slice';
import {meSet} from '../me/slice';
import {usersAdd} from '../users';
import userActionsAPI from '../../utils/api/userActionsAPI';
import expressErrorsToObject from '../../utils/helpers/expressErrorsToObject';


export function* logInSaga({payload}: ReturnType<typeof logInVerify>){
	try{
		//make api request
		yield call(userActionsAPI.logIn, payload);
		yield put(logInSuccess());
	}
	catch(e){
		//update error
		yield put(logInError({
			_error: e.response?.data.message || e.message,
			...expressErrorsToObject(e.response?.data.errors)
		}));
	}
}

export function* logInCodeSaga({payload}: ReturnType<typeof logInCodeVerify>){
	try{
		//make api request
		const resp: AxiosResponse<ILoginResponse> = yield call(userActionsAPI.confirmLogin, payload);

		//set data in store
		yield put(usersAdd(resp.data.user));
		yield put(meSet(resp.data.user._id));
		localStorage.setItem('token', resp.data.token);
	}
	catch(e){
		//update error
		yield put(logInError({
			_error: e.response?.data.message || e.message,
			...expressErrorsToObject(e.response?.data.errors)
		}))
	}
}

export function* loginResendSaga({payload}: ReturnType<typeof logInResend>){
	try{
		//make API call
		yield call(userActionsAPI.resendLogin, payload);
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
		takeEvery(logInVerify.type, logInSaga),
		takeEvery(logInCodeVerify.type, logInCodeSaga),
		takeLeading(logInResend.type, loginResendSaga)
	]);
}

export default watchLogInSaga;
