import {takeEvery, put, all, call, takeLeading} from 'redux-saga/effects';
import {toast} from 'react-toastify';

import {changeCodeVerify, changeError, changeResend, changeReset, changeSuccess, changeVerify} from './slice';
import {meSet} from '../me/slice';
import userActionsAPI from '../../utils/api/userActionsAPI';
import expressErrorsToObject from '../../utils/helpers/expressErrorsToObject';


export function* changeSaga({payload}: ReturnType<typeof changeVerify>){
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

export function* changeCodeSaga({payload}: ReturnType<typeof changeCodeVerify>){
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

export function* changeResendSaga({payload}: ReturnType<typeof changeResend>){
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
		takeEvery(changeVerify.type, changeSaga),
		takeEvery(changeCodeVerify.type, changeCodeSaga),
		takeLeading(changeResend.type, changeResendSaga)
	]);
}

export default watchChangeSaga;
