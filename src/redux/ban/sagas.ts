import {takeEvery, call, put} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {banError, banStart, banSuccess} from './slice';
import {usersAdd} from '../users';
import chatAPI from '../../utils/api/chatAPI';
import {IUser} from '../../interfaces/IUser';


export function *banSaga({payload}: ReturnType<typeof banStart>) {
	try{
		//make api call
		const resp: AxiosResponse<{message: string, newUser: IUser}> = yield call(chatAPI.ban, payload);

		toast.success(resp.data.message);
		yield put(banSuccess());
		yield put(usersAdd(resp.data.newUser));
	}
	catch (e) {
		//show error
		toast.error(e.response?.data.message || e.message);
		yield put(banError(e.response?.data.message || e.message));
	}
}

function *banWatchSaga() {
	yield takeEvery(banStart.type, banSaga);
}

export default banWatchSaga;

