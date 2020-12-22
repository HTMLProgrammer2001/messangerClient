import {takeLeading, call, put} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {createAction} from '@reduxjs/toolkit';

import userActionsAPI from '../utils/api/userActionsAPI';
import {meSet} from './me/slice';


export const logoutStart = createAction<null>('logout/start');

function* logoutSaga() {
	try{
		const token = localStorage.getItem('token');

		if(!token)
			return;

		//login
		yield call(userActionsAPI.logout);
		yield put(meSet(null));
	}
	catch(e){
		toast.error(e.response?.data.message || e.message);
	}
}

export default function* watchLogoutSaga() {
	yield takeLeading(logoutStart.type, logoutSaga);
}
