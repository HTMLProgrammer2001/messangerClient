import {call, put, takeLeading, all} from 'redux-saga/effects';
import {toast} from 'react-toastify';
import {AxiosResponse} from 'axios';

import {IEditMeResponse} from '../../../interfaces/Responses/IEditMeResponse';
import {editMeAvatarError, editMeAvatarStart, editMeAvatarSuccess} from './actions';
import {meSet} from '../../me/actions';
import {EDIT_ME_AVATAR_START} from './types';
import userActionsAPI from '../../../utils/api/userActionsAPI';


function* uploadAvatarSaga({payload}: ReturnType<typeof editMeAvatarStart>){
	try{
		//make api call
		const resp: AxiosResponse<IEditMeResponse> = yield call(userActionsAPI.editMe, payload);

		//change store
		yield put(meSet(resp.data.newUser));
		yield put(editMeAvatarSuccess());

		//show message
		toast.success('Avatar was changed');
	}
	catch (e) {
		//set error to store and show message
		yield put(editMeAvatarError());
		toast.error(e.response?.data.message || e.message);
	}
}

function* watchAvatarSaga() {
	yield all([
		takeLeading(EDIT_ME_AVATAR_START, uploadAvatarSaga)
	]);
}

export default watchAvatarSaga;
