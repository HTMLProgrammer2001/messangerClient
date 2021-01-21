import {takeEvery, call, put, select} from 'redux-saga/effects';
import {toast} from 'react-toastify';

import {clearError, clearStart, clearSuccess} from './slice';
import {selectChatDialogState} from '../chat/dialog/slice';
import {chatMessagesClear} from '../chat/messages/slice';
import {dialogsAdd} from '../dialogs';
import chatAPI from '../../utils/api/chatAPI';


export function *clearSaga({payload}: ReturnType<typeof clearStart>) {
	try{
		//make api call
		if(payload.type == 1)
			yield call(chatAPI.clear, {user: payload.id});
		else
			yield call(chatAPI.clear, {dialog: payload.id});

		toast.success('History was cleared');
		yield put(clearSuccess());

		//change chat state
		const {dialog, user} = yield select(selectChatDialogState);

		if(dialog == payload.id || user == payload.id) {
			//clear history
			yield put(chatMessagesClear());

			//clear current message
			yield put(dialogsAdd({_id: dialog, lastMessage: null, unread: 0} as any));
		}
	}
	catch (e) {
		//show error
		toast.error(e.response?.data.message || e.message);
		yield put(clearError(e.response?.data.message || e.message));
	}
}

function *clearWatchSaga() {
	yield takeEvery(clearStart.type, clearSaga);
}

export default clearWatchSaga;
