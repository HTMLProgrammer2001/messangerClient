import {takeEvery, put, all, call, takeLeading} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {ISignInResponse} from '../../interfaces/Responses/ISignInResponse';
import {signInCodeVerify, signInError, signInResend, signInSuccess, signInVerify} from './slice';
import {meSet} from '../me/slice';
import userActionsAPI from '../../utils/api/userActionsAPI';
import expressErrorsToObject from '../../utils/helpers/expressErrorsToObject';


function* signInSaga({payload}: ReturnType<typeof signInCodeVerify>){
	try{
		//make API request
		yield call(userActionsAPI.signIn, payload);
		yield put(signInSuccess());
	}
	catch(e){
		//update error
		yield put(signInError({
			_error: e.response?.data.message || e.message,
			...expressErrorsToObject(e.response?.data.errors)
		}));
	}
}

function* signInCodeSaga({payload}: ReturnType<typeof signInCodeVerify>){
	try{
		//make api request
		const resp: AxiosResponse<ISignInResponse> = yield call(userActionsAPI.confirmSignIn, payload);

		//log in user
		localStorage.setItem('token', resp.data.token);
		yield put(meSet(resp.data.user._id));
	}
	catch(e){
		//update error
		yield put(signInError({
			_error: e.response?.data.message || e.message,
			...expressErrorsToObject(e.response?.data.errors)
		}));
	}
}

function* signInResendSaga({payload}: ReturnType<typeof signInResend>) {
	try{
		//make API call
		yield call(userActionsAPI.resendSignIn, payload);
		toast.success('New code was sent on your phone');
	}
	catch (e) {
		console.log(e);
		toast.error('Something went wrong. Try again.');
	}
}

function* watchSignInSaga(){
	//setup watch
	yield all([
		takeEvery(signInVerify.type, signInSaga),
		takeEvery(signInCodeVerify.type, signInCodeSaga),
		takeLeading(signInResend.type, signInResendSaga)
	]);
}

export default watchSignInSaga;
