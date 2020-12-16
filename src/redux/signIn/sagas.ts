import {takeEvery, put, all, call, takeLeading} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {ISignInResponse} from '../../interfaces/Responses/ISignInResponse';
import {SIGNIN_VERIFY, SIGNIN_CODE_VERIFY, SIGNIN_RESEND} from './types';
import {signInCodeVerify, signInError, signInResend, signInSuccess} from './actions';
import authAPI from '../../utils/api/authAPI';
import expressErrorsToObject from '../../utils/helpers/expressErrorsToObject';
import {meSet} from '../me/actions';


function* signInSaga({payload}: ReturnType<typeof signInCodeVerify>){
	try{
		//make API request
		yield call(authAPI.signIn, payload);
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
		const resp: AxiosResponse<ISignInResponse> = yield call(authAPI.confirmSignIn, payload);

		//log in user
		yield put(meSet(resp.data.user));
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
		yield call(authAPI.resendSignIn, payload);
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
		takeEvery(SIGNIN_VERIFY, signInSaga),
		takeEvery(SIGNIN_CODE_VERIFY, signInCodeSaga),
		takeLeading(SIGNIN_RESEND, signInResendSaga)
	]);
}

export default watchSignInSaga;
