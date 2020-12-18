import {takeLeading, call, put} from 'redux-saga/effects';

import userActionsAPI from '../utils/api/userActionsAPI';
import {meSet} from './me/actions';
import {toast} from 'react-toastify';


const LOGOUT_START = 'logout/start';

export const logoutStart = () => <const>({
	type: LOGOUT_START
});

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
	yield takeLeading(LOGOUT_START, logoutSaga);
}
