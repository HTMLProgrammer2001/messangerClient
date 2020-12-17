import {call, put, takeLeading, all, delay} from 'redux-saga/effects';
import {toast} from 'react-toastify';

import {editMeAvatarError, editMeAvatarStart, editMeAvatarSuccess} from './actions';
import {EDIT_ME_AVATAR_START} from './types';


function* uploadAvatarSaga({payload}: ReturnType<typeof editMeAvatarStart>){
	try{
		yield delay(3000);
		yield put(editMeAvatarSuccess());

		toast.success('Avatar was changed');
	}
	catch (e) {
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
