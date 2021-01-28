import {createAction} from '@reduxjs/toolkit';
import {takeEvery, put, select} from 'redux-saga/effects';

import {selectChatUser, selectChatDialog} from '../../chat/dialog/slice';
import {usersAdd} from '../../users';
import {dialogsAdd} from '../../dialogs';


//create actions
export const wsToggle = createAction<string>('WS/user/toggleBan');

//create sagas
function *toggleBanSaga({payload: userBan}: ReturnType<typeof wsToggle>) {
	const user = yield select(selectChatUser),
		dlg = yield select(selectChatDialog);

	if(user._id == userBan) {
		yield put(usersAdd({...user, isBanned: !user.isBanned}));
		yield put(dialogsAdd({...dlg, isActive: !dlg.isActive}));
	}
}

function *toggleBanWatchSaga() {
	yield takeEvery(wsToggle.type, toggleBanSaga);
}

export default toggleBanWatchSaga;
