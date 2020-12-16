import {takeEvery, put, all, call, select} from 'redux-saga/effects';
import {startSubmit, stopSubmit, reset, getFormValues} from 'redux-form';

import {ISignInFormData} from '../../components/SingInPage/SignInForm';

import {SIGNIN_VERIFY, SIGNIN_CODE_VERIFY} from './types';
import {signInSuccess} from './actions';
import authAPI from '../../utils/api/authAPI';


function* signIn(){
	yield put(startSubmit('signIn'));

	try{
		//get form values
		const selector = getFormValues('signIn');
		const formValues = select(selector);
		const formValuesT = (<any>formValues) as ISignInFormData;

		//make API request
		yield call(authAPI.signIn, formValuesT);
		yield put(signInSuccess());
	}
	catch(e){
		//update error
		yield put(stopSubmit('signIn', {
			_error: e.response?.data.message || e.message,
			...e.response?.data.errors
		}));
	}
}

function* signInCode(){
	yield put(startSubmit('signIn'));

	try{
		//get form values
		const selector = getFormValues('signIn');
		const formValues = select(selector);
		const formValuesT = (<any>formValues) as ISignInFormData;

		//make api request
		yield call(authAPI.confirmSignin, formValuesT);
	}
	catch(e){
		//update error
		yield put(stopSubmit('signIn', {
			_error: e.response?.data.message || e.message,
			...e.response?.data.errors
		}));
	}
}

function* watchSignInSaga(){
	//setup watch
	yield all([
		takeEvery(SIGNIN_VERIFY, signIn),
		takeEvery(SIGNIN_CODE_VERIFY, signInCode)
	]);
}

export default watchSignInSaga;
