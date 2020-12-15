import {takeEvery, put, all, call, select} from 'redux-saga/effects';
import {startSubmit, stopSubmit, reset, getFormValues} from 'redux-form';

import {ILogInFormData} from '../../components/LogInPage/LogInForm';

import {LOGIN_VERIFY, LOGIN_CODE_VERIFY} from './types';
import {logInSuccess} from './actions';
import authAPI from '../../api/authAPI';


function* logIn(){
	yield put(startSubmit('logIn'));

	try{
		//get form values from store
		const selector = getFormValues('logIn');
		const formValues = select(selector);
		const formValuesT = (<any>formValues) as ILogInFormData;

		//make api request
		yield call(authAPI.logIn, formValuesT);
		yield put(logInSuccess());
	}
	catch(e){
		//update error
		yield put(stopSubmit('logIn', {
			_error: e.response?.data.message || e.message,
			...e.response?.data.errors
		}));
	}
}

function* logInCode(){
	yield put(startSubmit('logIn'));

	try{
		//get form values from store
		const selector = getFormValues('logIn');
		const formValues = select(selector);
		const formValuesT = (<any>formValues) as ILogInFormData;

		//make api request
		yield call(authAPI.confirmLogin, formValuesT);
	}
	catch(e){
		//update error
		yield put(stopSubmit('logIn', {
			_error: e.response?.data.message || e.message,
			...e.response?.data.errors
		}));
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
