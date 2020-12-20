import {takeEvery, put, all, call, takeLeading} from 'redux-saga/effects';
import {toast} from 'react-toastify';

import {CHANGE_VERIFY, CHANGE_CODE_VERIFY, CHANGE_RESEND} from './types';
import {changeCodeVerify, changeError, changeResend, changeReset, changeSuccess, changeVerify} from './actions';
import userActionsAPI from '../../utils/api/userActionsAPI';
import expressErrorsToObject from '../../utils/helpers/expressErrorsToObject';
import {meSet} from '../me/actions';


function* change({payload}: ReturnType<typeof changeVerify>){
	try{
		//make api request
		yield call(userActionsAPI.changePhone, payload);
		yield put(changeSuccess());
	}
	catch(e){
		//update error
		yield put(changeError({
			_error: e.response?.data.message || e.message,
			...expressErrorsToObject(e.response?.data.errors)
		}));
	}
}

function* changeCode({payload}: ReturnType<typeof changeCodeVerify>){
	try{
		//make api request
		yield call(userActionsAPI.confirmChangePhone, payload);

		//put actions to store
		yield put(changeReset());
		yield put(meSet(null));

		toast.success('Phone was changed');
	}
	catch(e){
		//update error
		yield put(changeError({
			_error: e.response?.data.message || e.message,
			...expressErrorsToObject(e.response?.data.errors)
		}))
	}
}

function* changeResendSaga({payload}: ReturnType<typeof changeResend>){
	try{
		//make API call
		yield call(userActionsAPI.resendChange, payload);
		toast.success('New code was sent on your phone');
	}
	catch (e) {
		console.log(e);
		toast.error('Something went wrong. Try again.');
	}
}

function* watchChangeSaga(){
	//watch 
	yield all([
		takeEvery(CHANGE_VERIFY, change),
		takeEvery(CHANGE_CODE_VERIFY, changeCode),
		takeLeading(CHANGE_RESEND, changeResendSaga)
	]);
}

export default watchChangeSaga;
